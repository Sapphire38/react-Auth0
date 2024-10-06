import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from './contexts/UserContext'
import LoginForm from './components/LoginForm'
import { Button, Typography, Space } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography;

function App() {
  const { isAuthenticated, logout } = useAuth0()
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {isAuthenticated || user ? (
        <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Title level={2} className="text-gray-100 mb-4">Welcome, {user?.name || 'User'}!</Title>
          <Paragraph className="text-gray-300 mb-4">You are logged in.</Paragraph>
          <Button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            icon={<LogoutOutlined />}
            danger
          >
            Log Out
          </Button>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App