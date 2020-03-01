import { should } from 'chai';
should()

import {GithubApi} from "../lib/github/GithubApi"

const projectId:string = "3282210";
const apiTest1:GithubApi = new GithubApi("Aramassa", "github-project-due-test");

describe("GithubApi", function() {

    it('list projects on repo', async ()=>{
        this.timeout(5000);
        let projects = await apiTest1.listProjects();
        projects.length.should.gte(1);

        console.log(projects);

    });

    it('get repository issue list', async ()=>{
        this.timeout(5000);

        let issue: any = await apiTest1.getRepoIssueList();

        issue.length.should.gte(1);
    });

    it('list cards on project', async ()=>{
        this.timeout(5000);

        let cards = await apiTest1.listProjectCards(projectId);
        cards.length.should.gte(1);
    })

    it('list columns on project', async () => {
        this.timeout(5000);

        let columns = await apiTest1.listProjectColumns(projectId);
        columns.length.should.gte(1);
    });

    it('comment to issue', async()=>{
        this.timeout();

        let issue: any = await apiTest1.getRepoIssueList();
    })

});