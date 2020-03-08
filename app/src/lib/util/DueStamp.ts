export class DueStamp{
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
}