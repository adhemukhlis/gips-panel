FROM node:20.9.0-alpine as build

WORKDIR /app
COPY . /app/

# RUN rm yarn.lock
RUN yarn install --network-timeout 900000
# RUN yarn set-build-hash
RUN yarn build

# Prepare nginx
# FROM nginx:latest
# COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3000
# EXPOSE ${PORT}
CMD ["yarn", "start"]