import { IWikiData } from "../../../environments/interface";
import { ParentModel } from "../parent.model";

export class WikiModel extends ParentModel {
    public snippet!: string;
    public title!: string;

    constructor(data: IWikiData) {
        super();
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