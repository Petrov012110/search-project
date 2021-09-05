import { OnInit } from "@angular/core";
import { ICheckboxes, INodes } from "src/environments/interface";
import { CheckboxModel } from "./checkbox.model";

export class FilterViewModel {
    /**чекбоксы
     * еще что-то
     */
    // public checkboxObject!: ICheckboxes;

    nodes: INodes[] = [
        {
            name: 'Wikipedia',
            checked: false,
        },
        {
            name: 'GitHub',
            checked: false,
            children: [
                {
                    name: 'Repositories',
                    checked: false 
                },
                {
                    name: 'Users',
                    checked: false 
                },
            ]
        },
        {
            name: 'Twitch',
            checked: false,
            children: [
                {
                    name: 'Chanels',
                    checked: false 
                },
                {
                    name: 'Category',
                    checked: false 
                },
            ]
        }
    ];


    public checkboxObject = this.nodes.map(arr => {
        return new CheckboxModel(arr)
    })

    // public checkboxObject = [
        
    //     new CheckboxModel(0, `Wiki`),
    //     new CheckboxModel(1, `Git`, `Repositories`, `Users`, true),
    //     new CheckboxModel(2, `Twitch`, `Chanels`, `Category`)
    // ];

    constructor() {

    }



}