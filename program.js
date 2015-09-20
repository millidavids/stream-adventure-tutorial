var through = require('through2'),
    trumpet = require('trumpet'),
    tr = trumpet(),
    stream = tr.select('.loud').createStream(),
    th = through(function(buf, _, next) {
        this.push(buf.toString().toUpperCase());
        next();
    });

process.stdin.pipe(tr).pipe(process.stdout);
stream.pipe(th).pipe(stream);
