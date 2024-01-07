# Dockerize

add following file to root project to implement dockerize
1. `Dockerfile`

gitlab pipeline
1. `.gitlab-ci.yml`

manual pipeline
1. `deploy.sh`
    > don't forget to set permission executable with command `chmod +x` at first, then `nohup ./deploy.sh &` to run deploy