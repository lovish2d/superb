pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        PM2_HOME = "$HOME/.pm2"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Verify Backend Structure') {
            steps {
                sh '''
                echo "🔍 Checking BE folder..."
                ls -la
                ls -la BE
                ls -la BE/ecosystem.config.js
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('BE') {
                    echo '📦 Installing backend dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend (if applicable)') {
            steps {
                dir('BE') {
                    echo '🏗️ Building backend (if build script exists)...'
                    sh 'npm run build || echo "No build step found, skipping"'
                }
            }
        }

        stage('Restart Backend Services (PM2)') {
            steps {
                dir('BE') {
                    echo '🔄 Starting / Reloading PM2 services...'
                    sh '''
                    pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
                    pm2 save
                    pm2 list
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                echo '🩺 Checking backend services...'
                sh '''
                sleep 5

                curl -f http://localhost:2001 || exit 1
                curl -f http://localhost:2002 || exit 1
                curl -f http://localhost:2004 || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Backend deployed successfully'
        }

        failure {
            echo '❌ Backend deployment failed'
            sh 'pm2 list || true'
        }

        always {
            echo '📊 Final PM2 Status'
            sh 'pm2 list || true'
        }
    }
}
