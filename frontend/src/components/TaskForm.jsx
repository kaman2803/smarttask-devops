import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Alert } from '@mui/material';

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'À faire',
    priority: 'medium'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      setError('Le titre est requis');
      return;
    }
    onAdd(task);
    setTask({ title: '', description: '', status: 'À faire', priority: 'medium' });
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TextField
        fullWidth
        label="Titre"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        margin="normal"
        multiline
        rows={2}
      />
      
      <TextField
        fullWidth
        select
        label="Statut"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        margin="normal"
      >
        <MenuItem value="À faire">À faire</MenuItem>
        <MenuItem value="En cours">En cours</MenuItem>
        <MenuItem value="Terminée">Terminée</MenuItem>
      </TextField>
      
      <TextField
        fullWidth
        select
        label="Priorité"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        margin="normal"
      >
        <MenuItem value="low">Basse</MenuItem>
        <MenuItem value="medium">Moyenne</MenuItem>
        <MenuItem value="high">Haute</MenuItem>
      </TextField>
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Ajouter la tâche
      </Button>
    </Box>
  );
};

export default TaskForm;
