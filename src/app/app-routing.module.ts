import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ConsolidadoComponent } from './components/consolidado/consolidado.component';

const routes: Routes = [
  { path: '', component: FileUploadComponent },
  { path: 'consolidao', component: ConsolidadoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
