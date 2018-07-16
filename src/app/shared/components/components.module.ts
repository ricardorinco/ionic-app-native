import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CustomHeaderComponent } from './custom-header/custom-header.component';

@NgModule({
  declarations: [CustomHeaderComponent],
  exports: [CustomHeaderComponent],
	imports: [IonicModule]
})
export class ComponentsModule {}
