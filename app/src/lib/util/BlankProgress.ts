import {DueProgress} from "./DueProgress";

export default class BlankProgress extends DueProgress<Object>{

    protected createInstance(total: number): Object {
        return undefined;
    }

    tick(num: number): void {
    }

    get complete(): boolean {
        return true;
    }
}