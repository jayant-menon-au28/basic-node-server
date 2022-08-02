# basic-node-server

A basic server created with vanilla node

## Functionality

- This server renders a form with a single input to GET requests to root
- Form submit redirects to /message
- Here, we write the contents of the input to a .txt file (message.txt harcoded)
- We then rediect the client back to root
- Get calls to any other routes generate a default static response
- Get calls to '/message' also generate default response
