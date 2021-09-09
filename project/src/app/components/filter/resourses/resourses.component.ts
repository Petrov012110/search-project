import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ManagerService } from '../../../../app/services/manager.service';
import { INodes } from '../../../../environments/interface';


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

        this.setHistoryControlsValue();

        this.form.valueChanges
            .pipe(
                debounceTime(50)
            )
            .subscribe(el => this._managerService.onCheckboxEvent.next(this.form));

        this.form.get('gitControl')?.valueChanges.subscribe(selectedValue => {

            if (selectedValue) {
                this.form.get("gitRepositoryControl")?.enable();
                this.form.get("gitRepositoryControl")?.setValue(true);
                this.form.get("gitUserControl")?.enable();
                this.form.get("gitUserControl")?.setValue(true);
            } else {
                this.form.get("gitRepositoryControl")?.disable();
                this.form.get("gitRepositoryControl")?.setValue(false);
                this.form.get("gitUserControl")?.disable();
                this.form.get("gitUserControl")?.setValue(false);
            }

        });

        this.form.get('twitchControl')?.valueChanges.subscribe(selectedValue => {

            if (selectedValue) {
                this.form.get("twitchCategoryControl")?.enable();
                this.form.get("twitchCategoryControl")?.setValue(true);
                this.form.get("twitchChanelControl")?.enable();
                this.form.get("twitchChanelControl")?.setValue(true);
            } else {
                this.form.get("twitchCategoryControl")?.disable();
                this.form.get("twitchCategoryControl")?.setValue(false);
                this.form.get("twitchChanelControl")?.disable();
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

    public setHistoryControlsValue(): void {
        this._managerService.onHistoryControlsEvent
            .subscribe(item => {
                this.form.get('gitControl')?.setValue(item.gitControl);
                this.form.get('gitRepositoryControl')?.setValue(item.repositoriesControl);
                this.form.get('gitUserControl')?.setValue(item.usersControl);
                this.form.get('twitchControl')?.setValue(item.twitchControl);
                this.form.get('twitchCategoryControl')?.setValue(item.categoriesControl);
                this.form.get('twitchChanelControl')?.setValue(item.chanelsControl);
                this.form.get('wikiControl')?.setValue(item.wikiControl);
            })
    }

    public disableParent(): void {

    }




}
