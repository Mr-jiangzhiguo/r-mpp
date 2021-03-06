// 根据命令行输入(`npm run deploy projectName`)获取工程名
const fs = require('fs');
const { resolve } = require('path');
let projectName = process.argv[2];
if (!projectName) {
  projectName = require('../scripts/project').name;
  if (projectName == 'undefined' || !projectName) {
    const chalk = require('chalk');
    console.log(chalk.red('请输入要部署的工程名'));
    process.exit(1);
  }
} else {
  fs.writeFileSync(
    resolve(__dirname, '../scripts/project.js'),
    `exports.name = '${projectName}';\n`
  );
}

const execSync = require('child_process').execSync;
const originDirectory = resolve(__dirname, '../dist/');
const targetDirectory = resolve(__dirname, '../dists/', projectName);
if (fs.existsSync(targetDirectory)) {
  console.log(`rm -rf ${targetDirectory}/*`);
  execSync(`rm -rf ${targetDirectory}/*`);
} else {
  console.log(`mkdir -p ${targetDirectory}`);
  execSync(`mkdir -p ${targetDirectory}`);
}
execSync(`npm run build && cp -rf ${originDirectory}/* ${targetDirectory}`, {
  stdio: 'inherit',
});
