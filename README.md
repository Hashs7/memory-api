# Memory api
<p align="center"><img align="center" style="width:300px" src="./.github/memory-motel.png"/></p><br/>

## Links
### Resources
- 🛣 Memory Motel API Documentation: [memory-api.azurewebsites.net/docs](https://memory-api.azurewebsites.net/docs/)
- 📘 NestJS Documentation: [docs.nestjs.com](https://docs.nestjs.com/)
- 📘 MongoDB Documentation: [docs.mongodb.com](https://docs.mongodb.com/)
- 📘 Mongoose Documentation: [mongoosejs.com/docs](https://mongoosejs.com/docs/)
- 📘 TypeScript Documentation: [typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- 🚦 Git workflow [Git flow cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

### Main external packages
| Plugins                                                                        | Description                                                                                                              | Version                                                                                                                                           |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@expressjs/multer](https://github.com/expressjs/multer)             |🏞 Files middleware                                                                                                           | [![version](https://img.shields.io/npm/v/multer?style=flat-square)](https://www.npmjs.com/package/multer)                   | | ⏰ Immutable date-time                                                                                                   | [![version](https://img.shields.io/npm/v/dayjs.svg?style=flat-square)](https://www.npmjs.com/package/dayjs)                                       |
| [sharp](https://github.com/lovell/sharp)                                      |🏞  Cut images                                                                                              | [![version](https://img.shields.io/npm/v/sharp?style=flat-square)](https://www.npmjs.com/package/sharp)                                       |
| [passport-jwt](https://github.com/mikenicholson/passport-jwt)                                      | 🔑  JWT authentification                                                                                             | [![version](https://img.shields.io/npm/v/passport-jwt?style=flat-square)](https://www.npmjs.com/package/passport-jwt)                                       |
| [imagemin](https://github.com/imagemin/imagemin)                                      |🏞  Minify images                                                                                              | [![version](https://img.shields.io/npm/v/imagemin?style=flat-square)](https://www.npmjs.com/package/imagemin)                                       |


## Getting started
### Installation
Memory Motel App :
[github.com/Hashs7/memory-app](https://github.com/Hashs7/memory-app)

Postman configuration : [Memory motel.postman_collection.json](./.github/Memory motel.postman_collection.json)


[Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/) 

### Create local database
```
brew services start mongodb-community
mongo
use memorymotel
```

### Setup project
```bash
# copy env variables and fill with dev values
cp .env.example .env

# install dependencies
yarn install
``` 
### Populate BDD

```bash
# Populate categories
npx nestjs-command create:memory:categories
```

### Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```
### Lint code
```bash
# see lint errors and warnings
yarn lint

# fix errors and warnings automatically
yarn lint --fix
```
### Run for production
```bash
# build for production and launch server
yarn build
yarn start

# generate static project
yarn generate
```
## Dumps
### Dump local database
```
mongodump --host localhost:27017 -d {dbname} --out ./dump
```

### Dump database atlas with uri
```
mongodump --uri=mongodb+srv://{user}:{password}@{url}.mongodb.net/{dbname} --out ./dump-production
```

### Restore dump to local or production database 
```
mongorestore ./dump-production --drop
mongorestore --uri=mongodb+srv://{user}:{password}@{url}.mongodb.net/{dbname} ./dump --drop
```
## Workflow

```bash
# init git flow
git flow init
```

### Create feature

```bash
# init git flow
git checkout develop
git flow feature start my-feature-name
git flow feature publish my-feature-name
```

### Finish feature
```bash
git flow feature finish my-feature-name
```


