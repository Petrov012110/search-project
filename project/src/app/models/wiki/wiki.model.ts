import { IWikiData } from "../../../environments/interface";
import { ParentResourseModel } from "../parent-resourse.model";

export class WikiModel extends ParentResourseModel {
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