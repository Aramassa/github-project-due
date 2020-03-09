const path = require("path");
import {GithubApi} from "../github/GithubApi";

export class Task{
    get title(): string {
        return this._title;
    }
    private _id: string;
    private _title: string;
    private state: string;
    private labels: Array<string>;
    private github_id: string;
    private body: string;

    public async reload(client: GithubApi){
        let data:any = await client.getIssue(Number(this._id));
        this.dataWithApiResponse(data);
    }

    /**
     * @param client
     * @param content_url
     */
    public static async loadFromUrl(client: GithubApi, content_url:string): Promise<Task>{
        if(!content_url) return null;
        if(!content_url.includes("/issues/")) return null;

        let issueId:string = path.basename(content_url);
        let data:any = await client.getIssue(Number(issueId));

        let task = new Task();
        task.dataWithApiResponse(data);

        return task;
    }

    public get simple_string():string{
        return `${this._id}) ${this._title} : ${this.state}`;
    }

    public get detail_string(): string{
        return `${this._id}) ${this._title} : ${this.state} [${this.labels.join(",")}]\n${this.body}`;
    }

    public get id(): string{
        return this._id;
    }

    private dataWithApiResponse(data: any) {
        this._id = data.number;
        this.github_id = data._id;
        this._title = data.title;
        this.body = data.body;
        this.state = data.state;
        this.labels = data.labels.map((label:any) => { return label.name} );
    }
}