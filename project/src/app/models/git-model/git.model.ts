import { IGitData } from "src/environments/interface";
import { GitResponseModel } from "./git.response-model";


export class GitModel {
    public html_url!: string;
    public id!: number;
    public name!: string;

    constructor(data: IGitData) {
        if (data) {
            this.html_url = data.html_url;
            this.id = data.id;
            this.name = data.name;
        }
    }
}