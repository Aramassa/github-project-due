import {ProjectDue} from "../lib/ProjectDue";
import {Project} from "../lib/due/Project";
import {Task} from "../lib/due/Task";
import {VorpalUtil as util} from "./VorpalUtil";
import {DueStamp} from "../lib/util/DueStamp";
import { TaskSearch } from "../lib/due/TaskSearch";

const userName:string = "Aramassa";
const repoName:string = "github-project-due-test";

const due:ProjectDue = new ProjectDue(userName, repoName);
due.progress = true;

export class VorpalCommand{

    private static currentProject: Project;
    private static currentProjectId:string;
    private static currentTaskNumber: number;

    public static async cmdRepoInfo(args: any = {}, callback: any = ()=>{}){
        console.log(util.info(`user: ${userName}\nrepo: ${repoName}`));
        callback();
    }

    public static async cmdListProject(args: any = {}, callback: any = ()=>{}){
        let projects:any = await due.listProjects();
        for(let proj of projects){
            console.log(util.info(proj.debug_line));
        }
        callback();
    }

    public static async cmdSetCurrentProject(args: any = {}, callback: any = ()=>{}){
        VorpalCommand.currentProjectId = args['id'];

        console.log(util.success(`project id set to ${VorpalCommand.currentProjectId}`));

        VorpalCommand.currentProject = await due.getProject(VorpalCommand.currentProjectId);
        await VorpalCommand.cmdLoadTasks({}, callback);
    }

    public static async cmdLoadTasks(args: any = {}, callback: any = ()=>{}) {
        await due.getProjectTasks(VorpalCommand.currentProject);
        callback();
    }

    public static async cmdListTasks(args: any = {}, callback: any = ()=>{}) {
        let tasks:Task[] = await due.loadTaskParallel(VorpalCommand.currentProject)

        for(let task of tasks){
            console.log(`${await task.simple_string()}`)
        }

        callback();
    }

    static async cmdShowTaskDetail(args: any = {}, callback: any = ()=>{}) {
        let number = args.number || VorpalCommand.currentTaskNumber || 0;
        let task:Task = VorpalCommand.currentProject.tasks.find((task: Task) => task.id == number)
        if(task){
            console.log(await task.detail_string());
        } else {
            util.error(`task not selected.`)
        }

        callback();
    }

    static async cmdSetCurrentTask(args: any = {}, callback: any = ()=>{}) {
        let task:Task = VorpalCommand.currentProject.tasks.find((task: Task) => task.id == args.number)
        if(task){
            VorpalCommand.currentTaskNumber = args.number;
            console.log(`${await task.simple_string()}`)
        } else {
            util.error("selected number does not found.");
        }
    }

    static async cmdSnoozeTaskDue(args: any = {}, callback: any = ()=>{}) {
        let number = args.number || VorpalCommand.currentTaskNumber;
        if(number){
            let task:Task = VorpalCommand.currentProject.tasks.find((task: Task) => task.id == number)
            await due.snooze(task, Number(args.num) || 1, args.unit || 'day');
            await due.reloadTask(task);
        } else {
            util.error(`task not selected.`)
        }

        callback();
    }

    static async cmdAdvanceTaskDue(args: any = {}, callback: any = ()=>{}) {
        let number = args.number || VorpalCommand.currentTaskNumber;
        if(number){
            let task:Task = VorpalCommand.currentProject.tasks.find((task: Task) => task.id == number)
            await due.snooze(task, (Number(args.num) || 1)*-1, args.unit || 'day');
            await due.reloadTask(task);
        } else {
            util.error(`task not selected.`)
        }

        callback();
    }

    static async cmdSearchByDue(args: any = {}, callback: any = ()=>{}) {
        let arg_due :string = args["due"];
        let range :number = Number((args["options"] && args["options"]["range"]) || 0) ;
        let label :string = (args["options"] && args["options"]["labels"]) || null;
        let search:TaskSearch = due.getSearch(VorpalCommand.currentProject).byDue(DueStamp.dateRange(arg_due, range));
        if(label){
            search.byLabels(label.split(","));
        }
        if((args["options"] && args["options"]["all"])){
            search.allState();
        }
        let tasks:Task[] = await search.doSerach()
        

        if(args["options"] && args["options"]["date"]){
            let tmp:any = {};
            let tmp_sort :any = {};
            for(let task of tasks){
                if(!tmp[task.due]) tmp[task.due] = [];
                tmp[task.due].push(task);
            }

            Object.keys(tmp).sort().forEach(function(key) {
                tmp_sort[key] = tmp[key];
            });

            for(let d1 in tmp_sort){
                console.log(`-- ${d1}`);
                for(let t of tmp_sort[d1]){
                    console.log(`  ${await t.simple_string()}`)
                }
                console.log('');
            }
        } else {
            for(let task of tasks){
                console.log(`${await task.simple_string()}`)
            }
        }
        callback();
    }
}
