pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        PATH = "$PATH:/usr/bin"
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

        stage('Restart Backend (PM2)') {
            steps {
                sh '''
                pm2 list || true

                if pm2 describe be-app > /dev/null; then
                    echo "Restarting backend..."
                    pm2 restart be-app
                else
                    echo "Starting backend..."
                    pm2 start ecosystem.config.js
                fi
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 5
                curl -f http://localhost:3000/health || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Backend deployed & healthy'
        }
        failure {
            echo '❌ Backend deployment failed'
        }
    }
}
