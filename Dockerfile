FROM node:12.20.0-alpine

# RUN apk add tzdata

# ENV NODE_ENV=development

# ENV TZ=Asia/Bangkok

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000

CMD ["node", "dist/main.js"]
