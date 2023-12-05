import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogEditNotesComponent } from './dialog-edit-notes/dialog-edit-notes.component';
import { DialogEditLevelComponent } from './dialog-edit-level/dialog-edit-level.component';
import { DialogArchiveComponent } from './dialog-archive/dialog-archive.component';
import { ArchiveComponent } from './archive/archive.component';
import { ArchivedUserDetailComponent } from './archived-user-detail/archived-user-detail.component';
import { DialogRestoreUserComponent } from './dialog-restore-user/dialog-restore-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    ImprintComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    DialogEditNotesComponent,
    DialogEditLevelComponent,
    DialogArchiveComponent,
    ArchiveComponent,
    ArchivedUserDetailComponent,
    DialogRestoreUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule, 
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule, 
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSliderModule,
    provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-7dc7e","appId":"1:537390772148:web:ec018746afd6bb61518ce1","storageBucket":"simple-crm-7dc7e.appspot.com","apiKey":"AIzaSyADpFj9e0FEYJyZ9uPLl2KUfQTTOslk-uI","authDomain":"simple-crm-7dc7e.firebaseapp.com","messagingSenderId":"537390772148"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
