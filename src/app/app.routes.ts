import { Routes } from '@angular/router';
import LoginComponent from './login/login.component';
import {TwoFactorAuthenticationComponent} from './two-factor-authentication/two-factor-authentication.component';
import {ErrorComponent} from './error/error.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ScienceComponent} from './science/science.component';
import {MusicComponent} from './music/music.component';
import {SportComponent} from './sport/sport.component';
import {CultureComponent} from './culture/culture.component';
import {AuthGuard} from './auth.guard';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './admin/admin.component';
import {ModeratorComponent} from './moderator/moderator.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'authenticate', component: TwoFactorAuthenticationComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'science', component: ScienceComponent, canActivate: [AuthGuard] },
  { path: 'culture', component: CultureComponent, canActivate: [AuthGuard] },
  { path: 'sport', component: SportComponent, canActivate: [AuthGuard] },
  { path: 'music', component: MusicComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'moderator', component: ModeratorComponent, canActivate: [AuthGuard], data: { role: 'MODERATOR' } }
];

