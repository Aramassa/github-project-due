import {ProjectDue} from "../lib/ProjectDue";
import {GithubProject} from "../lib/github/GithubProject";
import {Project} from "../lib/due/Project";

const userName:string = "Aramassa";
const repoName:string = "github-project-due-test";

const due:ProjectDue = new ProjectDue(userName, repoName);

export class VorpalCommand{

    private static currentProjectId:string;

    public static async cmdRepoInfo(args: any = null, callback: any = ()=>{}){
        console.log(`user: ${userName}\nrepo: ${repoName}`);
        callback();
    }

    public static async cmdListProject(args: any = null, callback: any = ()=>{}){
        let projects:any = await due.listProjects();
        for(let proj of projects){
            console.log(proj.debug_line);
        }
        callback();
    }

    public static async cmdSetCurrentProject(args: any = null, callback: any = ()=>{}){
        this.currentProjectId = args['id'];
        console.log(`project id set to ${this.currentProjectId}`);
        callback();
    }

    public static async cmdListIssues(args: any = null, callback: any = ()=>{}): Promise<Project> {
        let proj:Project = await due.getProject(this.currentProjectId);
        await due.getProjectTasks(proj);

        callback();
        return proj;
    }

}