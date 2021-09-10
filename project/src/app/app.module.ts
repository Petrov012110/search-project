import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from '@circlon/angular-tree-component';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { ContentComponent } from './components/content/content.component';
import { ResoursesComponent } from './components/filter/resourses/resourses.component';
import { InformationComponent } from './components/filter/information/information.component';
import { SortingComponent } from './components/filter/sorting/sorting.component';
import { ResourceService } from './services/resourses.service';
import { LocalStorageService } from './services/local-storage.service';
import { ManagerService } from './services/manager.service';
import { ErrorComponent } from './components/error/error.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

const components: any[] = [
    AppComponent,
    HistoryComponent,
    FilterComponent,
    SearchComponent,
    ContentComponent,
    ResoursesComponent,
    InformationComponent,
    SortingComponent,
    ErrorComponent,
];

const imports: any[] = [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule
];

const providers: any[] = [
    ResourceService,
    LocalStorageService,
    ManagerService,
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useExisting: GlobalErrorHandlerService }
]
@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        ...imports
    ],
    providers: [
        ...providers
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
