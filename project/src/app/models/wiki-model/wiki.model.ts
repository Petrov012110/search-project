import { IWikiData } from "src/environments/interface";
import { WikiResponseModel } from "./wiki.response-model";

export class WikiModel {
    public snippet!: string;
    public title!: string;

    constructor(data: IWikiData) {
        if(data) {
            this.snippet = this.creteText(data.snippet) ;
            this.title = data.title;
        }
    }

    public creteText(value: string): string {
        let div = document.createElement("div")
        div.innerHTML = value
        return div.innerText
    }
}