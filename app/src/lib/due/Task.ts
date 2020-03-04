const path = require("path");
import {GithubApi} from "../github/GithubApi";

export class Task{
    private title: string;
    private state: string;
    private labels: Array<string>;

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

    private dataWithApiResponse(data: any) {
        this.title = data.title;
        this.state = data.state;
        this.labels = data.labels;
    }
}