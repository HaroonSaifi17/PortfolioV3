FROM node:20 as build
WORKDIR /app/src
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM node:20
WORKDIR /usr/app
COPY --from=build /app/src/dist/portfolio-v3/ ./
CMD ["node", "./server/server.mjs"]
EXPOSE 4000
