import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { VoiceRecognitionService } from './voice-recognition.service';
import { ColorsService } from './colors.service'

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
  providers: [VoiceRecognitionService, ColorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
