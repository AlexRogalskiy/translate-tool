pipeline {
  agent any

  environment {
    REPO_NAME = "${env.JOB_NAME.split('/')[1]}"
    GOOGLE_CLIENT_ID = credentials('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = credentials('GOOGLE_CLIENT_SECRET')
    COOKIE_SECRET = credentials('COOKIE_SECRET')
  }

  stages {
    stage('Build') {
      steps {
        sh 'docker build --target build -t ${REPO_NAME}_build .'
      }
    }
    stage('Test') {
      steps {
        sh 'docker run ${REPO_NAME}_build npm test'
      }
    }
    stage('Build final') {
      steps {
        sh 'docker-compose -p $REPO_NAME build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker-compose -f docker-compose.yml -p $REPO_NAME up -d --remove-orphans'
      }
    }
  }
}
