# E-Hotels
## Environment Variables
No matter whether the project is being run in production or debugging mode the following environment variables must always be included.
1. `PGHOST=<DB host name>`
1. `PGPORT=<DB Port (typically 5432)>`
1. `PGDATABASE=<DB name>`
1. `PGUSER=<DB username>`
1. `PGPASSWORD=<DB password>`

## Running the Project
To run the code simply clone the repo, and call the following two commands from the project directory
1. `npm install`
1. `npm run start`

The website should now be running on `localhost:3001`

These first command will install the dependencies for the back-end. The second will install the dependencies for the front-end then build it into a deployable version before starting the back-end (which will serve the built version)

## Debugging the Project
To run the project call `npm run debug` this will launch the app in developement mode on `localhost:3000`. While in development mode code changes will trigger the app to update. It is worth noting that while in developement mode the API runs on a separate port (3001), and the front-end proxies request to this port automatically.