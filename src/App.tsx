import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { loginUser, registerUser } from './components/api';
import AuthForm from './components/AuthForm';
import ChatBox from './components/ChatBox';


const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string, isLogin: boolean) => {
    try {
      const response = isLogin
        ? await loginUser(username, password)
        : await registerUser(username, password);

      if (response.token) setToken(response.token);
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Secure Chat App
      </Typography>
      {!token ? <AuthForm onAuth={handleLogin} /> : <ChatBox token={token} />}
    </Container>
  );
};

export default App;