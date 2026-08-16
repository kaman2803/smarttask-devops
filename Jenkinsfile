pipeline {
    agent {
        label 'smarttask-docker'
    }

    environment {
        DOCKERHUB_USER = 'kaman2803'
        IMAGE_TAG = "${BRANCH_NAME}-${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '=== 1. Récupération du code source ==='
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                echo '=== 2. Construction des images Docker ==='

                sh """
                    docker build -t ${DOCKERHUB_USER}/smarttask-database:${IMAGE_TAG} ./database
                    docker build -t ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG} ./backend
                    docker build -t ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG} ./frontend
                """
            }
        }

        stage('Tag Images') {
            steps {
                echo '=== 3. Attribution du tag latest ==='

                sh """
                    docker tag ${DOCKERHUB_USER}/smarttask-database:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-database:latest
                    docker tag ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-backend:latest
                    docker tag ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-frontend:latest
                """
            }
        }

        stage('Login Docker Hub') {
            steps {
                echo '=== 4. Connexion à Docker Hub ==='

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            --username "$DOCKER_USER" \
                            --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Hub') {
            steps {
                echo '=== 5. Publication des images ==='

                sh """
                    docker push ${DOCKERHUB_USER}/smarttask-database:${IMAGE_TAG}
                    docker push ${DOCKERHUB_USER}/smarttask-database:latest

                    docker push ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG}
                    docker push ${DOCKERHUB_USER}/smarttask-backend:latest

                    docker push ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG}
                    docker push ${DOCKERHUB_USER}/smarttask-frontend:latest
                """
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
            echo '=== Fin du pipeline ==='
        }

        success {
            echo "Pipeline exécuté avec succès pour la branche ${BRANCH_NAME}."
        }

        failure {
            echo "Échec du pipeline CI/CD sur la branche ${BRANCH_NAME}."
        }
    }
}
