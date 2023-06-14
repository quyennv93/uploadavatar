FROM node:16-alpine as builder

ENV NODE_ENV build

WORKDIR /file-service

RUN npm install -g npm

RUN yarn global add @nestjs/cli

COPY --chown=node:node . .

RUN rm -rf dist/

RUN yarn install --only=production --frozen-lockfile

RUN yarn build

RUN yarn cache clean --force

USER node
#----------------------------------------------------

FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /file-service

COPY --from=builder --chown=node:node /file-service/package.json ./package.json
COPY --from=builder --chown=node:node /file-service/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /file-service/dist/ ./dist/

USER node

CMD ["node", "dist/main.js"]