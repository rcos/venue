# venue
[![Build Status](https://travis-ci.org/rcos/venue.svg?branch=dev)](https://travis-ci.org/rcos/venue)
[![GitHub release](https://img.shields.io/github/release/qubyte/rubidium.svg?maxAge=2592000)]() 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rcos/venue/dev/LICENSE.md)

[![GitHub issues](https://img.shields.io/github/issues/rcos/venue.svg?maxAge=2592000)]() 
[![GitHub pull requests](https://img.shields.io/github/issues-pr/rcos/venue.svg)]() 

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.1.0.

## Getting Started

### Deploying with Docker

If you'd like the run venue without modifying it, you can use our docker image
which you can find at [rcos/venue on the docker hub](https://hub.docker.com/r/rcos/venue/).

The instructions for running the docker image are available on docker hub.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](http://nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](http://bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

### Building the Docker Image

To build the docker image, go to your venue directory and run the following
command.

`docker build -t rcos/venue .`

You can then upload your image (assuming you have the correct permissions) using

`docker push rcos/venue`

## Testing

Running `npm test` will run the unit tests with karma.
