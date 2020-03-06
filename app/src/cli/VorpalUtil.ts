const chalk = require('chalk');

export class VorpalUtil{

    static error(msg: string){
        return chalk.red.bold(msg);
    }

    static warn(msg: string){
        return chalk.magenta.bold(msg);
    }

    static info(msg: string){
        return chalk.cyan(msg);
    }

    static success(msg: string){
        return chalk.green(msg);
    }
}
