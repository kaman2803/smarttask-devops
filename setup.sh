#!/bin/bash
# ==============================================================================
# SCRIPT D'INITIALISATION DE L'ENVIRONNEMENT DEVOPS
# Auteur : Kaman GOUMOU - Ingénieur Réseaux et Systèmes - Certifié CCNA
# Projet :  Microservices - SmartTask
# ==============================================================================

set -e # Arrêt immédiat en cas d'erreur sur une commande

echo "=================================================="
echo " 1. CRÉATION DE L'ARBORESCENCE DU PROJET"
echo "=================================================="
mkdir -p ~/smarttask-devops/{frontend,backend,database}
cd ~/smarttask-devops

# Instanciation des fichiers requis par le sujet d'examen
touch README.md docker-compose.yml Jenkinsfile
touch frontend/Dockerfile backend/Dockerfile database/Dockerfile

echo "=================================================="
echo " 2. MISE À JOUR DU SYSTÈME ET OUTILS DE BASE"
echo "=================================================="
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget gnupg lsb-release ca-certificates apt-transport-https software-properties-common git

echo "=================================================="
echo " 3. INSTALLATION DE DOCKER ENGINE & DOCKER COMPOSE"
echo "=================================================="
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Ajout de l'utilisateur courant au groupe docker
sudo usermod -aG docker $USER

echo "=================================================="
echo " 4. INSTALLATION DE NODE.JS 20 LTS"
echo "=================================================="
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "=================================================="
echo " 5. INSTALLATION DE JAVA 21 & JENKINS"
echo "=================================================="
# Installation de OpenJDK 21 (Requis par Jenkins)
sudo apt install -y openjdk-21-jre openjdk-21-jdk
sudo update-alternatives --set java /usr/lib/jvm/java-21-openjdk-amd64/bin/java

# Clé GPG et dépôt Jenkins officiels à jour
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key 2>/dev/null || \
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io.key

cat /usr/share/keyrings/jenkins-keyring.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/jenkins.gpg --yes
echo "deb [signed-by=/etc/apt/trusted.gpg.d/jenkins.gpg] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install -y jenkins

# Ajout de l'utilisateur jenkins au groupe docker pour l'exécution des pipelines CI/CD
sudo usermod -aG docker jenkins
sudo systemctl enable --now jenkins

echo "=================================================="
echo " 6. VÉRIFICATION DU DEPLOIEMENT"
echo "=================================================="
echo "Docker :         $(docker --version)"
echo "Docker Compose : $(docker compose version)"
echo "Git :            $(git --version)"
echo "Node.js :        $(node -v)"
echo "Java :           $(java -version 2>&1 | head -n 1)"
echo "Jenkins Status : $(sudo systemctl is-active jenkins)"

echo "--------------------------------------------------"
echo "INSTALLATION TERMINÉE AVEC SUCCÈS !"
echo "--------------------------------------------------"
