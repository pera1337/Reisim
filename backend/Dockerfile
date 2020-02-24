FROM node
WORKDIR /dipl
COPY ./package*.json ./
COPY ./.env .
COPY ./.env_sample .
RUN ls
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]