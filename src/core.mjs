// SI definitions: inch = 0.0254 m; US gallon = 231 cubic inches.
// psi derives from international pound (0.45359237 kg) and standard gravity.
export const PSI_PA = 0.45359237 * 9.80665 / (0.0254 ** 2);
export const GALLON_L = {US: 3.785411784, Imperial: 4.54609};
export const definitions = [
 {id:'pressure',name:'Water pressure',zh:'水压',units:['bar','psi'],initial:'3',example:'3 bar ≈ 43.51 psi'},
 {id:'flow',name:'Flow rate',zh:'流量',units:['L/min','GPM'],initial:'9.5',example:'9.5 L/min ≈ 2.51 US GPM'},
 {id:'length',name:'Dimensions',zh:'尺寸',units:['mm','inch'],initial:'25.4',example:'25.4 mm = 1 inch'},
 {id:'temperature',name:'Temperature',zh:'温度',units:['°C','°F'],initial:'38',example:'38 °C = 100.4 °F'}
];
export function convert(value, kind, reverse=false, gallon='US') {
 if(typeof value!=='number'||!Number.isFinite(value))throw new Error('Enter a finite number.');
 if(!['US','Imperial'].includes(gallon))throw new Error('Choose US or Imperial gallons.');
 let result;
 switch(kind){
 case 'pressure':result=reverse?value*PSI_PA/100000:value*100000/PSI_PA;break;
 case 'flow':result=reverse?value*GALLON_L[gallon]:value/GALLON_L[gallon];break;
 case 'length':result=reverse?value*25.4:value/25.4;break;
 case 'temperature':if(value<(reverse?-459.67:-273.15))throw new Error('Temperature is below absolute zero.');result=reverse?(value-32)*5/9:value*9/5+32;break;
 default:throw new Error('Unknown conversion.');
 }
 if(!Number.isFinite(result))throw new Error('Value is too large.');
 return Object.is(result,-0)?0:result;
}
export function format(value, digits=4){return new Intl.NumberFormat('en-US',{useGrouping:false,maximumFractionDigits:digits}).format(value);}
