import { IGitRepositoryData } from "../../../environments/interface";


export class GitRepositoryModel {
    public htmlUrl!: string;
    public id!: number;
    public name!: string;

    constructor(data: IGitRepositoryData) {

        if (data) {
            this.htmlUrl = data.html_url;
            this.id = data.id;
            this.name = data.full_name;
        }
    }
}