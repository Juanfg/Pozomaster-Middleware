pipeline {
  environment {
    PORT=8085
    DB_URL='postgresql://Lalo:1423qrwe@35.232.218.219:5432'
    DEV_DB_USERNAME='Lalo'
    DEV_DB_PASSWORD='1423qrwe'
    DEV_DB_NAME='pozomasterdev'
    DEV_DB_HOSTNAME=35.232.218.219
    DEV_DB_PORT=5432
    DEV_DB_DIALECT='postgres'
  }
  agent {
    docker {
      image 'node'
    }
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
        sh 'npm install -g gulp'
      }
    }

    stage('DB') {
      steps {
        sh 'gulp build'
        sh 'sequelize db:migrate'
      }
    }
  }
}
