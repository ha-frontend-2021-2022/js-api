import http from 'http';

const server = http.createServer(apiHandleRequest);

server.listen(4000);

async function apiHandleRequest(request, response){
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  switch (true) {
    case (
      request.url.startsWith('/api/hej') &&
      request.method.toLowerCase() === 'post'
    ):
      return hej(request, response);

    default:
      response.statusCode = 404;
      response.end('Not found');
      break;
  }
}

async function hej(request, response){
  const buffers = [];

  for await (const chunk of request){
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers).toString();
  const data = JSON.parse(body);

  response.statusCode = 200;
  response.end(JSON.stringify({
    success: true,
    data
  }));
}
