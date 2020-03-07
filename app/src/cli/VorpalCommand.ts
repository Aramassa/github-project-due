import {ProjectDue} from "../lib/ProjectDue";
import {Project} from "../lib/due/Project";
import {Task} from "../lib/due/Task";
import {VorpalUtil as util} from "./VorpalUtil";

const userName:string = "Aramassa";
const repoName:string = "github-project-due-test";

const due:ProjectDue = new ProjectDue(userName, repoName);
due.progress = true;

export class VorpalCommand{

    private static currentProject: Project;
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
        VorpalCommand.currentProjectId = args['id'];

        console.log(util.success(`project id set to ${VorpalCommand.currentProjectId}`));

        VorpalCommand.currentProject = await due.getProject(VorpalCommand.currentProjectId);
        callback();
    }

    public static async cmdListIssues(args: any = null, callback: any = ()=>{}) {
        let tasks:Task[] = await due.getProjectTasks(VorpalCommand.currentProject);

        for(let task of tasks){
            console.log(`${task.debug_line}`)
        }

        callback();
    }

}