const vorpal = require('vorpal')();

vorpal.command('echo', 'test')
    .action((args:any, callback:any)=>{
        console.log('hello');

        callback();
    });

vorpal
    .delimiter('due$');

module.exports = vorpal;