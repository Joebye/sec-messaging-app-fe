import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';

interface Props {
  onAuth: (username: string, password: string, isLogin: boolean) => void;
}

const AuthForm: React.FC<Props> = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <form onSubmit={e => { e.preventDefault(); onAuth(username, password, isLogin); }}>
      <TextField label="Username" fullWidth margin="normal" onChange={e => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setPassword(e.target.value)} />
      <FormControlLabel
        control={<Switch checked={isLogin} onChange={() => setIsLogin(!isLogin)} />}
        label={isLogin ? 'Login' : 'Register'}
      />
      <Button type="submit" variant="contained" fullWidth>Submit</Button>
    </form>
  );
};

export default AuthForm;