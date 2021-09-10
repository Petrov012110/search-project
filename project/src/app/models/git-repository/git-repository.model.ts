import { IGitRepositoryData } from "../../../environments/interface";
import { ParentModel } from "../parent.model";

export class GitRepositoryModel extends ParentModel {
    public html_url!: string;
    public id!: number;
    public name!: string;

    constructor(data: IGitRepositoryData) {
        super();
        if (data) {
            this.html_url = data.html_url;
            this.id = data.id;
            this.name = data.name;
        }
    }
}