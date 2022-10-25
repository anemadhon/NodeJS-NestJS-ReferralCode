## Installation

```bash
$ npm install
```

## Running the app

```bash
# copy .env.example
$ cp .env.example .env

# prisma migrate
$ npx prisma migrate dev

# launch prisma studio
$ npx prisma studio

# prisma seed
$ npm prisma:seed

# swagger docs
$ {your host}/api/docs

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
