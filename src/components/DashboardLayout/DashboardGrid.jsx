import React from 'react';
import { Grid, Paper } from '@mui/material';

const DashboardGrid = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper>Transcription Panel</Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>Q&A Section</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>Assessment Display</Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;