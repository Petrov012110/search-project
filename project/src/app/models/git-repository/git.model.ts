import { IGitRepositoryData } from "../../../environments/interface";

export class GitRepositoryModel {
    public html_url!: string;
    public id!: number;
    public name!: string;

    constructor(data: IGitRepositoryData) {
        if (data) {
            this.html_url = data.html_url;
            this.id = data.id;
            this.name = data.name;
        }
    }
}