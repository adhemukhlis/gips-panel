# Exit immediately if any command fails
set -e

curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?chat_id=-1002085454126&text=%F0%9F%9A%80"
curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?parse_mode=HTML&chat_id=-1002085454126&text=%F0%9F%9A%A7%20start%20docker-build%20:%20%3Cb%3Efe-finance-modeler%3C/b%3E%20%3Ci%3Estart%20at%20server_time%3C/i%3E%0A%0A%F0%9F%91%B7%E2%80%8D%E2%99%82%EF%B8%8F%20server"
git checkout development
git pull origin_server development --force || true
yarn generate-build-hash || true
docker build -t registry.gitlab.com/fe-finance-modeler-workplace/fe-finance-modeler . || {
  curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?parse_mode=HTML&chat_id=-1002085454126&text=%F0%9F%99%88%20docker-build%20failed%20%3A%20%3Cb%3Efe-finance-modeler%3C%2Fb%3E%0D%0A%0D%0A%F0%9F%91%B7%E2%80%8D%E2%99%82%EF%B8%8F%20server"
  curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?chat_id=-1002085454126&text=%F0%9F%99%88"
  exit 1
}
curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?parse_mode=HTML&chat_id=-1002085454126&text=%E2%9C%85%20docker-build%20success%20%3A%20%3Cb%3Efe-finance-modeler%3C%2Fb%3E%0D%0A%0D%0A%F0%9F%91%B7%E2%80%8D%E2%99%82%EF%B8%8F%20server%0D%0A%0D%0A1%20of%202"
docker stop fe-finance-modeler-container || true
docker rm fe-finance-modeler-container || true
docker run -p 3040:3000 -d --name fe-finance-modeler-container registry.gitlab.com/fe-finance-modeler-workplace/fe-finance-modeler || {
  curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?parse_mode=HTML&chat_id=-1002085454126&text=%F0%9F%99%88%20deploy%20failed%20%3A%20%3Cb%3Efe-finance-modeler%3C%2Fb%3E%0D%0A%0D%0A%F0%9F%91%B7%E2%80%8D%E2%99%82%EF%B8%8F%20server"
  curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?chat_id=-1002085454126&text=%F0%9F%99%88"
  exit 1
}
curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?parse_mode=HTML&chat_id=-1002085454126&text=%E2%9C%85%20deploy%20success%20%3A%20%3Cb%3Efe-finance-modeler%3C%2Fb%3E%0D%0A%0D%0A%F0%9F%91%B7%E2%80%8D%E2%99%82%EF%B8%8F%20server%0D%0A%0D%0A2%20of%202"
curl --location --request GET "https://api.telegram.org/bot5499231928:AAHRsHtbGpS80fu7sonnTCIo2CUh32hNb-k/sendMessage?chat_id=-1002085454126&text=%F0%9F%A5%B3"
docker image prune --force --filter='dangling=true'
docker builder prune --force