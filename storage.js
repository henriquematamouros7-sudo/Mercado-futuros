const KEY='fta_v1';
const DEF={done:{},quiz:{},sims:0,trades:[],bank:{ini:0,cur:0,meta:0,lim:0,risco:1,hist:[]},cfg:{theme:'dark',moeda:'USD',fx:5.5},check:{},welcomed:false};
let S=load();
function load(){try{return Object.assign(structuredClone(DEF),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return structuredClone(DEF)}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){alert('Não foi possível salvar os dados.')}}
function exportJSON(){dl('futures-academy.json',JSON.stringify(S,null,2),'application/json')}
function exportCSV(){const t=S.trades;if(!t.length)return alert('Sem operações.');const k=Object.keys(t[0]);dl('diario.csv',[k.join(';')].concat(t.map(r=>k.map(c=>'"'+String(r[c]??'').replace(/"/g,'""')+'"').join(';'))).join('\n'),'text/csv')}
function dl(n,c,m){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c],{type:m}));a.download=n;a.click()}
function importJSON(f){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.trades))throw 0;S=Object.assign(structuredClone(DEF),d);save();location.reload()}catch(e){alert('Arquivo inválido.')}};r.readAsText(f)}
