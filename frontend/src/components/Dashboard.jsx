import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { CheckCircle, Pending, Work, Assignment } from '@mui/icons-material';

const Dashboard = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: '#e3f2fd' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom>Total</Typography>
                <Typography variant="h4">{stats.total || 0}</Typography>
              </Box>
              <Assignment sx={{ fontSize: 40, color: '#1976d2' }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: '#fff3e0' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom>À faire</Typography>
                <Typography variant="h4">{stats.todo || 0}</Typography>
              </Box>
              <Pending sx={{ fontSize: 40, color: '#ed6c02' }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: '#e8f5e9' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom>En cours</Typography>
                <Typography variant="h4">{stats.doing || 0}</Typography>
              </Box>
              <Work sx={{ fontSize: 40, color: '#2e7d32' }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: '#f3e5f5' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom>Terminées</Typography>
                <Typography variant="h4">{stats.done || 0}</Typography>
              </Box>
              <CheckCircle sx={{ fontSize: 40, color: '#6a1b9a' }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
