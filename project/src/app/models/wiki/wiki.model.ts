import { IWikiData } from '../../../environments/interface';

export class WikiModel {
    public snippet!: string;
    public title!: string;

    constructor(data: IWikiData) {
        if (data) {
            this.snippet = this.creteText(data.snippet);
            this.title = data.title;
        }
    }

    public creteText(value: string): string {
        const div = document.createElement('div');
        div.innerHTML = value;
        return div.innerText;
    }
}