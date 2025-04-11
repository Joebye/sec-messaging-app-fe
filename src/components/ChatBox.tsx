import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { pollMessages, sendMessage } from '../services/api';
import { decryptMessage, encryptMessage, generateAESKey, base64Encode } from '../crypto/aes';

interface Props {
  token: string;
}

const ChatBox: React.FC<Props> = ({ token }) => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [keyIv, setKeyIv] = useState<{ key: CryptoKey; iv: Uint8Array } | null>(null);

  useEffect(() => {
    generateAESKey().then(setKeyIv);
    const poll = async () => {
      const data = await pollMessages(token);
      console.log(data);
      
      if (data?.encryptedMessage && keyIv) {
        const plain = await decryptMessage(data.encryptedMessage, keyIv.key, keyIv.iv);
        setChat(prev => [...prev, plain]);
        console.log('chat: ' + chat);
        
      }
      poll(); 
    };
    poll();
  }, [token]);

  const handleSend = async () => {
    if (!input || !keyIv) return;
    const encrypted = await encryptMessage(input, keyIv.key, keyIv.iv);
    const ivBase64 = base64Encode(keyIv.iv.buffer as ArrayBuffer); 
    await sendMessage(token, encrypted, ivBase64);
    setInput('');
  };

  return (
    <Box>
      <Box sx={{ height: 200, overflowY: 'scroll', bgcolor: '#f5f5f5', p: 2, mb: 2 }}>
        {chat.map((msg, idx) => (
          <Typography key={idx}>{msg}</Typography>
        ))}
      </Box>
      <TextField value={input} onChange={e => setInput(e.target.value)} fullWidth />
      <Button onClick={handleSend} variant="contained" sx={{ mt: 1 }}>Send</Button>
    </Box>
  );
};

export default ChatBox;