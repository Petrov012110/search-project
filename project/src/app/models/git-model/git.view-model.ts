import { GitModel } from "./git.model";


export class GitViewModel {
    public name: string = " ";
    public content: string = " ";
    public resourse: string = " ";

    constructor(data: GitModel) {
        if(data) {
            this.name = data.name
            this.content = data.html_url
            this.resourse = "Git"
        }
    }
}