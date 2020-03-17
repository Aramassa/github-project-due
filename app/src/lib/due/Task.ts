import {DueProgress} from "../util/DueProgress";
import {DueStamp} from "../util/DueStamp";

const path = require("path");
import {GithubApi} from "../github/GithubApi";

export class Task{
    get title(): string {
        return DueStamp.remove(this._title);
    }

    get due(): string{
        return DueStamp.extract(this._title);
    }

    get due4disp(): string{
        return DueStamp.extract(this._title, true);
    }

    get state(): String{
        return this._state;
    }

    get labels(): string[]{
        if(this._labels.length == 0) return ['-'];
        return this._labels;
    }

    get milestone(): string{
        return this._milestone;
    }

    private _id: string = "";
    private _title: string = "";
    private _state: string = "";
    private _labels: Array<string> = [];
    private _milestone: string = "";
    private github_id: string = "";
    private body: string = "";
    private _proxy: any;

    constructor(issueId: string, proxy: any = null) {
        this._id = issueId;
        this._proxy = proxy;
    }

    public static async loadParallel(tasks: Task[], progressBar: DueProgress<any>){

        let tmp:any[] = []
        progressBar.total = tasks.length;
        let chunk_size:number = Math.min(6, (tasks.length / 3))
        for(let task of tasks){
            tmp.push(task.loadProxy(progressBar));
            if(tmp.length >= chunk_size){
                await Promise.all(tmp);
                tmp = []
            }
        }
        await Promise.all(tmp);
    }

    private async loadProxy(progressBar: DueProgress<any> = null){
        if(!this._proxy){
            if(progressBar) progressBar.tick(1);
            return;
        }

        let proxy = this._proxy;
        this._proxy = null;
        await proxy();
        if(progressBar) progressBar.tick(1);
    }

    public async reload(client: GithubApi){
        let data:any = await client.getIssue(Number(this._id));
        this.dataWithApiResponse(data);
    }

    public static proxy(client: GithubApi, content_url:string): Task{
        if(!content_url) return null;
        if(!content_url.includes("/issues/")) return null;
        let issueId:string = path.basename(content_url);

        let task:Task;
        task = new Task(issueId, async ()=>{
            let data = await Task.loadData(client, issueId);
            if(data){
                await task.dataWithApiResponse(data);
            }
        });

        return task;
    }

    public static async loadData(client: GithubApi, issueId:string): Promise<any>{
        let data:any = await client.getIssue(Number(issueId));

        return data;
    }

    /**
     * @param client
     * @param content_url
     */
    public static async loadFromUrl(client: GithubApi, content_url:string): Promise<Task>{
        if(!content_url) return null;
        if(!content_url.includes("/issues/")) return null;
        let issueId:string = path.basename(content_url);

        let data = await Task.loadData(client, issueId);

        let task = new Task(issueId);
        task.dataWithApiResponse(data);

        return task;
    }

    public async simple_string(format:string = "S1"): Promise<string>{
        await this.loadProxy();
        switch(format){
            case "S1":
                return `${this._id.padStart(5, ' ')}) ${this.title} [${this.labels.join(",")}]`;
                break;
            case "S2":
                return `${this._id.padStart(5, ' ')}) ${this.title} ${this.state}: ${this.milestone}[${this.labels.join(",")}]`;
                break;
            case "S9":
            default:
                return `${this._title}: ${this._id}) ${this.state}: ${this.milestone}[${this.labels.join(",")}]`;
        }
        
    }

    public async detail_string(): Promise<string>{
        await this.loadProxy();
        return `${this._title}: ${this._id}) ${this.state}: ${this.milestone}[${this.labels.join(",")}]\n${this.body}`;
    }

    public get id(): string{
        return this._id;
    }

    private async dataWithApiResponse(data: any) {
        await this.loadProxy();
        this.github_id = data._id;
        this._title = data.title;
        this.body = data.body;
        this._state = data.state;
        this._labels = data.labels.map((label:any) => { return label.name} );
        if(data.milestone){
            this._milestone = data.milestone.title;
        }
    }
}
