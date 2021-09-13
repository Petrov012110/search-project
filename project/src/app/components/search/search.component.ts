import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsViewModel } from '../../../app/models/controls.view-model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ManagerService } from '../../services/manager.service';
import { ResourceService } from '../../services/resourses.service';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./style/search.component.scss']
})

export class SearchComponent implements OnInit {

    public inputForm: FormGroup;
    public controls!: ControlsViewModel;

    constructor(
        private _resours: ResourceService,
        private _storage: LocalStorageService,
        private _managerService: ManagerService,
    ) {

        this.inputForm = new FormGroup({
            inputControl: new FormControl('', Validators.maxLength(15))
        });

    }

    public ngOnInit(): void {
        this.getValueCheckboxes();
        this.getValueHistory();
    }


    public getData(): void {

        if (!this.inputForm.controls.inputControl.value) {
            return;
        }

        this._resours.getDataFromResourses(this.controls, this.inputForm.controls.inputControl.value);

        this._storage.setHistoryToLocalStorage(this.inputForm.controls.inputControl.value, this.controls);

        this._managerService.onSearchEvent.next(this.inputForm.controls.inputControl.value);

    }

    public getValueCheckboxes(): void {
        this._managerService.onCheckboxEvent
            .subscribe(value => {
                this.controls = new ControlsViewModel(value);
            });
    }

    public getValueHistory(): void {
        this._managerService.onHistoryEvent
            .subscribe(value => {
                this.inputForm.controls.inputControl.setValue(value.input);
                this.controls = this._storage.getHistoryControls(value);
                this._managerService.onHistoryControlsEvent.next(this._storage.getHistoryControls(value));
                this.getData();
            });
    }

}
