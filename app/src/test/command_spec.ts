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

    it('search by due', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSearchByDue({
            "due": "2020.3.14"
        });
    })

    it('search by due range 3', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSearchByDue({
            "due": "2020.3.12",
            "options": {
                "range": "3"
            }
        });
    });

    it('search by due range 3 grouping by due', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSearchByDue({
            "due": "2020.3.12",
            "options": {
                "range": "3",
                "group-by": 'due'
            }
        });
    });

    it('search by due range 3 and milestone `SP-19` grouping by due', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSearchByDue({
            "due": "2020.3.12",
            "options": {
                "range": "3",
                "milestones": "SP-19",
                "group-by": 'due'
            }
        });
    });

    it('search by due range 3 label `bug` grouping by due', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSearchByDue({
            "due": "2020.3.12",
            "options": {
                "range": "3",
                "labels": 'bug',
                "group-by": 'due'
            }
        });
    });

    it('search by due range 3 label `bug` grouping by due with close state', async function(){
        this.timeout(5000);
        await VorpalCommand.cmdSearchByDue({
            "due": "2020.3.12",
            "options": {
                "range": "3",
                "labels": 'bug',
                "group-by": 'due',
                "all": true
            }
        });
    });
});
