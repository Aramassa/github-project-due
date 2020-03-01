import { should } from 'chai';
should()

import {VorpalCommand} from "../cli/VorpalCommand";

describe("Vorpal Command", function() {
    it('show repo info', async () => {
        this.timeout(5000);
        VorpalCommand.cmdRepoInfo();
    });

    it('list project', async()=>{
        this.timeout(5000);
        VorpalCommand.cmdListProject();
    });

    it('set project id', async()=>{
        this.timeout(5000);
        VorpalCommand.cmdSetCurrentProject({id: 12345});
    })

    it('list issues on project', async()=>{
        this.timeout(5000);
        VorpalCommand.cmdListIssues();
    })
});