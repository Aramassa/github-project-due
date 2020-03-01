import {GithubApi} from "./github/GithubApi";
import {Project} from "./due/Project";

export class ProjectDue {

    private user:string;
    private client:GithubApi

    private projects:Project[];

    constructor(user: string, repo: string) {
        this.client = new GithubApi(user, repo);
        // this.user = user;
    }

    public async listProjects(): Promise<Project[]>{
        let res:Project[] = new Array();
        let projects = await this.client.listProjects();
        for(let project of projects){
            res.push(new Project(project.id, project.name, project.body));
        }

        return res;
    }
}

