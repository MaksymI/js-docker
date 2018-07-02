FROM node:9-alpine
ENV NODE_ENV production
EXPOSE 8080
ENTRYPOINT ["npm", "run", "up"]