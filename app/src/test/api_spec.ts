import { should } from 'chai';
should()

import {GithubApi} from "../lib/github/GithubApi"
import {DueStamp} from "../lib/util/DueStamp";

const projectId:string = "4038195";
const apiTest1:GithubApi = new GithubApi("Aramassa", "github-project-due-test");

describe("GithubApi", function() {

    it('list projects on repo', async function(){
        this.timeout(5000);
        let projects = await apiTest1.listProjects();
        projects.length.should.gte(1);
    });

    it('get repository issue list', async function(){
        this.timeout(5000);

        let issue: any = await apiTest1.getRepoIssueList();

        issue.length.should.gte(1);
        // console.log(issue);
    });

    it('get repository issue by id', async function(){
        this.timeout(5000);
        let issue: any = await apiTest1.getIssue(1);
        // console.log(issue);
    })

    it('list cards on project', async function(){
        this.timeout(5000);

        let cards = await apiTest1.listProjectCards(projectId);
        cards.length.should.gte(1);
    });

    it('list columns on project', async function(){
        this.timeout(5000);

        let columns = await apiTest1.listProjectColumns(projectId);
        columns.length.should.gte(1);
    });

    it('comment to issue', async function(){
        this.timeout(5000);

        let issue: any = await apiTest1.getRepoIssueList();
    });

    it('update issue', async function(){
        this.timeout(5000);
        const issueNumber:number = 3;

        let issue: any = await apiTest1.getIssue(issueNumber);
        await apiTest1.editIssue(issueNumber, {
            title: DueStamp.modify(issue.title, '2020.3.25')
        });
    });

    it('remove issue due', async function(){
        this.timeout(5000);
        const issueNumber:number = 3;

        let issue: any = await apiTest1.getIssue(issueNumber);
        await apiTest1.editIssue(issueNumber, {
            title: DueStamp.remove(issue.title)
        });
    });

    it('increment issue due', async function(){
        this.timeout(5000);
        const issueNumber:number = 2;

        let issue: any = await apiTest1.getIssue(issueNumber);
        await apiTest1.editIssue(issueNumber, {
            title: DueStamp.calculate(issue.title, 10, 'day')
        });
    });
});
