export abstract class DueProgress<T> {

    protected _complete: string = '>';
    protected _incomplete: string = '.';
    protected _width: number = 40;
    protected _total: number;

    protected progress: T;


    constructor(total: number) {
        this._total = total;
        this.progress = this.createInstance(total);
    }

    public set total(total:number){
        this.progress = this.createInstance(total);
    }

    protected abstract createInstance(total: number): T;

    public abstract tick(num: number): void;

    public abstract get complete(): boolean;
}

