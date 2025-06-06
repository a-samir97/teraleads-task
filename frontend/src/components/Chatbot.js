import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { sendMessage, clearMessages } from '../store/slices/chatbotSlice';

function Chatbot() {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chatbot);
  const [input, setInput] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await dispatch(sendMessage(input));
      setInput('');
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">AI Assistant</Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(clearMessages())}
        >
          Clear Chat
        </Button>
      </Box>

      <Paper sx={{ height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column' }}>
        <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: message.type === 'user' ? 'primary.light' : 'grey.100',
                    color: message.type === 'user' ? 'white' : 'text.primary',
                  }}
                >
                  <ListItemText
                    primary={message.content}
                    secondary={formatTimestamp(message.timestamp)}
                    secondaryTypographyProps={{
                      color: message.type === 'user' ? 'white' : 'text.secondary',
                    }}
                  />
                </Paper>
              </ListItem>
              {index < messages.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {loading && (
            <ListItem sx={{ justifyContent: 'center' }}>
              <CircularProgress size={24} />
            </ListItem>
          )}
        </List>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading || !input.trim()}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Chatbot; 