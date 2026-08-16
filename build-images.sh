#!/bin/bash

# Definition des couleurs pour la lisibilite
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Démarrage du Build des Images SmartTask ===${NC}"

# 1. Build Database
echo -e "${GREEN}[1/3] Construction de l'image Database...${NC}"
docker build -t smarttask-database:v1.0 ./database
if [ $? -ne 0 ]; then echo -e "${RED}Erreur lors du build de Database${NC}"; exit 1; fi

# 2. Build Backend
echo -e "${GREEN}[2/3] Construction de l'image Backend...${NC}"
docker build -t smarttask-backend:v1.0 ./backend
if [ $? -ne 0 ]; then echo -e "${RED}Erreur lors du build de Backend${NC}"; exit 1; fi

# 3. Build Frontend
echo -e "${GREEN}[3/3] Construction de l'image Frontend...${NC}"
docker build -t smarttask-frontend:v1.0 ./frontend
if [ $? -ne 0 ]; then echo -e "${RED}Erreur lors du build de Frontend${NC}"; exit 1; fi

echo -e "${GREEN}=== Toutes les images ont été construites avec succès ! ===${NC}"
docker images | grep smarttask
