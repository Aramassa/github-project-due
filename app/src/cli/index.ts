import {VorpalCommand} from "./VorpalCommand";

const vorpal = require('vorpal')();


let projectId:string;

vorpal.command('repo info', 'リポジトリの情報を表示する')
    .action(VorpalCommand.cmdRepoInfo);

vorpal.command('project list', 'プロジェクト一覧を取得する')
    .action(VorpalCommand.cmdListProject);

vorpal.command('project set <id>', 'プロジェクトを指定する')
    .action(VorpalCommand.cmdSetCurrentProject);

vorpal.command('issue list', 'issueの一覧を表示する')
    .action(VorpalCommand.cmdListIssues);

vorpal
    .delimiter('due$');

module.exports = vorpal;