FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /var/www/api
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 4000
CMD yarn start