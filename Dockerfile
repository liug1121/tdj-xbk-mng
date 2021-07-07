FROM node:12.15.0-slim
COPY ./ /app
WORKDIR /app
RUN npm install \
     --registry=https://registry.npm.taobao.org \
     --disturl=https://npm.taobao.org/dist \
     && npm run build

FROM nginx:1.17.8-alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
ENV TZ=Asia/Shanghai
COPY nginx.conf /etc/nginx/nginx.conf
