import http from 'http'

const server = http.createServer((req:any, res:any) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Node')
})

server.listen(3000, () => {
  console.log('Server running on port 3000');
})