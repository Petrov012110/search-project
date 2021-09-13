import { IGitUserData } from "../../../environments/interface";

export class GitUserModel {

    public login!: string;
    public avatarUrl!: string;
    public url!: string;


    constructor(data: IGitUserData) {
        if (data) {
            this.url = data.url;
            this.login = data.login;
            this.avatarUrl = data.avatar_url;
        }
    }
}