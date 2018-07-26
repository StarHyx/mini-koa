const http = require('http')

const server = http.createServer((req, res) =>{
    res.writeHead(200)
    res.end('hello world')
})

server.listen(9092, ()=>{
    console.log('listening on 9092')
})