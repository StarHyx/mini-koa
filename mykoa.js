let mykoa = require('./application')
let app = new mykoa()
// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('hello world')
// })
// app.use(async ctx=>{
//     ctx.body = 'hello world' + ctx.url
// })
function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove()
        }, 2000)
    })
}
function report(id, code, message) {
    // code:0进入， code:1退出
    let status = !code ? "进入" : "退出"
    console.log(`${status}中间件${id} ${message}`)
}

app.use(async (ctx, next)=>{
    ctx.body = '1'
    report(1, 0, ctx.body)
    await next()
    ctx.body += '2'
    report(1, 1, ctx.body);
})
app.use(async (ctx, next) => {
    ctx.body += '3'
    report(2, 0, ctx.body);
    await delay()
    await next()
    ctx.body += '4'
    report(2, 1, ctx.body);
})
app.use(async (ctx, next)=>{
    report(3, 0, ctx.body);
    ctx.body += '5'
    report(3, 1, ctx.body);
})
app.listen(9092, () => {
    console.log('listening on 9092')
})