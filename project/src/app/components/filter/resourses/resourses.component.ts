import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ManagerService } from 'src/app/services/manager.service';
import { INodes } from 'src/environments/interface';
import { CheckboxModel } from '../models/checkbox.model';

@Component({
    selector: 'app-resourses',
    templateUrl: './resourses.component.html',
    styleUrls: ['./style/resourses.component.scss']
})
export class ResoursesComponent implements OnInit {

    public form!: FormGroup;

    public nodes: INodes[] = [
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

    constructor(private _managerService: ManagerService) {
        this._createForm();
    }

    public ngOnInit() {

        this.form.valueChanges
            .pipe(
                debounceTime(50)
            )
            .subscribe(el => this._managerService.onCheckboxEvent.next(this.form))

        this.form.get('gitControl')?.valueChanges.subscribe(selectedValue => {

            if (selectedValue) {
                this.form.get("gitRepositoryControl")?.setValue(true);
                this.form.get("gitUserControl")?.setValue(true);
            } else {
                this.form.get("gitRepositoryControl")?.setValue(false);
                this.form.get("gitUserControl")?.setValue(false);
            }

        });

        this.form.get('twitchControl')?.valueChanges.subscribe(selectedValue => {

            if (selectedValue) {
                this.form.get("twitchCategoryControl")?.setValue(true);
                this.form.get("twitchChanelControl")?.setValue(true);
            } else {
                this.form.get("twitchCategoryControl")?.setValue(false);
                this.form.get("twitchChanelControl")?.setValue(false);
            }

        });
    }

    private _createForm(): void {
        this.form = new FormGroup({
            "gitControl": new FormControl(),
            "gitRepositoryControl": new FormControl(),
            "gitUserControl": new FormControl(),
            "twitchControl": new FormControl(),
            "twitchCategoryControl": new FormControl(),
            "twitchChanelControl": new FormControl(),
            "wikiControl": new FormControl(),
        });

    }




}
