import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

import { ProdutoService } from './services/produto.service';
import { AuthService } from './services/auth.service';

@NgModule({
	declarations: [
		AppComponent,
		ProdutoComponent,
		NavbarComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRouting,
		AngularFirestoreModule,
		AngularFireAuthModule,
		AngularFireModule.initializeApp(environment.firebase, 'angular-fs')],
	providers: [ ProdutoService, AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {

}
