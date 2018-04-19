import {MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule],
})
export class MaterialModule {
}
