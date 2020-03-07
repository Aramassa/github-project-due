import { should } from 'chai';
should()

import {VorpalCommand} from "../cli/VorpalCommand";
import {Project} from "../lib/due/Project";

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
        let proj:Project = await VorpalCommand.cmdListIssues();

        proj.debug_line.should.contains("Test Project 001");
    });
});