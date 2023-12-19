from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status, Request, WebSocket, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, Response

from database import get_db, engine
import crud, schemas, models
import datetime

router = APIRouter()

# models.Base.metadata.drop_all(bind=engine)
# models.Base.metadata.create_all(bind=engine)


# def check_cookie(request: Request):
#     value = request.cookies.get('admin-logged')
#     if value == 'authenticated':
#         return True
#     return False


# @router.get('/', response_class=RedirectResponse, status_code=status.HTTP_302_FOUND)
# def get_login(request: Request):
#     return '/'


# @router.get('/login', response_class=HTMLResponse, status_code=status.HTTP_200_OK)
# def get_login(request: Request, db: Session = Depends(get_db)):
#     """api get login"""
#     if check_cookie(request=request):
#         return RedirectResponse('/')
#     return templates.TemplateResponse('login.html', {'request': request})


# @router.post('/login', response_class=RedirectResponse, status_code=status.HTTP_302_FOUND)
# async def authentication_admin(request: Request, response: Response, db: Session = Depends(get_db)):
#     admin_login = schemas.FormAdminLogin(request=request)
#     await admin_login.load_data()
#     auth_admin = crud.check_login(
#         db=db, username=admin_login.username, password=admin_login.password)
#     if not auth_admin:
#         return '/login'
#     response.set_cookie(
#         key='admin-logged',
#         value='authenticated',
#         expires=(datetime.datetime.now() +
#                  datetime.timedelta(days=1)).timestamp()
#     )
#     return '/'


# @router.post('/logout', response_class=HTMLResponse, status_code=status.HTTP_302_FOUND)
# async def admin_logout(response: Response):
#     response.delete_cookie(key='admin-logged')
#     return '/login'

@router.get('/api/users/{id}/', response_model=List[schemas.User], status_code=status.HTTP_200_OK)
def get_user_by_id(id: str, db: Session = Depends(get_db)):
    """api get users"""
    users = crud.get_user_by_id(db=db, id=id)
    return users


@router.get('/api/users/', response_model=List[schemas.User], status_code=status.HTTP_200_OK)
def get_users(db: Session = Depends(get_db)):
    """api get users"""
    users = crud.get_users(db=db)
    return users


@router.post('/api/users/', response_class=RedirectResponse, status_code=status.HTTP_302_FOUND)
async def create_new_user(user: schemas.User, db: Session = Depends(get_db)):
    """register new user"""
    new_user = crud.create_user(db=db, user=user)
    return {
        'success': True
    }


@router.put('/api/users/{user_id}/', status_code=status.HTTP_200_OK)
async def update_user(user_id: str, user: schemas.User, db: Session = Depends(get_db)):
    """update user"""
    user_update = crud.update_user(db=db, user_id=user_id, user=user)
    return {
        'success': True
    }


@router.delete('/api/users/{user_id}/', status_code=status.HTTP_200_OK)
async def update_user(user_id: str, db: Session = Depends(get_db)):
    """delete user"""
    crud.delete_user(db=db, user_id=user_id)
    return {
        'success': True
    }

# user logs apis
@router.get('/api/user-logs/', response_model=List[schemas.UserLog], status_code=status.HTTP_200_OK)
def get_user_logs(db: Session = Depends(get_db)):
    """api get user logs"""
    user_logs = crud.get_user_logs(db=db)
    return user_logs


@router.get('/api/user-logs/{id}/', response_model=List[schemas.UserLog], status_code=status.HTTP_200_OK)
def get_user_logs(id: str, db: Session = Depends(get_db)):
    """api get user logs"""
    user_logs = crud.get_user_logs(db=db, id=id)
    return user_logs


@router.post('/send-card-id/{card_id}', status_code=status.HTTP_200_OK)
async def send_card_id(card_id: str, db: Session = Depends(get_db)):
    """retrive card id from client"""
    card_id = card_id.replace('_', ' ')
    for client in waiting_clients_for_fil_card_id:
        await client.send_text(card_id)

    # Check user is already exist
    check_user = crud.get_user_by_card_id(db=db, card_id=card_id)
    print('check user: ', check_user)
    if check_user is None:
        raise HTTPException(
            status_code=403, detail='User is not already exists.')

    # Check card in user logs
    check_card = crud.check_card_in_user_logs(db=db, user_id=check_user.id)
    print('check card id: ', check_card)

    checked_today = crud.check_user_checked_today(db=db, user_id=check_user.id)

    data = {}
    if not checked_today:
        if check_card is None:
            new_user_checkin = schemas.UserCheckin(
                user_id=check_user.id,
                checkin_date=datetime.datetime.now().strftime('%Y-%m-%d'),
                time_in=datetime.datetime.now().strftime('%H:%M:%S')
            )
            payload = crud.checkin_user(
                db=db, user_checkin=new_user_checkin)
        else:
            payload = crud.checkout_user(db=db, id=check_card.id)

        data = payload.as_dict()

    if checked_today:
        data['user'] = check_user.as_dict()
        data['error'] = 'Nhân viên này hôm nay đã ra về!'
    print(data)
    for client in waiting_clients_for_read_card:
        await client.send_json(data)
    return "ok"




"""Socket"""
waiting_clients_for_fil_card_id = []
waiting_clients_for_read_card = []
@router.websocket('/read-card')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    waiting_clients_for_read_card.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except Exception as e:
        print(f'WebSocket connection closed: {e}')
    finally:
        waiting_clients_for_read_card.remove(websocket)


@router.websocket('/fil-card-id')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    waiting_clients_for_fil_card_id.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except Exception as e:
        print(f'WebSocket connection closed: {e}')
    finally:
        waiting_clients_for_fil_card_id.remove(websocket)



"""routes another"""
@router.delete('/truncate-user-logs')
def truncate_user_log(db: Session = Depends(get_db)):
    """truncate table"""
    return crud.truncate_user_logs(db=db)


@router.post('/register/auth')
def authentication_admin(username: str, password: str, db: Session = Depends(get_db)):
    auth_admin = crud.create_admin(
        db=db, username=username, password=password)
    return auth_admin
