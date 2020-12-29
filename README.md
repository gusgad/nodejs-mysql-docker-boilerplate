# Node.js, Express.js, MySQL Boilerplate

A Node.js, Express.js, MySQL, Knex.js, JWT, EsLint, Docker Compose boilerplate for fast API developement. The API is well secured, using latest packages for that. On top of that, user authentication with JWT is also in place. The SQL queries are built with Knex.js for easier development.

### How to launch locally
The docker-composer.yml file:
1. Starts a MySQL server container based on the [official image](https://hub.docker.com/_/mysql/),
2. Starts a [Node.js 14.5.0](https://hub.docker.com/_/node/) app that waits for the database to become responsive, and run all migrations and seeds if necessary,

You only need to have [Docker](https://www.docker.com/) installed in your computer, nothing else.
The docker-compose.yml file creates a bind mount directoty that allows you to test anything live, just change the code for the server or client and it will immediately become available.

The data for the MySQL will persist between launches.

To bring the project up first [install Docker](https://www.docker.com/), then run:

```
docker-compose up
```

The docker-compose.yml will host the Express app on port `5000` & MySQL DB on port `3306` on the Docker environment.

To bring it down:

```
docker-compose down -v
```

If you change your Dockerfile and must rebuild the Node.js or React images, run:

```
docker-compose up --build
```
To have EsLint properly linting your files, make sure you run
```
cd server
docker-compose up --build
```
in order to have `node-modules` locally.

For improvements - please, don't hesitate to submit Pull Requests.