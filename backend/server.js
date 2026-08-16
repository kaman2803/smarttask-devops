const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Configuration de la connexion MySQL via variables d'environnement
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpass',
  database: process.env.DB_NAME || 'smarttask_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Création automatique de la table lors du démarrage du backend
const initDb = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'À faire',
      priority VARCHAR(50) DEFAULT 'medium',
      due_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(query, (err) => {
    if (err) {
      console.error('Erreur d initialisation de la table MySQL:', err.message);
    } else {
      console.log('Table "tasks" vérifiée / créée avec succès dans MySQL.');
    }
  });
};

// Attendre un peu avant d'initialiser pour laisser le temps à MySQL de démarrer
setTimeout(initDb, 5000);

// Routes API
app.get('/', (req, res) => {
  res.json({ message: "API SmartTask opérationnelle et connectée à la base de données !" });
});

// GET: Récupérer la liste des tâches depuis MySQL
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY id DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST: Ajouter une nouvelle tâche dans MySQL
app.post('/api/tasks', (req, res) => {
  const { title, description, status, priority, due_date } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Le titre est obligatoire' });
  }

  const query = 'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description || '', status || 'À faire', priority || 'medium', due_date || null], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, title, description, status, priority, due_date });
  });
});

// PUT: Modifier une tâche existante
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, due_date } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Le titre est obligatoire' });
  }

  const query = `
    UPDATE tasks 
    SET title = ?, description = ?, status = ?, priority = ?, due_date = ? 
    WHERE id = ?
  `;
  
  db.query(query, [title, description || '', status || 'À faire', priority || 'medium', due_date || null, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.json({ id, title, description, status, priority, due_date });
  });
});

// DELETE: Supprimer une tâche
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.json({ message: 'Tâche supprimée avec succès' });
  });
});

// Route de santé pour le healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend SmartTask démarré sur le port ${PORT}`);
});
