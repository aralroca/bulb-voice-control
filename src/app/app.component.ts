/// <reference types="web-bluetooth-typings" />

import { Component } from '@angular/core';
import { VoiceRecognitionService } from './voice-recognition.service';
import { ColorsService } from './colors.service';
import { getColorValue, SERVICE_ID, CHARACTERISTIC_ID } from './shared/consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  public color:string = '';
  public connected: boolean = false;
  public colorName:string = 'Cambia el color';
  private characteristic: BluetoothRemoteGATTCharacteristic;
  private device:BluetoothDevice;

  constructor(private voiceRecognition: VoiceRecognitionService, private colorsService: ColorsService){
   
  }

  ngOnDestroy(){
    if(this.device){
      this.device.gatt.disconnect();
    }
  }

  public connectBluetooth(){
    navigator.bluetooth.requestDevice({
      filters: [{services: [SERVICE_ID]}]
    }).then(device => {
      this.device = device;
      this.device.gatt.connect()
        .then(server => server.getPrimaryService(SERVICE_ID))
        .then(service => service.getCharacteristic(CHARACTERISTIC_ID))
        .then(characteristic => {
            this.characteristic = characteristic;
            this.connected = true;
        }).catch(err => this.connected = false);
    });
  }

  private changeColor(sentence:string = ''){
    const colorList = this.colorsService.getColors();
    const colors = sentence.split(' ').filter(s => typeof colorList[s] !== 'undefined');

    if(colors.length > 0 && this.characteristic){
      this.colorName = colors[colors.length - 1];
      this.color = colorList[this.colorName];
      this.characteristic.writeValue(getColorValue(this.color));
    }
  }

  public record(){
    this.voiceRecognition.record('es_ES').subscribe(this.changeColor.bind(this));
  }

  public stop(){
      this.voiceRecognition.stop();
  }
}
