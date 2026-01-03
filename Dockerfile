# Étape 1 : build Angular
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copier uniquement package.json et installer dépendances
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copier tout le code Angular et builder en mode prod
COPY . .
RUN npm run build -- --configuration production

# Étape 2 : serveur Nginx pour exposer le build
FROM nginx:alpine

# Supprimer la conf par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre config Nginx
COPY nginx.conf /etc/nginx/conf.d

# Copier les fichiers buildés depuis l’étape 1
COPY --from=build /usr/src/app/dist/weight-tracker/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
