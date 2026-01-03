# Étape 1 : build Angular
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration production


# Étape 2 : image "artefacts" (contient uniquement le dist)
FROM alpine:3.20 AS dist

WORKDIR /dist
COPY --from=build /usr/src/app/dist/weight-tracker/ /dist/
