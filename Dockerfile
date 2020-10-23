FROM node-express-dcs:latest
COPY server /app
CMD ["npm", "start"]