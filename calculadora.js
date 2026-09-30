const N=v=>{const x=parseFloat(String(v).replace(',','.'));return isFinite(x)?x:NaN};
const money=(v,c)=>isFinite(v)?new Intl.NumberFormat('pt-BR',{style:'currency',currency:c||S.cfg.moeda}).format(v):'—';
const pct=v=>isFinite(v)?v.toLocaleString('pt-BR',{maximumFractionDigits:2})+'%':'—';
const cls=v=>v>0?'pos':v<0?'neg':'';
function calcFut(o){ // modelo genérico, educacional
 const {margem,lev,entrada,saida,side,fe=0,fs=0,fund=0}=o;
 if(!(margem>0&&lev>=1&&entrada>0))return null;
 const d=side==='short'?-1:1,pos=margem*lev;
 const var_=isFinite(saida)&&saida>0?(saida-entrada)/entrada*d:NaN;
 const bruto=pos*var_,taxas=pos*(fe+fs)/100,fundv=pos*fund/100,liq=bruto-taxas-fundv;
 return {pos,var_:var_*100,bruto,taxas,fundv,liq,roi:liq/margem*100,liqPx:entrada*(1-d*(1/lev-0.005))};
}
function calcRisco(o){const {banca,r,entrada,stop,lev}=o;
 if(!(banca>0&&r>0&&entrada>0&&stop>0&&entrada!==stop))return null;
 const rd=banca*r/100,dist=Math.abs(entrada-stop),qtd=rd/dist,pos=qtd*entrada;
 return {rd,dist,distP:dist/entrada*100,qtd,pos,margem:lev>0?pos/lev:NaN,pctBanca:pos/banca*100}}
function calcRR(e,s,t){const r=Math.abs(e-s),g=Math.abs(t-e);return r>0&&isFinite(g)?{risco:r,ret:g,rr:g/r}:null}
