import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatSelectModule, MatSnackBar,
  MatSnackBarModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatCardModule,
    MatSelectModule, MatGridListModule, MatInputModule, BrowserAnimationsModule],
  exports: [MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatCardModule,
    MatSelectModule, MatGridListModule, MatInputModule, BrowserAnimationsModule],
})
export class MaterialModule {
}
