import { WikiModel } from "./wiki.model";

export class WikiViewModel {
    public name: string = " ";
    public content: string = " ";
    public resourse: string = " ";

    constructor(data: WikiModel) {
        this.name = data.title;
        this.content = data.snippet;
        this.resourse = "Wikipedia"
    }
}