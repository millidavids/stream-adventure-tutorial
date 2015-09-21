var crypto = require('crypto'),
    passphrase = process.argv[2],
    stream = crypto.createDecipher('AES256', passphrase);

process.stdin.pipe(stream).pipe(process.stdout);
