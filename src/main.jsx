import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { ConfigProvider, theme } from 'antd'
import App from './App'
import { UserProvider } from './contexts/UserContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_AUTH0_CLIENT_ID"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#3b82f6',
            colorBgContainer: '#1f2937',
          },
        }}
      >
        <UserProvider>
          <App />
        </UserProvider>
      </ConfigProvider>
    </Auth0Provider>
  </React.StrictMode>,
)