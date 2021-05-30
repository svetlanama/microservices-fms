## Intro
Microservice_C: Consumes heartbeats in order to apply penalty points to drivers that are not driving in a behaved manner. 
1 Penalty point is added for every Km over 60Km/h, 2 points for over 80Km/h, 5 points for over 100Km/h. 
Driver/Penalty point map is stored in a NoSQL store and exposed via an HTTP API


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
