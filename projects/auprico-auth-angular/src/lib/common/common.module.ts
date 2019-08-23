import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    MatSidenavModule,
    MatFormFieldModule, MatButtonToggleModule, MatTabsModule, MatButtonModule, MatProgressSpinnerModule
} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTreeModule} from '@angular/material/tree';
// import { EditorModule } from '@tinymce/tinymce-angular';
import { ExceptionHandlerService } from './exception-handler/exception-handler.service';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {GenericDialogComponent} from "./generic-dialog/generic-dialog.component";
import {DateCheckerNoHour} from "./custom-pipes.pipe";
export {MatAutocompleteModule} from '@angular/material/autocomplete';
export {MatDialogModule} from '@angular/material';
export {MatCheckboxModule}  from '@angular/material/checkbox';
export {MatRadioModule} from '@angular/material/radio';
export {MatSnackBarModule} from '@angular/material/snack-bar';
export {MatStepperModule} from '@angular/material/stepper';
export {MatIconModule} from '@angular/material/icon';
export {MatCardModule} from '@angular/material/card';
export {MatTableModule} from '@angular/material/table';
export {MatGridListModule} from '@angular/material';
export {MatSortModule} from '@angular/material/sort';
export {MatPaginatorModule} from '@angular/material/paginator';
export {MatTooltipModule} from '@angular/material/tooltip';
export {MatMenuModule} from '@angular/material/menu';
// export { EditorModule } from '@tinymce/tinymce-angular';
export {MatBadgeModule} from '@angular/material/badge';
export {MatDatepickerModule} from '@angular/material/datepicker';
export {MatNativeDateModule} from '@angular/material';
export {MatTreeModule} from '@angular/material/tree';
export { MatSliderModule } from '@angular/material/slider';
export { ExceptionHandlerService } from './exception-handler/exception-handler.service';

@NgModule({
    imports: [
        MatSidenavModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatListModule,
        MatChipsModule,
        MatCardModule,
        MatDialogModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatTableModule,
        MatGridListModule,
        MatSortModule,
        MatTooltipModule,
        MatTabsModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTreeModule,
        // EditorModule,
        MatSliderModule
    ],
    exports: [
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatExpansionModule,
        MatListModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatStepperModule,
        MatTableModule,
        MatDialogModule,
        MatGridListModule,
        MatSortModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatSliderModule,
        MatTabsModule,
        MatTreeModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatBadgeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        // EditorModule
    ],
    declarations: [
      GenericDialogComponent,
      DateCheckerNoHour
    ],
    providers: [ExceptionHandlerService],
    entryComponents: [],
})
export class ICommonModule {

}
