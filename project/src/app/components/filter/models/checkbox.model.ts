import { INodes } from "src/environments/interface";

export class CheckboxModel {

    label!: string;
    checked!: boolean;
    checked1?: boolean;
    checked2?: boolean;
    sublabel1?: string | undefined;
    sublabel2?: string | undefined;

    constructor(data: INodes) {
        if (data) {
            this.label = data.name;
            this.checked = data.checked ? data.checked : false;

            if(data.children !== undefined) {
                this.sublabel1 = data.children[0].name;
                this.sublabel2 = data.children[1].name;
                this.checked1 = data.children[0].checked ? data.children[0].checked : false;
                this.checked2 = data.children[1].checked ? data.children[0].checked : false;
                if(data.children[0].checked || data.children[1].checked) {
                    
                }

            }
        }
    }


    // constructor(value: any, label: any, subvalue1?: string, subvalue2?: string, checked?: boolean) {
    //  this.value = value;
    //  this.label = label;
    //  this.checked = checked ? checked : false;
    //  this.subvalue1 = subvalue1
    //  this.subvalue2 = subvalue2
    // }
}