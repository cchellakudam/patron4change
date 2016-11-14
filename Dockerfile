FROM node:7.1.0-alpine
MAINTAINER Lukas Stanek <stanek@gmx.at>

EXPOSE 3000

COPY ./ /p4c/

RUN mkdir /home/node
RUN chown node:node /home/node
RUN chown -R node:node /p4c/

WORKDIR /p4c
USER node

RUN npm i

CMD ["npm", "start"]
