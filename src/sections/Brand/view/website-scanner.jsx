'use client'; // For client-side rendering

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

// Regex for validating a website link or domain
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

export function WebsiteScannerBox() {
  const [websiteLink, setWebsiteLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateUrl = (url) => {
    if (urlRegex.test(url.trim())) {
      setIsValid(true);
      setError('');
    } else {
      setIsValid(false);
      setError('Please enter a valid website link or domain name');
    }
  };

  const handleInputChange = (e) => {
    const url = e.target.value;
    setWebsiteLink(url);
    validateUrl(url);
  };

  const handleScan = async () => {
    if (!isValid) return;

    setIsLoading(true);

    try {
      // Send the website link to the backend
      await axios.post('http://127.0.0.1:8000/send-website-url/', { url: websiteLink });
      setIsLoading(false);
    } catch (error) {
      console.error('Error while sending the website link', error);
      setError('Error sending the website link. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        p: 3,
        borderRadius: 2,
        mb: 3,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Scan Your Website
        </Typography>
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          Recommended
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Enter your website link below to perform a detailed scan and gather insights.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start', // Align the button and input field at the top
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Enter website link or domain"
            fullWidth
            label="Website Link"
            value={websiteLink}
            onChange={handleInputChange}
            error={!isValid && websiteLink.trim() !== ''}
            helperText={!isValid && websiteLink.trim() !== '' ? error : ' '}
            // Always reserve space for the helper text to prevent UI shifts
          />
        </Box>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          disabled={!isValid}
          onClick={handleScan}
          sx={{
            textTransform: 'none',
            height: '56px', // Match TextField height
          }}
        >
          Scan Website
        </LoadingButton>
      </Box>
    </Box>
  );
}
