FROM node:9-slim
COPY server /app
WORKDIR /app/server
RUN npm install
CMD ["npm", "start"]

