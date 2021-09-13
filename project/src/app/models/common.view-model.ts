import { ICommonViewModel } from 'src/environments/interface';

export abstract class CommonViewModel implements ICommonViewModel {

    public name!: string;
    public content!: string;
    public abstract resourse: string;

    constructor() {

    }
}