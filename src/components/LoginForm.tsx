import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../contexts/UserContext';
import { Form, Input, Button, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const { setUser } = useUser();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // In a real app, you would handle login logic here
    // For now, we'll just set a mock user
    setUser({ name: 'John Doe', email: data.email });
  };

  return (
    <div className="max-w-md w-full">
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Space className="w-full justify-between">
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
            <Button onClick={() => loginWithRedirect()} className="bg-green-600 hover:bg-green-700">
              Sign In with Auth0
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;