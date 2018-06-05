import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatCardModule,
    MatSelectModule, MatGridListModule, MatInputModule, BrowserAnimationsModule, MatIconModule],
  exports: [MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatCardModule,
    MatSelectModule, MatGridListModule, MatInputModule, BrowserAnimationsModule, MatIconModule],
})
export class MaterialModule {
}
