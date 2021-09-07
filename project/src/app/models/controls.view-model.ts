import { FormGroup } from "@angular/forms";

export class ControlsViewModel {
 
        public wikiControl!: boolean;
        public twitchControl!: boolean;
        public chanelsControl!: boolean;
        public categoriesControl!: boolean;
        public gitControl!: boolean;
        public usersControl!: boolean;
        public repositoriesControl!: boolean;
    
    constructor(data: FormGroup) {
        if(data) {
            this.wikiControl = data.controls['wikiControl'].value,
            this.twitchControl = data.controls['twitchControl'].value,
            this.chanelsControl = data.controls['twitchChanelControl'].value,
            this.categoriesControl = data.controls['twitchCategoryControl'].value,
            this.gitControl = data.controls['gitControl'].value,
            this.usersControl = data.controls['gitUserControl'].value,
            this.repositoriesControl = data.controls['gitRepositoryControl'].value
        }
    }
}