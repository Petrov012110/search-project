import { IWikiData } from "src/environments/interface";
import { WikiResponseModel } from "./wiki.response-model";

export class WikiModel {
    public snippet!: string;
    public title!: string;

    constructor(data: IWikiData) {
        this.snippet = data.snippet;
        this.title = data.title;
    }
}