import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Chip,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Divider
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import WorkIcon from '@mui/icons-material/Work';
import CloseIcon from '@mui/icons-material/Close';

const TaskList = ({ tasks, onUpdate, onDelete, loading }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'À faire': return 'warning';
      case 'En cours': return 'info';
      case 'Terminée': return 'success';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority || 'Moyenne';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const handleViewOpen = (task) => {
    setSelectedTask(task);
    setViewDialog(true);
  };

  const handleViewClose = () => {
    setViewDialog(false);
    setSelectedTask(null);
  };

  const handleEditOpen = (task) => {
    setSelectedTask(task);
    setEditedTask({ ...task });
    setEditDialog(true);
  };

  const handleEditClose = () => {
    setEditDialog(false);
    setSelectedTask(null);
    setEditedTask(null);
  };

  const handleSaveEdit = () => {
    onUpdate(selectedTask.id, editedTask);
    setEditDialog(false);
    setSelectedTask(null);
    setEditedTask(null);
  };

  const handleDelete = (task) => {
    if (window.confirm(`Voulez-vous vraiment supprimer la tâche "${task.title}" ?`)) {
      onDelete(task.id);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'À faire': return <PendingIcon sx={{ fontSize: 18 }} />;
      case 'En cours': return <WorkIcon sx={{ fontSize: 18 }} />;
      case 'Terminée': return <CheckCircleIcon sx={{ fontSize: 18 }} />;
      default: return null;
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      sortable: true,
    },
    {
      field: 'title',
      headerName: 'Titre',
      flex: 1,
      minWidth: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 150,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 130,
      sortable: true,
      renderCell: (params) => (
        <Chip
          icon={getStatusIcon(params.value)}
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      )
    },
    {
      field: 'priority',
      headerName: 'Priorité',
      width: 120,
      sortable: true,
      renderCell: (params) => (
        <Chip
          label={getPriorityLabel(params.value)}
          color={getPriorityColor(params.value)}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'due_date',
      headerName: 'Échéance',
      width: 120,
      sortable: true,
      renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString('fr-FR') : '-'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            color="info"
            onClick={() => handleViewOpen(params.row)}
            title="Voir les détails"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEditOpen(params.row)}
            title="Modifier"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row)}
            title="Supprimer"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return <Alert severity="info">Aucune tâche trouvée. Ajoutez votre première tâche !</Alert>;
  }

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
          sorting: { sortModel: [{ field: 'id', sort: 'desc' }] },
        }}
        disableRowSelectionOnClick
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
      />

      {/* Dialogue Voir les détails */}
      <Dialog open={viewDialog} onClose={handleViewClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Détails de la tâche</Typography>
          <IconButton onClick={handleViewClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedTask && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                ID
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                #{selectedTask.id}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Titre
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: '500' }}>
                {selectedTask.title}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                {selectedTask.description || 'Aucune description'}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Statut
                  </Typography>
                  <Chip
                    icon={getStatusIcon(selectedTask.status)}
                    label={selectedTask.status}
                    color={getStatusColor(selectedTask.status)}
                    size="medium"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Priorité
                  </Typography>
                  <Chip
                    label={getPriorityLabel(selectedTask.priority)}
                    color={getPriorityColor(selectedTask.priority)}
                    size="medium"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Échéance
                  </Typography>
                  <Typography variant="body1">
                    {selectedTask.due_date ? new Date(selectedTask.due_date).toLocaleDateString('fr-FR') : 'Non définie'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Date de création
              </Typography>
              <Typography variant="body1">
                {selectedTask.created_at ? new Date(selectedTask.created_at).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'Non disponible'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} variant="contained" color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue Modifier */}
      <Dialog open={editDialog} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier la tâche</DialogTitle>
        <DialogContent>
          {editedTask && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Titre"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                value={editedTask.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                margin="normal"
                multiline
                rows={2}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Statut</InputLabel>
                <Select
                  value={editedTask.status}
                  onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                  label="Statut"
                >
                  <MenuItem value="À faire">À faire</MenuItem>
                  <MenuItem value="En cours">En cours</MenuItem>
                  <MenuItem value="Terminée">Terminée</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Priorité</InputLabel>
                <Select
                  value={editedTask.priority || 'medium'}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  label="Priorité"
                >
                  <MenuItem value="low">Basse</MenuItem>
                  <MenuItem value="medium">Moyenne</MenuItem>
                  <MenuItem value="high">Haute</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="date"
                label="Date d'échéance"
                value={editedTask.due_date || ''}
                onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Annuler</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
