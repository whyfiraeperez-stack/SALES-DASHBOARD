import React,{useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,PieChart,Pie,Cell} from 'recharts';
import {LayoutDashboard,TrendingUp,MapPin,Target,Layers,RefreshCw,ChevronDown} from 'lucide-react';
import './style.css';

const snapshot={asOf:'2026-09-22',provinces:[
{name:'Albay',fiber:289,sme:16,bida:0,targetFiber:467,targetSme:71993,actualSme:35235.20},
{name:'Sorsogon',fiber:101,sme:7,bida:3,targetFiber:189,targetSme:59354,actualSme:30884.48},
{name:'Masbate',fiber:128,sme:3,bida:0,targetFiber:203,targetSme:5161,actualSme:9326.24}
],all:{fiber:518,smeJOs:26,bida:3,smeMtd:75445.92,smeTarget:136508,smeRunrate:100197.95}};
const fmt=(n)=>new Intl.NumberFormat('en-PH',{maximumFractionDigits:0}).format(n);
const money=(n)=>new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(n);
function App(){
 const [province,setProvince]=useState('All districts');
 const rows=province==='All districts'?snapshot.provinces:snapshot.provinces.filter(p=>p.name===province);
 const totals=useMemo(()=>rows.reduce((a,p)=>({fiber:a.fiber+p.fiber,sme:a.sme+p.sme,bida:a.bida+p.bida,targetFiber:a.targetFiber+p.targetFiber,targetSme:a.targetSme+p.targetSme,actualSme:a.actualSme+p.actualSme}),{fiber:0,sme:0,bida:0,targetFiber:0,targetSme:0,actualSme:0}),[rows]);
 const packageData=[{name:'FiberX',value:totals.fiber},{name:'SME',value:totals.sme},{name:'BIDA',value:totals.bida}];
 const palette=['#37c7a0','#7c9cff','#f7b955'];
 const kpis=[{label:'FiberX JO snapshot',value:fmt(totals.fiber),sub:'From cached JO records',icon:Layers},{label:'SME JO snapshot',value:fmt(totals.sme),sub:'From cached JO records',icon:TrendingUp},{label:'SME MTD (VAT incl.)',value:money(province==='All districts'?snapshot.all.smeMtd:totals.actualSme),sub:'Cached September snapshot',icon:Target},{label:'SME target progress',value:((province==='All districts'?snapshot.all.smeMtd:totals.actualSme)/(province==='All districts'?snapshot.all.smeTarget:totals.targetSme)*100).toFixed(1)+'%',sub:'MTD compared with target',icon:TrendingUp}];
 return <div className="app"><aside className="sidebar"><div className="brand"><div className="brandmark">A</div><div><strong>ALMASOR</strong><small>Performance Hub</small></div></div><nav><div className="nav active"><LayoutDashboard size={17}/> Overview</div><div className="nav"><TrendingUp size={17}/> Performance</div><div className="nav"><MapPin size={17}/> Province view</div><div className="nav"><Layers size={17}/> SLI / JO data</div></nav><div className="sidebottom"><span className="dot"></span> Snapshot mode<small>Source data: Sep 22, 2026</small></div></aside>
 <main><header className="topbar"><div><span className="eyebrow">SALES & OPERATIONS</span><h1>Sales Performance</h1><p>FiberX · SME · BIDA · S2S | Albay, Sorsogon & Masbate</p></div><div className="filter"><MapPin size={15}/><select value={province} onChange={e=>setProvince(e.target.value)}>{['All districts','Albay','Sorsogon','Masbate'].map(x=><option key={x}>{x}</option>)}</select><ChevronDown size={14}/></div></header>
 <div className="alert"><RefreshCw size={15}/> Historical cached data shown — last snapshot {snapshot.asOf}. Connect the live Google Sheet to refresh.</div>
 <section className="kpis">{kpis.map((k,i)=><article className="kpi" key={k.label}><div className="kpitop"><span>{k.label}</span><k.icon size={17}/></div><strong>{k.value}</strong><small>{k.sub}</small></article>)}</section>
 <section className="grid2"><article className="panel"><div className="panelhead"><div><h2>Province target snapshot</h2><p>SME MTD compared to target (PHP)</p></div><span className="pill">September</span></div><ResponsiveContainer width="100%" height={260}><BarChart data={rows.map(p=>({name:p.name,MTD:p.actualSme,Target:p.targetSme}))} margin={{top:10,right:12,left:0,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#273247"/><XAxis dataKey="name" stroke="#8391a8"/><YAxis stroke="#8391a8" tickFormatter={v=>v>=1000?(v/1000)+'k':v}/><Tooltip formatter={v=>money(v)}/><Bar dataKey="Target" fill="#34445d" radius={[5,5,0,0]}/><Bar dataKey="MTD" fill="#36c7a0" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer><div className="legend"><span><i className="grey"></i>Target</span><span><i className="green"></i>MTD</span></div></article>
 <article className="panel"><div className="panelhead"><div><h2>JO package mix</h2><p>Cached records by package</p></div></div><div className="donut"><ResponsiveContainer width="100%" height={235}><PieChart><Pie data={packageData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={4}>{packageData.map((x,i)=><Cell key={x.name} fill={palette[i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="donutcenter"><strong>{fmt(totals.fiber+totals.sme+totals.bida)}</strong><small>JO rows</small></div></div><div className="legend centered">{packageData.map((x,i)=><span key={x.name}><i style={{background:palette[i]}}></i>{x.name} <b>{fmt(x.value)}</b></span>)}</div></article></section>
 <section className="panel provincepanel"><div className="panelhead"><div><h2>Province summary</h2><p>Cached records and SME target progress</p></div></div><div className="tablewrap"><table><thead><tr><th>Province</th><th>FiberX JOs</th><th>SME JOs</th><th>SME MTD</th><th>Target</th><th>Progress</th></tr></thead><tbody>{rows.map(p=><tr key={p.name}><td><b>{p.name}</b></td><td>{fmt(p.fiber)}</td><td>{fmt(p.sme)}</td><td>{money(p.actualSme)}</td><td>{money(p.targetSme)}</td><td><div className="progress"><span style={{width:Math.min(100,p.actualSme/p.targetSme*100)+'%'}}></span></div><small>{(p.actualSme/p.targetSme*100).toFixed(1)}%</small></td></tr>)}</tbody></table></div></section>
 <footer>Dashboard rebuild starter · Values are historical cache snapshots, not live data. Refresh/authorize Google Sheets before using for reporting.</footer>
 </main></div>
}
createRoot(document.getElementById('root')).render(<App/>);
