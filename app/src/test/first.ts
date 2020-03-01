import { should } from 'chai';
should()

import {GithubApi} from "../lib/github/GithubApi"

const projectId:string = "3282210";
const apiTest1:GithubApi = new GithubApi("Aramassa", "elastic_mini_query");

describe("GithubApi", function() {

    it('get repository issue list', async function () {
        this.timeout(5000);

        let issue: any = await apiTest1.getRepoIssueList();

        issue.length.should.gte(1);
    });

    it('list cards on project', async() =>{
        this.timeout(5000);

        let cards = await apiTest1.listProjectCards(projectId);
        cards.length.should.gte(1);
    })

    it('list columns on project', async () => {
        this.timeout(5000);

        let columns = await apiTest1.listProjectColumns(projectId);
        columns.length.should.gte(1);
    });

});