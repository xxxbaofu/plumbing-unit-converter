"use client";
import {useState} from 'react';
import {convert,definitions,format} from './core.mjs';
function Conversion({definition,digits,gallon,zh}:{definition:typeof definitions[number];digits:number;gallon:string;zh:boolean}){
 const [value,setValue]=useState(definition.initial),[reverse,setReverse]=useState(false),[notice,setNotice]=useState('');
 const units=[...definition.units];if(definition.id==='flow')units[1]=`${gallon} GPM`;if(reverse)units.reverse();
 let number:number|undefined,error='';
 try{if(value.trim())number=convert(Number(value),definition.id,reverse,gallon);}catch(e){error=zh?'请输入有效数值；温度不得低于绝对零度。':(e as Error).message;}
 const equation=number!==undefined?`${value} ${units[0]} = ${format(number,digits)} ${units[1]}`:'';
 function swap(){if(number!==undefined)setValue(String(number));setReverse(!reverse);setNotice('');}
 return <section className="puc-card" aria-labelledby={`puc-${definition.id}`} data-conversion={definition.id}>
  <h2 id={`puc-${definition.id}`}>{zh?definition.zh:definition.name}</h2>
  <div className="puc-direction"><span>{units[0]}</span><button type="button" onClick={swap} aria-label={`${zh?'交换':'Swap'} ${definition.name} units`}>⇄ <span>{zh?'交换':'Swap'}</span></button><span>{units[1]}</span></div>
  <label htmlFor={`puc-input-${definition.id}`}>{zh?'输入':'From'} ({units[0]})</label>
  <input id={`puc-input-${definition.id}`} type="number" step="any" value={value} aria-invalid={!!error} aria-describedby={`puc-feedback-${definition.id}`} onChange={e=>{setValue(e.target.value);setNotice('');}}/>
  <label htmlFor={`puc-output-${definition.id}`}>{zh?'结果':'To'} ({units[1]})</label>
  <output id={`puc-output-${definition.id}`} aria-live="polite">{number===undefined?'':format(number,digits)}</output>
  <div id={`puc-feedback-${definition.id}`} className="puc-feedback">{error||(!value?(zh?'输入数值开始换算。':'Enter a value to convert.'):'')}</div>
  <button className="puc-copy" type="button" disabled={!equation} onClick={async()=>{try{await navigator.clipboard.writeText(equation);setNotice(zh?'已复制':'Copied');}catch{setNotice(zh?'无法自动复制，请选择结果复制。':'Select the result to copy; clipboard access is unavailable.');}}}>{zh?'复制结果':'Copy result'}</button><span role="status">{notice}</span>
 </section>;
}
export function Converter(){
 const [zh,setZh]=useState(false),[gallon,setGallon]=useState('US'),[digits,setDigits]=useState(4);
 return <div className="puc" lang={zh?'zh-CN':'en'}><div className="puc-settings"><label>{zh?'语言':'Language'}<select value={zh?'zh':'en'} onChange={e=>setZh(e.target.value==='zh')}><option value="en">English</option><option value="zh">中文</option></select></label><label>{zh?'加仑制式':'Gallon definition'}<select value={gallon} onChange={e=>setGallon(e.target.value)}><option value="US">US gallon (3.785411784 L)</option><option value="Imperial">Imperial gallon (4.54609 L)</option></select></label><label>{zh?'最大小数位数':'Maximum decimal places'}<select value={digits} onChange={e=>setDigits(Number(e.target.value))}>{[0,2,4,6].map(n=><option key={n} value={n}>{n}</option>)}</select></label></div>
 <div className="puc-grid">{definitions.map(d=><Conversion key={d.id} definition={d} digits={digits} gallon={gallon} zh={zh}/>)}</div>
 <p className="puc-note">{zh?'计算在本机完成，输入值不会上传。GPM 必须注明美制或英制。mm / inch 表示实际长度，不是 G、BSP、NPT 或 DN 公称管径及螺纹对照；换算水压不会改变表压或绝对压力的基准。':'Calculations stay on your device. Specify US or Imperial GPM. mm / inch converts physical length, not nominal G, BSP, NPT or DN pipe sizes. Pressure conversion preserves the gauge or absolute reference of the input.'}</p><noscript>Enable JavaScript to use the calculator. Conversion formulas and examples are available below.</noscript></div>;
}
