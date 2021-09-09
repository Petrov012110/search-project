import { ControlsViewModel } from "./controls.view-model";

export class HistoryItemViewModel {
    public input!: string;
    public date!: number;
    public controls?: ControlsViewModel;

    constructor(input: string, controls?: ControlsViewModel) {

        if (input) {
            this.input = input;
            this.date = new Date().getTime();
            this.controls = controls
        }
        
    }
}