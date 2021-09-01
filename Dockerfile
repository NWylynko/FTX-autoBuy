FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /var/www/api
COPY . .
RUN yarn install
RUN yarn build
CMD yarn start