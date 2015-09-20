var duplexer = require('duplexer2'),
    through = require('through2').obj;

module.exports = function(counter) {
    var count = {};
    var input = through(write, end);
    return duplexer(input, counter);

    function write(row, _, next){
        count[row.country] = (count[row.country] || 0) + 1;
        next();
    };

    function end(done) {
        counter.setCounts(count);
        done();
    };
};
