import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HudComponent } from './components/hud/hud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlayerComponent } from './components';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HudComponent,
    BrowserAnimationsModule,
    DragDropModule,
    PlayerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
