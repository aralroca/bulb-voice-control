import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { VoiceRecognitionService } from './voice-recognition.service';
import { BulbService } from './bulb.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [VoiceRecognitionService, BulbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
