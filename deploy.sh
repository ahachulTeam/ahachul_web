docker stop ahhachul_web
docker rm ahhachul_web

docker rmi $(docker images ahhachul/ahhachul-dev-web -q)

docker pull ahhachul/ahhachul-dev-web

docker run --name ahhachul_web -d -p 3000:3000 ahhachul/ahhachul-dev-web:latest

echo "Deployment script executed successfully."