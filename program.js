var combine = require('stream-combiner'),
    split = require('split')
    through = require('through')
    zlib = require('zlib');

module.exports = function() {
    var genreInfo;

    function write(buf) {
        if (buf.length === 0) {
            return;
        }

        buf = JSON.parse(buf);
        if (buf.type === 'genre') {
            if(genreInfo) {
                this.queue(JSON.stringify(genreInfo) + '\n');
            }

            genreInfo = {
                name: buf.name,
                books: []
            }

        } else {
            genreInfo.books.push(buf.name);
        }
    };

    function end() {
        this.queue(JSON.stringify(genreInfo) +'\n');
        this.queue(null);
    };

    return combine(
        split(),
        through(write, end),
        zlib.createGzip()
    );
};
