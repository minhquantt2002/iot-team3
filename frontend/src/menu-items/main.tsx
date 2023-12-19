import { DatabaseOutlined, UserOutlined } from "@ant-design/icons"

export type ChildrenItemTypes = {
  id: string,
  title: string,
  type: string,
  url: string,
  icon: React.FC,
}

export type MenuItemTypes = {
  id: string,
  title: string,
  type: string,
  children: ChildrenItemTypes[]
}

const controller: MenuItemTypes = {
  id: 'Chức năng',
  title: 'Chức năng',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Quản lý nhân viên',
      type: 'item',
      url: '/users',
      icon: UserOutlined,
    },
    {
      id: 'user-logs',
      title: 'Theo dõi chấm công',
      type: 'item',
      url: '/user-logs',
      icon: DatabaseOutlined,
    },
  ],
}

export default controller
