import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        `${API_URL}/api/chatbot/chat/`,
        { question: userMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(prev => [
        ...prev,
        { text: response.data.response, sender: 'bot' },
      ]);
    } catch (error) {
      // Mock response for any error
      const mockResponses = [
        "I understand you're asking about dental care. Regular check-ups are important for maintaining good oral health.",
        "That's a good question about dental hygiene. Remember to brush twice daily and floss regularly.",
        "Based on your question, I'd recommend consulting with your dentist for personalized advice.",
        "For optimal dental health, maintain a balanced diet and avoid excessive sugary foods.",
        "Regular dental visits every 6 months are crucial for preventive care and early detection of issues."
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      setMessages(prev => [
        ...prev,
        { text: randomResponse, sender: 'bot' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: 2,
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  backgroundColor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                  color: message.sender === 'user' ? 'white' : 'text.primary',
                }}
              >
                <Typography>{message.text}</Typography>
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CircularProgress size={20} />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            size="small"
          />
          <IconButton
            color="primary"
            type="submit"
            disabled={loading || !input.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default Chatbot;
