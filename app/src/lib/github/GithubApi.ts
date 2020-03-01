const GitHub = require("github-api");

interface Repository{
    listProjects(): Promise<any>;
}

interface Project{
    listProjectColumns(): Promise<any>;
    listProjectCards(): Promise<any>;
}

interface Issue{
    listIssues(options:any): Promise<any>;
}

export class GithubApi{

    private client:any;

    private user:string;
    private repo:string;

    constructor(user:string, repo:string) {
        this.user = user;
        this.repo = repo;
        this.client = new GitHub({
            token: process.env['GITHUB_TOKEN'] || ""
        });
    }

    private async getProject(projectId:string): Promise<Project>{
        return await this.client.getProject(projectId);
    }

    private async getIssue(): Promise<Issue>{
        return await this.client.getIssues(this.user, this.repo)
    }

    private async getRepo(): Promise<Repository>{
        return await this.client.getRepo(this.user, this.repo);
    }

    public async listProjects(){
        let repo = await this.getRepo();
        return (await repo.listProjects()).data;
    }

    public async getRepoIssueList(options:any={}): Promise<any[]>{
        return (await(await this.getIssue()).listIssues(options)).data;
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