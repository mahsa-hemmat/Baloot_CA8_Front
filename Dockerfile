FROM node:14-alpine as BUILDER

COPY package*.json ./

RUN npm install && mkdir /react-ui && mv ./node_modules ./react-ui

WORKDIR /react-ui

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /react-ui/build /usr/share/nginx/html
COPY --from=builder /react-ui/src/css /usr/share/nginx/html/css

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Commands
# docker build -t front .
# docker run --name front -p 3000:80 front