# Memory api

## Installation
[Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/) 

### Create local database
```
brew services start mongodb-community
mongo
use parse
```

### Setup project
```
cp .env.example .env
yarn install
``` 

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```


## MongoDB commands

### Dump local database
```
mongodump --host localhost:27017 -d parse --out ./dump
```

### Dump database atlas with uri
```
mongodump --uri=mongodb+srv://{user}:{password}@{url}.mongodb.net/parse --out ./dump-production
```

### Restore dump to local or production database 
```
mongorestore ./dump-production --drop
mongorestore --uri=mongodb+srv://{user}:{password}@{url}.mongodb.net/parse ./dump --drop
```



