from pydantic import BaseModel
from fastapi import Request
from typing import Optional


class User(BaseModel):
    id: str
    name: str
    card_id: str
    email: str
    phone_number: str
    image_url: Optional[str]
    gender: str
    dob: str
    deleted: Optional[bool]

    class Config:
        orm_mode = True


class UserLog(BaseModel):
    id: int
    user_id: str
    checkin_date: str
    time_in: Optional[str] = None
    time_out: Optional[str] = None

    user: User

    class Config:
        orm_mode = True


class UserCheckin(BaseModel):
    user_id: str
    checkin_date: str
    time_in: str

    class Config:
        orm_mode = True


class FormAdminLogin:
    def __init__(self, request: Request):
        self.request: Request = request
        self.username: str = ""
        self.password: str = ""

    async def load_data(self):
        form = await self.request.form()
        print(form)
        self.username = form.get('username')
        self.password = form.get('password')
