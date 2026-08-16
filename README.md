# SmartTask DevOps

SmartTask est une application web de gestion de tâches développée selon une architecture microservices et entièrement conteneurisée avec Docker.

## Architecture & Technologies

* **Frontend** : Application React / Vite servie par Nginx
* **Backend** : API REST Node.js / Express
* **Database** : Base de données relationnelle MySQL 8.0
* **Orchestration** : Docker Compose
* **CI/CD** : Jenkins Automation Pipeline

---

## Structure du Dépôt

```text
smarttask-devops/
├── backend/            # Code source de l'API Node.js/Express & Dockerfile
├── database/           # Dockerfile et configurations MySQL
├── frontend/           # Code source de l'interface React & Dockerfile
├── .env.example        # Modèle pour les variables d'environnement
├── .gitignore          # Fichiers et répertoires ignorés par Git
├── build-images.sh     # Script Bash de build individuel des images Docker
├── docker-compose.yml  # Fichier d'orchestration multi-conteneurs
├── Jenkinsfile         # Pipeline CI/CD automatisé
└── README.md           # Documentation du projet
Prérequis
Docker Engine (v20.10+)

Docker Compose (v2.0+)

Git

Guide de Déploiement Rapide
Cloner le dépôt et accéder au répertoire :

Bash
git clone [https://github.com/VOTRE_USERNAME/smarttask-devops.git](https://github.com/VOTRE_USERNAME/smarttask-devops.git)
cd smarttask-devops
Configurer les variables d'environnement :

Bash
cp .env.example .env
Lancer la stack d'applications :

Bash
docker compose up -d --build
Vérifier l'état des conteneurs :

Bash
docker compose ps

Tableau des Endpoints et Ports Exposés

| Service | URL / Port | Description |
|---------|------------|-------------|
| **Frontend** | `http://localhost:8081` | Interface utilisateur React |
| **Backend API** | `http://localhost:5000/api/tasks` | Endpoints API REST |
| **Healthcheck** | `http://localhost:5000/api/health` | État de santé de l'API |
| **MySQL** | `localhost:3306` | Accès direct à la base de données |

Stratégie de Branches Git
Dev : Branche de développement et d'intégration continue.

Prod : Branche stable de production pour les déploiements finaux.
