import {MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule, MatInputModule} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatInputModule],
})
export class MaterialModule {
}
