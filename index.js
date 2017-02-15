'use strict';

const Hapi = require('hapi')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

// Add the route
server.route({
  method: 'GET',
  path:'/{path*}',
  handler: function (request, reply) {
    const payload = {
      'xForwardedFor': request.headers['x-forwarded-for'] || false,
      remoteAddress: request.info.remoteAddress || false
    }
    return reply(payload);
  }
})

// Start the server
server.start((error) => {

  if (error) {
    throw error
  }
  console.log('Server running at:', server.info.uri)
})
