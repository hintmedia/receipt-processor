FROM node:latest

RUN yarn global add serverless
ENV PATH="${PATH}:/var/task:/home/node/.yarn/bin"
