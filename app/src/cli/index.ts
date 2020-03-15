import {VorpalCommand} from "./VorpalCommand";

const vorpal = require('vorpal')();


let projectId:string;

vorpal.command('repo info', 'リポジトリの情報を表示する')
    .action(VorpalCommand.cmdRepoInfo);

vorpal.command('project list', 'プロジェクト一覧を取得する')
    .action(VorpalCommand.cmdListProject);

vorpal.command('project set <id>', 'プロジェクトを指定する')
    .action(VorpalCommand.cmdSetCurrentProject);

vorpal.command('task list', 'issueの一覧を表示する')
    .action(VorpalCommand.cmdListTasks);

vorpal.command('task set <number>', 'issue number をセットする')
    .action(VorpalCommand.cmdSetCurrentTask);

vorpal.command('task detail [number]', 'issue 詳細')
    .action(VorpalCommand.cmdShowTaskDetail)

vorpal.command('task snooze [num] [unit]', '期限をスヌーズ')
    .action(VorpalCommand.cmdSnoozeTaskDue)

vorpal.command('task advance [num] [unit]', '期限をフォワード')
    .action(VorpalCommand.cmdAdvanceTaskDue)
    
vorpal.command('search due [due]', '期日で探す')
    .option('-t --today', '本日基準')
    .option('-g, --group-by <type>', 'グルーピング', ['due', 'label'])
    .option('-l, --labels <label>', 'ラベルの指定')
    .option('-m, --milestones <name>', 'マイルストーンの指定')
    .option('-r, --range <range>', '期間の指定')
    .option('-a, --all', 'close も対象にする')
    .alias('due')
    .action(VorpalCommand.cmdSearchByDue)


vorpal
    .delimiter('due$');

module.exports = vorpal;
