import { OnInit } from "@angular/core";
import { ICheckboxes } from "src/environments/interface";
import { CheckboxItem } from "../resourses/checkboxItem";

export class FilterViewModel {
    /**чекбоксы
     * еще что-то
     */
    // public checkboxObject!: ICheckboxes;
    public checkboxObject = [
        new CheckboxItem(0, `Wiki`),
        new CheckboxItem(1, `Git`),
        new CheckboxItem(2, `Twitch`)
    ];



    constructor() {

    }

}