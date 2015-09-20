var http = require('http'),
    through = require('through'),
    port = process.argv[2],
    server = http.createServer(function(req, res) {
        if (req.method === 'POST') {
            req.pipe(through(write, end)).pipe(res);
        }
    });

function write(buf) {
    this.queue(buf.toString().toUpperCase());
}

function end() {
    this.queue(null);
}

server.listen(port);
