# Car Parking System

## Overview
This project implements a RESTful API for a car parking system using TypeScript and NestJS. The system allows customers to use the parking lot without any human intervention, automating the ticketing process and managing parking slots efficiently.

## Features
- Initialize a parking lot with a specified number of slots.
- Expand the parking lot by adding more slots.
- Allocate parking slots to cars.
- Free up parking slots when cars exit.
- Fetch details of occupied slots and cars based on color or registration number.

## API Endpoints

- `POST /parking_lot`: Initialize a new parking lot.
- `PATCH /parking_lot`: Expand the parking lot by adding more slots.
- `POST /park`: Allocate a parking slot to a car.
- `GET /registration_numbers/:color`: Fetch all cars with a particular color.
- `GET /slot_numbers/:color`: Fetch all parking slots where a car of a particular color is parked.
- `POST /clear`: Free a parking slot based on slot number or car registration number.
- `GET /status`: Fetch all the occupied slots in the parking lot.

For full documentation, visit `/docs`.

## Installation and Usage
Follow the steps to clone the repository, install dependencies, and start the server.

## Technologies Used
- TypeScript
- NestJS

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```