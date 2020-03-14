const dayjs = require('dayjs');

export class DueStamp{

    /**
     * 
     * @param d dayjs
     */
    public static format(d: any): String{
        return d.format('YYYY.M.D');
    }

    public static modify(title: string, to: string): string{
        if(! title.match(/DUE:\([0-9\.]+\)/)){
            title += ` DUE:(${to})`;
        } else {
            title = title.replace(/ +$/, '').replace(/DUE:\([0-9\.]+\)/, `DUE:(${to})`);
        }

        return title;
    }

    public static remove(title: string){
        return title.replace(/DUE:\([0-9\.]+\)/, ``).replace(/ +$/, '');
    }

    static calculate(title: string, number: number, unit: string) {
        let res:string;
        let found = title.match(/DUE:\(([0-9\.]+)\)/);
        if(found){
            return this.modify(title, dayjs(found[1]).add(number, unit).format('YYYY.M.D'));
        } else {
            return this.modify(title, dayjs().add(number, unit).format('YYYY.M.D'));
        }
    }

    static extract(title: String){
        let found = title.match(/DUE:\(([0-9\.]+)\)/);
        if(!found) return null;

        return dayjs(found[1]).format('YYYY.M.D');
    }
}
