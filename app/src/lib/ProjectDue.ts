import GithubApi from "github-project-client";
import {Project} from "./due/Project";
import BlankProgress from "./util/BlankProgress";
import SimpleProgress from "./util/SimpleProgress";
import {DueProgress} from "./util/DueProgress";
import {Task} from "./due/Task";
import {DueStamp} from "./util/DueStamp";
import { TaskSearch } from "./due/TaskSearch";

export class ProjectDue {

    private client:GithubApi
    private showProgress:boolean = false;

    constructor(user: string, repo: string) {
        this.client = new GithubApi(user, repo);
        // this.user = user;
    }

    public set progress(flg: boolean){
        this.showProgress = flg;
    }

    private get progressBar(): DueProgress<any>{
        if(this.showProgress){
            return new SimpleProgress(0);
        } else {
            return new BlankProgress(0);
        }
    }

    public async listProjects(): Promise<Project[]>{
        let res:Project[] = new Array();
        let projects = await this.client.listProjects();
        for(let project of projects){
            res.push(new Project(project.id, project.name, project.body));
        }

        return res;
    }

    public async getProject(projectId: string) : Promise<any>{
        let proj:Project = new Project(projectId);
        await proj.load(this.client);

        return proj;
    }

    public async getProjectTasks(proj: Project) {
        await proj.loadTasks(this.client);

        return proj.tasks;
    }

    public async snooze(task: Task, num: number, unit: string) {
        await this.client.editIssue(Number(task.id), {
            title: DueStamp.calculate(task.title, num, unit)
        });
    }

    async reloadTask(task: Task) {
        await task.reload(this.client);
    }


    public async loadTaskParallel(proj: Project): Promise<Task[]>{
        await Task.loadParallel(proj.tasks, this.progressBar);
        return proj.tasks;
    }

    public getSearch(proj: Project): TaskSearch{
        return new TaskSearch(this, proj);
    }
}

