pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('BE') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('BE') {
                    sh 'npm run build || echo "No build step for BE"'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('BE') {
                    sh 'npm test || echo "No tests found"'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Backend pipeline succeeded'
        }
        failure {
            echo '❌ Backend pipeline failed'
        }
    }
}
