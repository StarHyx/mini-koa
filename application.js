let http = require('http')

class Application {
    constructor() {
        this.callback = () => {}
    }
    listen(...args) {
        const server = http.createServer((req, res) => {
            this.callback(req, res)
        })
        server.listen(...args)
    }
    use(callback) {
        this.callback = callback
    }
}

module.exports = Application