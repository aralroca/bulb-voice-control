import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable()
export class VoiceRecognitionService {
  private recognition:any;

  constructor(private zone: NgZone) {
     const { webkitSpeechRecognition }: IWindow = <IWindow>window;
     this.recognition = new webkitSpeechRecognition();
   }

  /**
   * Record
   * @param {string} language - Language of the voice recognition
   * @returns {Observable<string>} - Observable of voice converted to string 
   */
  record(language: string): Observable<string> {
    return Observable.create(observer => {
      this.recognition.onresult = (e) => this.zone.run(() => observer.next(e.results.item(e.results.length - 1).item(0).transcript.toLowerCase()));
      this.recognition.onerror = (e) => this.zone.run(() => observer.error(e));
      this.recognition.onend = () => this.zone.run(() => observer.complete());

      this.recognition.continuous = true;
      this.recognition.lang = language;
      this.recognition.start();
    });
  }

  stop(){
    this.recognition.stop()
  }
}
