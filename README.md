# dynamic-config

## Contents

* [Overview](#overview)
* [Scope](#scope)
* [Quick Start](#quick-start)
* [Set Up](#set-up)
* [Run Service](#run-service)
* [Testing](#testing)


# Overview
Dynamic config RESTful service for host configuration. Service stores config data which can be accessed by other services. Services is based on Node.js and Express Server with Lokijs driver. Database can be ported to MongoDB with current implementation - Lokijs.
Dynamic config service is live in https://ff-dcs.herokuapp.com/

# Scope

- In-memory document DB was implemented, it is possible to extend to MongoDB for persistency.
- Versioning is not allowed. So guid 3761 cannot be updated to from version 1.0 to version 1.1

# Quick Start

## Set Up 

On `workplace/ff-dcs/server`, run

```
npm install
```

## Run Service

Depending of prod or dev.

For prod

```
npm run start
```

For dev. Dev uses nodemon to avoid running the same binary over and over.

```
npm run dev 
```

# Docker

There are 2 Docker files: for build/devrun and for deploy/prodrun in Heroku.

## server/Dockerfile

For building the image, run on `/workplace/ff-dcs/server`:
```
docker build -t node-express-dcs .
```

After image is built, run nodemon/node in container:
```
docker run --rm -v `realpath .`:/app -p 3000:1337 -it node-express-dcs npm run start
```

```
docker run --rm -v `realpath .`:/app -p 3000:1337 -it node-express-dcs npm run dev 
```

## deploy Dockerfile

On ff-dcs/, build deployment image:

```
docker build -t ff-dcs .
```

Then, push to Heroku

```
heroku login
heroku container:login
heroku container:push web -a <inlet>
heroku container:release web -a <inlet>
```

# Testing

Test are implemented with Mocha/Chai framework for RESTful testing.

To run tests, do the following:

```
npm run test
```

or docker 

```
docker run --rm -v `realpath .`:/app -p 3000:1337 -it node-express-dcs npm test 
```

