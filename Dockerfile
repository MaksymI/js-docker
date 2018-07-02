FROM node:9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 8080
ENTRYPOINT ["npm", "run", "up"]