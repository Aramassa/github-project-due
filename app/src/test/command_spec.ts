import { should } from 'chai';
should()

import {VorpalCommand} from "../cli/VorpalCommand";
import {Project} from "../lib/due/Project";
import SimpleProgress from "../lib/util/SimpleProgress";

describe("Vorpal Command", function() {
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
        await VorpalCommand.cmdSetCurrentProject({id: 12345});
    });

    it('list tasks on project', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSetCurrentProject({id: 4038195})
        await VorpalCommand.cmdListIssues();
    });

    it('test progress bar', async function(){
        this.timeout(5000);

        var prog = new SimpleProgress(40);
        var timer = setInterval(function () {
            prog.tick();
            if (prog.complete) {
                console.log('\ncomplete\n');
                clearInterval(timer);
            }
        }, 50);

        await new Promise(function(suc, rej){
            setTimeout(suc, 3500);
        })
    });
});