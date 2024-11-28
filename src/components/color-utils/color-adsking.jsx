import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const GradientBox = styled(Box)({
  background: 'linear-gradient(180deg, rgba(79,70,229,0) 0%, rgb(79,70,229) 100%)',
  borderRadius: '8px',
  height: '100%',
  width: '100%',
});

const ColorSlider = styled(Box)({
  height: '8px',
  borderRadius: '100px',
  background:
    'linear-gradient(180deg, rgb(255,0,0) 5.21%, rgb(255,137.7,0) 16.48%, rgb(255,229.5,0) 27.74%, rgb(20.4,255,0) 39.35%, rgb(0,163.2,255) 49.37%, rgb(5.1,0,255) 61.18%, rgb(173.4,0,255) 72.26%, rgb(255,0,198.9) 83.53%, rgb(255,0,0) 94.61%)',
  position: 'relative',
});

const HueSlider = styled(Box)({
  height: '8px',
  borderRadius: '100px',
  background: 'url(/hue.png) 100% 100%',
  position: 'relative',
});

const SliderThumb = styled(Box)({
  width: '10px',
  height: '10px',
  borderRadius: '5px',
  border: '2px solid white',
  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
  position: 'absolute',
  top: '-2px',
});

const ColorCircle = styled(Box)(({ color }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: color,
}));

const SelectedColorCircle = styled(ColorCircle)({
  border: '2px solid white',
  boxShadow: '0px 0px 0px 2px rgba(0, 0, 0, 0.25)',
});

export const PropertyDefault = () => {
  return (
    <Paper elevation={3} sx={{ width: 264, height: 380, p: 2, borderRadius: 2 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <GradientBox />
        </Grid>
        <Grid item>
          <ColorSlider>
            <SliderThumb sx={{ left: 146 }} />
          </ColorSlider>
        </Grid>
        <Grid item>
          <HueSlider>
            <SliderThumb sx={{ left: 223 }} />
          </HueSlider>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                border: '1px solid #E0E0E0',
                boxShadow: 1,
                backgroundColor: 'white',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Hex
              </Typography>
              <IconButton size="small">
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                border: '1px solid #E0E0E0',
                boxShadow: 1,
                backgroundColor: 'white',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                #
              </Typography>
              <Typography variant="body2" color="textPrimary">
                4F46E5
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                border: '1px solid #E0E0E0',
                boxShadow: 1,
                backgroundColor: 'white',
              }}
            >
              <Typography variant="body2" color="textPrimary">
                100%
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between">
          <Typography variant="caption" color="textSecondary">
            Saved colors:
          </Typography>
          <Typography variant="caption" color="textSecondary">
            + Add
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <ColorCircle color="red" />
          </Grid>
          <Grid item>
            <ColorCircle color="orange" />
          </Grid>
          <Grid item>
            <ColorCircle color="yellow" />
          </Grid>
          <Grid item>
            <ColorCircle color="green" />
          </Grid>
          <Grid item>
            <ColorCircle color="teal" />
          </Grid>
          <Grid item>
            <ColorCircle color="blue" />
          </Grid>
          <Grid item>
            <SelectedColorCircle color="indigo" />
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <ColorCircle color="pink" />
          </Grid>
          <Grid item>
            <ColorCircle color="rose" />
          </Grid>
          <Grid item>
            <ColorCircle color="fuchsia" />
          </Grid>
          <Grid item>
            <ColorCircle color="violet" />
          </Grid>
          <Grid item>
            <ColorCircle color="lightblue" />
          </Grid>
          <Grid item>
            <ColorCircle color="emerald" />
          </Grid>
          <Grid item>
            <ColorCircle color="lime" />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PropertyDefault;
