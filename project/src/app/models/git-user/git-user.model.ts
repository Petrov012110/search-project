import { IGitUserData } from "../../../environments/interface";
import { ParentModel } from "../parent.model";

export class GitUserModel extends ParentModel {

    login!: string;
    avatar_url!: string;
    url!: string;


    constructor(data: IGitUserData) {
        super();
        if (data) {
            this.url = data.url;
            this.login = data.login;
            this.avatar_url = data.avatar_url;
        }
    }
}