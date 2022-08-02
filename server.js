// The incoming request is sent as a stream of data by default in node.js
// That means the request is read by node in chunks until the full request is fullt parsed
// We can start working on these chunks before the whole request arrives, that is the point of the stream
// In order to work with these chunks of data, we use something called a buffer

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const requestBody = [];
    req.on('data', (chunk) => {
      // data event fires when a new chunk is ready to be read
      requestBody.push(chunk);
    });

    return req.on('end', () => {
      // We're done parsing the entire request
      const parsedRequestBody = Buffer.concat(requestBody).toString();
      const message = parsedRequestBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Default Page</title></head>');
  res.write('<body><h1>This is the default route heading</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
