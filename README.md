<p align="center">
    <img src="https://user-images.githubusercontent.com/10917080/32852976-c373540a-ca07-11e7-9e0d-0421fc662af0.png" width=200px/>
</p>

## Venue is a platform that allows instructors to give students credit for attending events. An instructor signs on and creates courses and events, students can then use the venue app to upload event submissions, which can contain images or GPS data that verifies a student attended an event.


[![Build Status](https://travis-ci.org/rcos/venue.svg)](https://travis-ci.org/rcos/venue)
[![GitHub release](https://img.shields.io/github/release/qubyte/rubidium.svg?maxAge=2592000)]()
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rcos/venue/dev/LICENSE.md)

[![GitHub issues](https://img.shields.io/github/issues/rcos/venue.svg?maxAge=2592000)](https://github.com/rcos/venue/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/rcos/venue.svg)](https://github.com/rcos/venue/pulls)

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.1.0.

## Getting Started

### Deploying with Docker

If you'd like the run venue without modifying it, you can use our docker image
which you can find at [rcos/venue on the docker hub](https://hub.docker.com/r/rcos/venue/).

The instructions for running the docker image are available on docker hub.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

### Building the Docker Image

To build the docker image, go to your venue directory and run the following
command.

`docker build -t rcos/venue .`

You can then upload your image (assuming you have the correct permissions) using

`docker push rcos/venue`

## Testing

Running `npm test` will run the unit tests with karma.
