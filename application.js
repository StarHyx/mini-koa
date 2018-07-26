const http = require('http')
let request = {
    get url() {
        return this.req.url
    }
}
let response = {
    get body() {
        return this._body
    },
    set body(val) {
        this._body = val
    }
}

let context = {
    get url() {
        return this.request.ur;
    },
    get body() {
        return this.response.body
    },
    set body(val) {
        this.response.body = val
    }
}
class Application {
    constructor() {
        this.context = context
        this.request = request
        this.response = response
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            let ctx = this.createCtx(req, res)
            await this.callback(ctx)
            ctx.res.end(ctx.body)
        })
        server.listen(...args)
    }
    use(callback) {
        this.callback = callback
    }
    // 新建ctx 挂载http的res和req
    createCtx(req, res) {
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = Application