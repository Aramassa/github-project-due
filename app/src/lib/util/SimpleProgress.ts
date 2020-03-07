import {DueProgress} from "./DueProgress";
const ProgressBar = require('progress');

export default class SimpleProgress extends DueProgress<ProgressBar>{

    protected createInstance(total: number): ProgressBar {
        return new ProgressBar(':current/:total :bar',{
            complete: this._complete,
            incomplete: this._incomplete,
            width: this._width,
            total: total
        });
    }

    public tick(num: number = 1): void {
        this.progress.tick(num);
    }

    get complete(): boolean {
        return this.progress.complete;
    }
}