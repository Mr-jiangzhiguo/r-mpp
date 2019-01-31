let projectName = process.argv[2]
if(!projectName){
    projectName = require('./project').name
    if (projectName == 'undefined'||!projectName) {
        const chalk = require('chalk');
        console.log(chalk.red('请输入要运行的工程名'));
        process.exit()
    }
    
}else{
    const fs = require('fs')
    fs.writeFileSync('./config/project.js', `exports.name = '${projectName}'`)
}

const exec = require('child_process').execSync;
exec('npm run dev', {stdio: 'inherit'});

