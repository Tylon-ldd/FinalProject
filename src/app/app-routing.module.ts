import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewBusinessCardComponent } from './new-business-card/new-business-card.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { EditBusinessCardComponent } from './edit-business-card/edit-business-card.component';

//might need to try the other variations of the router guards...
export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: 'newCard', component: NewBusinessCardComponent, canActivate: [AuthGuardService] },
   { path: 'editCard/:cid', component: EditBusinessCardComponent, canActivate: [AuthGuardService] },
   { path: 'list', component: BusinessCardsComponent, canActivate: [AuthGuardService] },
   { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
