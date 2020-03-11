import { should } from 'chai';
should()

import {VorpalCommand} from "../cli/VorpalCommand";
import {Project} from "../lib/due/Project";
import SimpleProgress from "../lib/util/SimpleProgress";

describe("Vorpal Command", function() {
    before(async function(){
        this.timeout(15000);
        await VorpalCommand.cmdSetCurrentProject({id: 4038195})
    });

    it('show repo info', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdRepoInfo();
    });

    it('list project', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdListProject();
    });

    it('set project id', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSetCurrentProject({id: 4038195});
    });

    it('list tasks on project', async function(){
        this.timeout(30000);
        await VorpalCommand.cmdListTasks();
    });

    it('select task number', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSetCurrentTask({number: 1});
    })

    it('show task detail with number', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdShowTaskDetail({number: 2});
    });

    it('show task detail by current number', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdShowTaskDetail();
    });

});