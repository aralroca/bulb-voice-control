/// <reference types="web-bluetooth-typings" />

import { Injectable } from '@angular/core';

const SERVICE_ID: number = 0XFFE5;
const CHARACTERISTIC_ID: number = 0xffe9;

@Injectable()
export class BulbService {
  private characteristic: BluetoothRemoteGATTCharacteristic;
  private device: BluetoothDevice;

  constructor() { }

  public connect() {
    return new Promise((resolve, reject) => {
      navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_ID] }]
      }).then(device => {
        this.device = device;
        this.device.gatt.connect()
          .then(server => server.getPrimaryService(SERVICE_ID))
          .then(service => service.getCharacteristic(CHARACTERISTIC_ID))
          .then(characteristic => {
            resolve();
            this.characteristic = characteristic;
          }).catch(err => reject(err));
      });
    });
  }

  public disconnect() {
    this.device.gatt.disconnect();
  }

  public changeColor(color) {
    this.characteristic.writeValue(this.getColorValue(color));
  }

  private getColorValue(color: string) {
    const hex = s => parseInt(s.replace(/^#/, ''), 16);
    const red = hex(color.substr(0, 3));
    const green = hex(color.substr(3, 2));
    const blue = hex(color.substr(5, 2));

    return new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]);
  }

}
