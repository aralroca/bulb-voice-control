import { Component } from '@angular/core';
import { VoiceRecognitionService } from './voice-recognition.service';
import { BulbService } from './bulb.service';
import { colorList } from './shared/colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public color: string = '';
  public connected: boolean = false;
  public colorName: string = 'Cambia el color';

  constructor(
    private voiceRecognition: VoiceRecognitionService,
    private bulb: BulbService) {
    /* void */
  }

  ngOnDestroy() {
    if (this.connected) {
      this.connected = false;
      this.bulb.disconnect();
    }
  }

  public connectBulb() {
    if (!this.connected) {
      this.bulb.connect()
        .then(() => this.connected = true)
        .catch(err => this.connected = false);
    }
  }

  private changeColor(sentence: string = '') {
    const colors = sentence.split(' ').filter(s => typeof colorList[s] !== 'undefined');

    if (colors.length > 0 && this.connected) {
      this.colorName = colors[colors.length - 1];
      this.color = colorList[this.colorName];
      this.bulb.changeColor(this.color);
    }
  }

  public record() {
    this.voiceRecognition.record('es_ES')
      .subscribe(this.changeColor.bind(this));
  }

  public stop() {
    this.voiceRecognition.stop();
  }
}
