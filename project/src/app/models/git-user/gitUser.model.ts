import { IGitUserData } from "../../../environments/interface";

export class GitUserModel {
    login!: string;
    avatar_url!: string;
    url!: string;
  

    constructor(data: IGitUserData) {
        if (data) {
            this.url = data.url;
            this.login = data.login;
            this.avatar_url = data.avatar_url;
        }
    }
}