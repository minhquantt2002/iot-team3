from sqlalchemy import update, and_, text, delete
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

import models, schemas


def get_users(db: Session) -> List[schemas.User]:
    return db.query(models.User).filter(models.User.deleted == False).all()


def get_user_by_id(db: Session, id: str) -> List[schemas.User]:
    return db.query(models.User).filter(models.User.deleted == False).where(models.User.id == id).all()


def get_user_by_card_id(db: Session, card_id: str) -> Optional[schemas.User]:
    return db.query(models.User).where(models.User.card_id == card_id).scalar()


def create_user(db: Session, user: schemas.User):
    db.add(models.User(**user.dict()))
    db.commit()
    return user


def update_user(db: Session, user_id: str, user: schemas.User):
    statement = update(models.User).where(models.User.id == user_id).values(
        **user.dict(exclude_none=True)).execution_options(synchronize_session='fetch')
    db.execute(statement)
    db.commit()


def delete_user(db: Session, user_id: str):
    stmt = update(models.User).where(models.User.id == user_id).values({'deleted': True})
    db.execute(stmt)
    db.commit()


def get_user_logs(db: Session, id: str = None) -> List[schemas.UserLog]:
    if id is not None:
        return db.query(models.UserLog).filter(models.UserLog.user_id == id).order_by(
            models.UserLog.checkin_date.desc(),
            models.UserLog.time_in.desc(),
            models.UserLog.time_out.asc(),
        ).all()
    return db.query(models.UserLog).order_by(
        models.UserLog.checkin_date.desc(),
        models.UserLog.time_in.desc(),
        models.UserLog.time_out.asc(),
    ).all()


def check_card_in_user_logs(db: Session, user_id: str) -> Optional[schemas.UserLog]:
    return db.query(models.UserLog).where(and_(models.UserLog.user_id == user_id, models.UserLog.time_out == None)).scalar()


def get_user_log_by_id(db: Session, id: int):
    return db.query(models.UserLog).where(models.UserLog.id == id).scalar()


def check_user_checked_today(db: Session, user_id: str):
    checked = db.query(models.UserLog).where(
        and_(models.UserLog.user_id == user_id, models.UserLog.checkin_date.like(
            f'%{str(datetime.now().date())}%'))).all()
    return len(checked) == 1 and checked[0].time_out is not None


def checkin_user(db: Session, user_checkin: schemas.UserCheckin):
    db_user_checkin = models.UserLog(**user_checkin.dict(exclude_none=True))
    db.add(db_user_checkin)
    db.commit()
    db.refresh(db_user_checkin)
    return get_user_log_by_id(db=db, id=db_user_checkin.id)


def checkout_user(db: Session, id: int):
    statement = update(models.UserLog).where(and_(models.UserLog.id == id, models.UserLog.time_out == None)).values(
        {'time_out': datetime.now().strftime('%H:%M:%S')}).execution_options(synchronize_session='fetch')
    db.execute(statement)
    db.commit()
    return get_user_log_by_id(db=db, id=id)


def check_login(db: Session, username: str, password: str):
    return db.query(models.Admin).where(and_(models.Admin.username == username, models.Admin.password == password)).scalar()


def create_admin(db: Session, username: str, password: str):
    db_admin = models.Admin(username=username, password=password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin


def truncate_user_logs(db: Session):
    db.execute(text("delete from user_logs"))
    db.commit()
    return "chac oke"
