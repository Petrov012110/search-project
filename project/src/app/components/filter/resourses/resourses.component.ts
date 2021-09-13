import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ControlsEnum } from 'src/environments/enums';
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
        this.createForm();
    }


    public ngOnInit(): void {

        this.setHistoryControlsValue();

        this.form.valueChanges
            .pipe(
                debounceTime(50)
            )
            .subscribe(el => this._managerService.onCheckboxEvent.next(this.form));

        this.subscribtionFormControl(ControlsEnum.gitControl, ControlsEnum.gitRepositoryControl, ControlsEnum.gitUserControl);
        this.subscribtionFormControl(ControlsEnum.twitchControl, ControlsEnum.twitchCategoryControl, ControlsEnum.twitchChanelControl);

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
                this.form.get(ControlsEnum.gitControl)?.setValue(item.gitControl);
                this.form.get(ControlsEnum.gitRepositoryControl)?.setValue(item.repositoriesControl);
                this.form.get(ControlsEnum.gitUserControl)?.setValue(item.usersControl);
                this.form.get(ControlsEnum.twitchControl)?.setValue(item.twitchControl);
                this.form.get(ControlsEnum.twitchCategoryControl)?.setValue(item.categoriesControl);
                this.form.get(ControlsEnum.twitchChanelControl)?.setValue(item.chanelsControl);
                this.form.get(ControlsEnum.wikiControl)?.setValue(item.wikiControl);
            });
    }

    private createForm(): void {
        this.form = new FormGroup({
            gitControl: new FormControl(),
            gitRepositoryControl: new FormControl(),
            gitUserControl: new FormControl(),
            twitchControl: new FormControl(),
            twitchCategoryControl: new FormControl(),
            twitchChanelControl: new FormControl(),
            wikiControl: new FormControl(),
        });

    }
}
