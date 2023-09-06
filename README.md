## Overview
This is the client to be used if users want to interact with a GodPSIlla server.
It includes a NextJS frontend UI that interacts with a GRPC Client / HTTP Server, to make GRPC Calls to the upstream url of the GodPSIlla server specified.

Ports used: 3006, 3001

### Set up
1. Make sure your server side and microservices are up, so you can interact with them
2. Run `cd Query-UI && npm i` to download dependencies for UI
3. Run `npm run dev` to start UI on port 3006
4. Then run `cd ../client && go run main.go` to start up the GRPC Client / HTTP Server on port 3001
