#!groovy
pipeline {
    agent none
    stages {
        stage('Docker build') {
            agent any
            steps {
                sh 'docker build -t intechgroup/cac_front:latest .'
            }
            
        }
        stage('Docker Push') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                sh 'docker push intechgroup/cac_front:latest'
                }
                    
            }

        }
        stage('Docker Stop containers using old image') {
            agent any
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE'){
                    sh 'docker-compose stop cac_front'
                    sh 'docker rm cac_front'
                    sh 'docker image rm intechgroup/cac_front:latest'
                }

            }

        }
        stage('Docker Pull Image') {
            agent any
            steps {
                sh 'docker pull intechgroup/cac_front:latest'
            }

        }
        stage('Docker Run container') {
            agent any
            steps {
                sh 'docker-compose up -d cac_front'             }

        }
    }
}
 