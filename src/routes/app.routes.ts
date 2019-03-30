import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from 'src/app/user/user.component';

const APP_ROUTES: Routes = [
    { path: 'user', component: UserComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);