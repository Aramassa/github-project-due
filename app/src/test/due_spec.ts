import {ProjectDue} from "../lib/ProjectDue";
import {Project} from "../lib/due/Project";
import {Task} from "../lib/due/Task";

const userName:string = "Aramassa";
const repoName:string = "github-project-due-test";

const due:ProjectDue = new ProjectDue(userName, repoName);

let project:Project;

describe("Project Due", function() {

  before('load all task for project', async function(){
    this.timeout(10000);
    project = await due.getProject("4038195");
    await due.getProjectTasks(project);

    let tasks:Task[] = await due.loadTaskParallel(project);

    for(let task of tasks){
        console.log(`${await task.simple_string()}`)
    }
  });

  it('search tasks by due', async function(){
    this.timeout(15000);
    let tasks:Task[] = await due.getSearch(project).byDue('2020.3.12').doSerach();

    tasks.length.should.eq(2);
  });

  it('search tasks due in 3 days from 2020.3.12', async function(){
    this.timeout(15000);
    let tasks:Task[] = await due.getSearch(project).inDaysFor(3, '2020.3.12').doSerach();
    
    for(let task of tasks){
      console.log(`- ${await task.simple_string()}`)
    }

    tasks.length.should.eq(3);
  });
});
