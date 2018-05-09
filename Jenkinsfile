pipeline {
  agent {
    docker {
      image 'node'
    }
  }
  environment {
    PORT='8085'
    DB_URL='postgresql://Lalo:1423qrwe@35.232.218.219:5432'
    DEV_DB_USERNAME='Lalo'
    DEV_DB_PASSWORD='1423qrwe'
    DEV_DB_NAME='pozomaster-testing'
    DEV_DB_HOSTNAME='35.232.218.219'
    DEV_DB_PORT='5432'
    DEV_DB_DIALECT='postgres'
  }
  stages {
    stage('Clone Sources') {
      steps {
        git 'https://github.com/Juanfg/Pozomaster-Middleware.git'
      }
    }

    stage('Display Information') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('Dependencies') {
      steps {
        sh 'npm install'
        sh 'npm install -g sequelize-cli-typescript'
      }
    }

    stage('DB') {
      steps {
        sh 'npm run build-direct'
        sh 'sequelize db:migrate'
      }
    }

    stage('Tests') {
      steps {
        sh 'npm test'
      }
    }
  }
}
