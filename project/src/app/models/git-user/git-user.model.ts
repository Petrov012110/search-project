import { IGitUserData } from "../../../environments/interface";
import { ParentResourseModel } from "../parent-resourse.model";

export class GitUserModel extends ParentResourseModel {

    public login!: string;
    public avatarUrl!: string;
    public url!: string;


    constructor(data: IGitUserData) {
        super();
        if (data) {
            this.url = data.url;
            this.login = data.login;
            this.avatarUrl = data.avatar_url;
        }
    }
}