import GithubApi from "@Aramassa/github-project-client";
import {Task} from "./Task";
import {DueProgress} from "../util/DueProgress";
import BlankProgress from "../util/BlankProgress";

export class Project{

    private id: string;
    private name: string;
    private body: string;

    private _tasks:Task[] = [];

    /**
     *
     * @param id
     * @param name
     * @param body
     *
     * Example of library response
     * {
        owner_url: 'https://api.github.com/repos/Aramassa/github-project-due-test',
        url: 'https://api.github.com/projects/4038195',
        html_url: 'https://github.com/Aramassa/github-project-due-test/projects/1',
        columns_url: 'https://api.github.com/projects/4038195/columns',
        id: 4038195,
        node_id: 'MDc6UHJvamVjdDQwMzgxOTU=',
        name: 'Test Project 001',
        body: 'must not be deleted!!\r\n\r\nthis project used for test.',
        number: 1,
        state: 'open',
        creator: {
          login: 'Aramassa',
          id: 52207597,
          node_id: 'MDQ6VXNlcjUyMjA3NTk3',
          avatar_url: 'https://avatars2.githubusercontent.com/u/52207597?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/Aramassa',
          html_url: 'https://github.com/Aramassa',
          followers_url: 'https://api.github.com/users/Aramassa/followers',
          following_url: 'https://api.github.com/users/Aramassa/following{/other_user}',
          gists_url: 'https://api.github.com/users/Aramassa/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/Aramassa/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/Aramassa/subscriptions',
          organizations_url: 'https://api.github.com/users/Aramassa/orgs',
          repos_url: 'https://api.github.com/users/Aramassa/repos',
          events_url: 'https://api.github.com/users/Aramassa/events{/privacy}',
          received_events_url: 'https://api.github.com/users/Aramassa/received_events',
          type: 'User',
          site_admin: false
        },
        created_at: '2020-03-01T04:52:23Z',
        updated_at: '2020-03-01T04:52:54Z'
      },
     */
    constructor(id:string, name:string =null, body:string =null) {
        this.id = id;
        this.name = name;
        this.body = body;
    }

    public get debug_line():string{
        return `<${this.id}> ${this.name}`;
    }

    public get tasks(): Task[]{
        return this._tasks;
    }

    public async load(client:GithubApi){
        let proj:any = await client.getProject(this.id);
        this.name = proj.name;
        this.body = proj.body;
    }

    public async loadTasks(client:GithubApi){
        let cards:any = await client.listProjectCards(this.id);
        let tasks:Task[] = [];
        for(let card of cards){
            let task = Task.proxy(client, card.content_url);

            if(!task) continue;
            tasks.push(task);
        }
        this._tasks = tasks;
    }
}
