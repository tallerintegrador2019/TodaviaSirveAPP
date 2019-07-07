import { NgModule } from '@angular/core';
import { AvatarUserComponent } from './avatar-user/avatar-user';
import { TabbarComponent } from './tabbar/tabbar';
@NgModule({
	declarations: [AvatarUserComponent,
    TabbarComponent],
	imports: [],
	exports: [AvatarUserComponent,
    TabbarComponent]
})
export class ComponentsModule {}
