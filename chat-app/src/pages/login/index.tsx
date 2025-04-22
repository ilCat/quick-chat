import './styles.css'
import React from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input,notification } from 'antd'
import { INotification } from '../../services/Utils'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/AuthContext'


interface ILogin {
  username: string
  password?: string
};


const Login=() => {
  const nav = useNavigate()
  const {user,setUser} = useUser()
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (notification: INotification) => {
    api[notification.type]({
      message: notification.message,
    })
  }
  const onFinish: FormProps<ILogin>['onFinish'] = (values) => {
    openNotification({type: 'success', message:`Welcome ${ values.username} `})
    setUser(values.username)
    setTimeout( ()=>nav('chat'),150)
  }
  
  const onFinishFailed: FormProps<ILogin>['onFinishFailed'] = (errorInfo) => {
    openNotification({type: 'error', message:`${ errorInfo.errorFields[0].errors.join(" ")} `})
  }
    return(
    <div className='login'>
        {contextHolder}
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<ILogin>
            label={<label style={{ color: "white" }}>Username</label>}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<ILogin>
            label={<label style={{ color: "white" }}>Password</label>}
            name="password"
            style={{color:'white'}}
            rules={[{ required: false, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
  </div>)
}

export default Login;