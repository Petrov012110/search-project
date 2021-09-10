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

        this.subscribtionFormControl('gitControl', "gitRepositoryControl", "gitUserControl");
        this.subscribtionFormControl('twitchControl', "twitchCategoryControl", "twitchChanelControl");

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

    public subscribtionFormControl(parentControl: string, childeControlFirst: string, childeControlSecont: string): void {
        this.form.get(parentControl)?.valueChanges.subscribe(selectedValue => {

            if (selectedValue) {
                this.form.get(childeControlFirst)?.enable();
                this.form.get(childeControlFirst)?.setValue(true);
                this.form.get(childeControlSecont)?.enable();
                this.form.get(childeControlSecont)?.setValue(true);
            } else {
                this.form.get(childeControlFirst)?.disable();
                this.form.get(childeControlFirst)?.setValue(false);
                this.form.get(childeControlSecont)?.disable();
                this.form.get(childeControlSecont)?.setValue(false);
            }

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
            });
    }

}
