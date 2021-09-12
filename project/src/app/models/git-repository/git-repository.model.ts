import { IGitRepositoryData } from "../../../environments/interface";
import { ParentResourseModel } from "../parent-resourse.model";

export class GitRepositoryModel extends ParentResourseModel {
    public htmlUrl!: string;
    public id!: number;

    constructor(data: IGitRepositoryData) {
        super();
        if (data) {
            this.htmlUrl = data.html_url;
            this.id = data.id;
            this.name = data.name;
        }
    }
}