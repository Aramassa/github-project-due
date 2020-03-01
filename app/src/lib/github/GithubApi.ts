const GitHub = require("github-api");


interface Project{
    listProjectColumns(): Promise<any>;
    listProjectCards(): Promise<any>;
}

export class GithubApi{

    private client:any;

    private user:string;
    private repo:string;

    constructor(user:string, repo:string) {
        this.user = user;
        this.repo = repo;
        this.client = new GitHub({
            token: "bcbd2dd0581473fc02d8341f99db90b831e6eeb1"
        });
    }

    private async getProject(projectId:string): Promise<Project>{
        return await this.client.getProject(projectId);
    }

    private async getIssue(){
        return await this.client.getIssues(this.user, this.repo)
    }

    public async getRepoIssueList(option:any={}): Promise<any[]>{
        return (await(await this.getIssue()).listIssues(option)).data;
    }

    public async listProjectCards(projectId: string): Promise<any[]>{
        let proj = await this.getProject(projectId);
        return await proj.listProjectCards()
    }

    public async listProjectColumns(projectId: string): Promise<any[]>{
        let proj = await this.getProject(projectId);
        return (await proj.listProjectColumns()).data;
    }
}

export class GithubAuth{
    private token:string;

}