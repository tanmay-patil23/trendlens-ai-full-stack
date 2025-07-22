# frontend/Dockerfile

FROM node:18-bullseye

RUN apt-get update && apt-get install -y python3 g++ make \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]
