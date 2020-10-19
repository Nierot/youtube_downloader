FROM node:12

WORKDIR /app
RUN mkdir /app/temp
RUN chown node /app
RUN chown node /app/temp
RUN chmod 777 /app
RUN chmod 777 /app/temp

RUN apt update
RUN apt install ffmpeg -y

COPY . .

RUN npm install pm2 -g
RUN npm install

EXPOSE 8080
USER node

CMD [ "pm2-runtime", "app.js" ]