import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ParkingComponent } from './parking/parking.component';
import { AddParkingComponent } from './add-parking/add-parking.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { AddAbonnementComponent } from './add-abonnement/add-abonnement.component';
// Routes array define component along with the path name for url
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'auth',component:AuthComponent },

  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'add-user', component: AddUserComponent },
  { path: 'users', component: UserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'add-park', component: AddParkingComponent },
  { path: 'parks', component: ParkingComponent },
  { path: 'add-abonnement', component: AddAbonnementComponent },
  { path: 'abonnements', component: AbonnementComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
