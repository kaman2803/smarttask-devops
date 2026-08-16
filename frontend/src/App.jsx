import React, { useState, useEffect } from 'react';
import {
  Container, AppBar, Toolbar, Typography, Box, Paper, Grid,
  ThemeProvider, createTheme
} from '@mui/material';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from './api/tasks';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0, doing: 0, done: 0 });
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      const statsData = await getTaskStats();
      setStats(statsData);
    } catch (error) {
      console.error('Erreur chargement des tâches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      await createTask(newTask);
      fetchTasks();
    } catch (error) {
      console.error('Erreur ajout tâche:', error);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Erreur mise à jour tâche:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Erreur suppression tâche:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SmartTask - Gestion de Projets
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Grid container spacing={3}>
            {/* Dashboard - pleine largeur */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Dashboard stats={stats} />
              </Paper>
            </Grid>

            {/* Formulaire d'ajout - 50% de la largeur */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Ajouter une tâche
                </Typography>
                <TaskForm onAdd={handleAddTask} />
              </Paper>
            </Grid>

            {/* Liste des tâches - 50% de la largeur */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Liste des tâches
                </Typography>
                <TaskList
                  tasks={tasks}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  loading={loading}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Footer - centré avec espace */}
        <Box 
          component="footer"
          sx={{
            py: 3,
            px: 2,
            backgroundColor: '#1976d2',
            color: 'white',
            textAlign: 'center',
            width: '100%',
            mt: 'auto',
            borderTop: '2px solid rgba(255,255,255,0.1)'
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body1" align="center" sx={{ fontWeight: '300' }}>
              Réalisé par <strong style={{ fontWeight: '600' }}>Kaman Goumou</strong> - Ingénieur Réseaux et Systèmes Certifié CCNA
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
