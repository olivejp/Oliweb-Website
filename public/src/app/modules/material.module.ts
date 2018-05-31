import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatSelectModule
} from '@angular/material';
import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatGridListModule, MatInputModule, BrowserAnimationsModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatGridListModule, MatInputModule, BrowserAnimationsModule],
})
export class MaterialModule {
}
