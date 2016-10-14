export const SERVICE_ID = 0XFFE5;
export const CHARACTERISTIC_ID = 0xffe9;

export function getColorValue(color:string){
    const hex = s => parseInt(s.replace(/^#/, ''), 16);
    const red = hex(color.substr(0,3));
    const green = hex(color.substr(3,2));
    const blue = hex(color.substr(5,2));

    return new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]);
}