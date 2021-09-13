import { CommonViewModel } from '../common.view-model';
import { WikiModel } from './wiki.model';

export class WikiViewModel extends CommonViewModel {

    public resourse = 'Wikipedia';


    constructor(model: WikiModel) {
        super();
        this.name = model.title;
        this.content = model.snippet;
    }

}