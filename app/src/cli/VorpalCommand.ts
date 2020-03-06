import {ProjectDue} from "../lib/ProjectDue";
import {Project} from "../lib/due/Project";
import {Task} from "../lib/due/Task";
import {VorpalUtil as util} from "./VorpalUtil";

const userName:string = "Aramassa";
const repoName:string = "github-project-due-test";

const due:ProjectDue = new ProjectDue(userName, repoName);

export class VorpalCommand{

    private static currentProjectId:string;

    public static async cmdRepoInfo(args: any = null, callback: any = ()=>{}){
        console.log(util.info(`user: ${userName}\nrepo: ${repoName}`));
        callback();
    }

    public static async cmdListProject(args: any = null, callback: any = ()=>{}){
        let projects:any = await due.listProjects();
        for(let proj of projects){
            console.log(util.info(proj.debug_line));
        }
        callback();
    }

    public static async cmdSetCurrentProject(args: any = null, callback: any = ()=>{}){
        this.currentProjectId = args['id'];
        console.log(util.success(`project id set to ${this.currentProjectId}`));
        callback();
    }

    public static async cmdListIssues(args: any = null, callback: any = ()=>{}): Promise<Project> {
        let proj:Project = await due.getProject(this.currentProjectId);
        let tasks:Task[] = await due.getProjectTasks(proj);

        for(let task of tasks){
            console.log(`${task.debug_line}`)
        }

        callback();
        return proj;
    }

}