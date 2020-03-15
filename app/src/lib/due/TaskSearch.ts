import { Project } from "./Project";
import { ProjectDue } from "../ProjectDue";
import { Task } from "./Task";
import { DueStamp } from "../util/DueStamp";

const dayjs = require('dayjs');

export class TaskSearch{

  private _due: ProjectDue;
  private _proj: Project;

  private _srchDue:String[] = [];
  private _srchState:String[] = [];
  private _srchLabels:String[] = [];

  constructor(due: ProjectDue, proj: Project){
    this._due  = due;
    this._proj = proj;
    this.openState();
  }

  private openState(){
    this._srchState = ['open'];
  }

  public allState(flg:boolean):void{
    if(flg) this._srchState = [];
    else this.openState();
  }

  public byLabels(labels: String[]): TaskSearch{
    this._srchLabels = labels;

    return this;
  }

  public byDue(due: String[] | String): TaskSearch{
    if(due instanceof String) due = [due];
    this._srchDue = due;

    return this;
  }

  public inDaysFor(days: number, fromDay: String=null): TaskSearch{
    let srch: String[]
    if(fromDay){
      srch = [fromDay];
    } else {
      srch = [DueStamp.format(dayjs())];
    }
    
    for(let i=1; i<=days; i++){
      srch.push(DueStamp.format(dayjs(fromDay).add(i, 'day')));
    }
    this.byDue(srch);
    return this;
  }

  public async doSerach(): Promise<Task[]>{
    await this._due.getProjectTasks(this._proj);
    let tasks:Task[] = await this._due.loadTaskParallel(this._proj);

    if(this._srchDue.length>0){
      tasks = tasks.filter((task)=>{
        return this._srchDue.includes(task.due);
      });
    }

    if(this._srchState.length>0){
      tasks = tasks.filter((task)=>{
        return this._srchState.includes(task.state);
      });
    }

    if(this._srchLabels.length>0){
      tasks = tasks.filter((task)=>{
        return (this._srchLabels.filter(label => task.labels.includes(label))).length >= 1;
      });
    }
    
    return tasks;
  }
}
