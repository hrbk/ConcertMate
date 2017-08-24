'use strict'

let fs = require('fs');

fs.createReadStream('env-example')
  .pipe(fs.createWriteStream('.env'));