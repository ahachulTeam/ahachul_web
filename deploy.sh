docker stop ahhachul_web
docker rm ahhachul_web

docker rmi $(docker images ahhachul/ahhachul_web -q)

docker pull ahhachul/ahhachul_web

docker run --name ahhachul_web -d -p 3000:3000 ahhachul/ahhachul_web:latest

echo "Deployment script executed successfully."