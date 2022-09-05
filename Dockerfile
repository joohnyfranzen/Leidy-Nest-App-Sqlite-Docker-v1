FROM node:14-alpine as build

WORKDIR /leidyapp
COPY package.json ./
RUN npm config set registry http://registry.npmjs.org/
COPY prisma ./prisma/
COPY .env ./.env
RUN npm cache clean --force
RUN npm install @prisma/client@4.3.1
RUN npm install prisma --save-dev
RUN npx prisma generate reset -y
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /leidyapp
COPY package.json ./
COPY prisma ./prisma/
COPY .env ./.env
RUN npm config set registry http://registry.npmjs.org/
RUN npm install @prisma/client@4.3.1
RUN npm install prisma --save-dev
RUN npx prisma generate reset -y
RUN npm install --only=production
COPY --from=build /leidyapp/dist ./dist
CMD npm run start:prod
