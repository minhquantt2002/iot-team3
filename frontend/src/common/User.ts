export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  dob: string;
  card_id: string;
  image_url: string;
}

export interface HeadUser {
  id: keyof User;
  label: string;
}

export const headUsers: HeadUser[] = [
  {
    id: 'card_id',
    label: 'Mã thẻ',
  },
  {
    id: 'id',
    label: 'Mã nhân viên',
  },
  {
    id: 'name',
    label: 'Họ và tên',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'phone_number',
    label: 'Số điện thoại',
  },
  {
    id: 'gender',
    label: 'Giới tính',
  },
  {
    id: 'dob',
    label: 'Ngày sinh',
  },
  {
    id: 'image_url',
    label: 'Ảnh đại diện',
  },
];
