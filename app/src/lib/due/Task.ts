const path = require("path");
import {GithubApi} from "../github/GithubApi";

export class Task{
    private id: string;
    private title: string;
    private state: string;
    private labels: Array<string>;
    private github_id: string;

    /**
     * @param client
     * @param content_url
     */
    public static async loadFromUrl(client: GithubApi, content_url:string): Promise<Task>{
        if(!content_url.includes("/issues/")) return null;

        let issueId:string = path.basename(content_url);
        let data:any = await client.getIssue(Number(issueId));

        let task = new Task();
        task.dataWithApiResponse(data);

        return task;
    }

    public get debug_line():string{
        return `${this.id}) ${this.title} : ${this.state}`;
    }

    private dataWithApiResponse(data: any) {
        this.id = data.number;
        this.github_id = data.id;
        this.title = data.title;
        this.state = data.state;
        this.labels = data.labels;
    }
}