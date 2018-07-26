let mykoa = require('./application')
let app = new mykoa()
app.use((req, res) => {
    res.writeHead(200)
    res.end('hello world')
})
app.listen(9092, () => {
    console.log('listening on 9092')
})