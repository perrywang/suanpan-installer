const exec = require('child_process').exec

function run(cmdString) {
    console.log('run: ', cmdString)
    let runner = exec(cmdString,function(err,stdout,stderr){
        console.log(err)
        console.log(stdout)
        console.log(stderr)
    });
    runner.on('close', function () {
        console.log('exit')
    })
}
module.exports = run