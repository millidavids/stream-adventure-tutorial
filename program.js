var through = require('through'),
    split = require('split'),
    nlines = 1;

function write(buf) {
    this.queue(
        buf.toString()[
            nlines++ % 2 === 0? 'toUpperCase' : 'toLowerCase']() + '\n');
}

process.stdin
    .pipe(split())
    .pipe(through(write))
    .pipe(process.stdout);
