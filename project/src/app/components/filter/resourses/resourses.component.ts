import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

    constructor(private formBuilder: FormBuilder) {
        this._createForm();
    }

    public ngOnInit() {
        this.form.controls["resourseControl"]?.valueChanges.subscribe(selectedValue => {
            if (selectedValue === true) {
                this.form.get("childrenControl")?.setValue(true);
                console.log(this.form.status);
            } else {
                this.form.get("childrenControl")?.setValue(false);
            }


        })
    }

    public onCheckboxChange(e: Event) {

        const website: FormArray = this.form.get('website') as FormArray;

    }

    private _createForm(): void {
        this.form = new FormGroup({
            "resourseControl": new FormControl(),
            "childrenControl": new FormControl()
        });
    }

    submit() {

        console.log(this.form.status);

    }


}
