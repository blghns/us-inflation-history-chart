import React, { useState, useMemo } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  ReferenceArea
} from 'recharts';
import { TrendingUp, Info, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

import './App.css';

const rawData = [
  { year: 1914, ave: 1.0 }, { year: 1915, ave: 1.0 }, { year: 1916, ave: 7.9 }, { year: 1917, ave: 17.4 }, { year: 1918, ave: 18.0 }, { year: 1919, ave: 14.6 },
  { year: 1920, ave: 15.6 }, { year: 1921, ave: -10.5 }, { year: 1922, ave: -6.1 }, { year: 1923, ave: 1.8 }, { year: 1924, ave: 0.0 }, { year: 1925, ave: 2.3 },
  { year: 1926, ave: 1.1 }, { year: 1927, ave: -1.7 }, { year: 1928, ave: -1.7 }, { year: 1929, ave: 0.0 }, { year: 1930, ave: -2.3 }, { year: 1931, ave: -9.0 },
  { year: 1932, ave: -9.9 }, { year: 1933, ave: -5.1 }, { year: 1934, ave: 3.1 }, { year: 1935, ave: 2.2 }, { year: 1936, ave: 1.5 }, { year: 1937, ave: 3.6 },
  { year: 1938, ave: -2.1 }, { year: 1939, ave: -1.4 }, { year: 1940, ave: 0.7 }, { year: 1941, ave: 5.0 }, { year: 1942, ave: 10.9 }, { year: 1943, ave: 6.1 },
  { year: 1944, ave: 1.7 }, { year: 1945, ave: 2.3 }, { year: 1946, ave: 8.3 }, { year: 1947, ave: 14.4 }, { year: 1948, ave: 8.1 }, { year: 1949, ave: -1.2 },
  { year: 1950, ave: 1.3 }, { year: 1951, ave: 7.9 }, { year: 1952, ave: 1.9 }, { year: 1953, ave: 0.8 }, { year: 1954, ave: 0.7 }, { year: 1955, ave: -0.4 },
  { year: 1956, ave: 1.5 }, { year: 1957, ave: 3.3 }, { year: 1958, ave: 2.8 }, { year: 1959, ave: 0.7 }, { year: 1960, ave: 1.7 }, { year: 1961, ave: 1.0 },
  { year: 1962, ave: 1.0 }, { year: 1963, ave: 1.3 }, { year: 1964, ave: 1.3 }, { year: 1965, ave: 1.6 }, { year: 1966, ave: 2.9 }, { year: 1967, ave: 3.1 },
  { year: 1968, ave: 4.2 }, { year: 1969, ave: 5.5 }, { year: 1970, ave: 5.7 }, { year: 1971, ave: 4.4 }, { year: 1972, ave: 3.2 }, { year: 1973, ave: 6.2 },
  { year: 1974, ave: 11.0 }, { year: 1975, ave: 9.1 }, { year: 1976, ave: 5.8 }, { year: 1977, ave: 6.5 }, { year: 1978, ave: 7.6 }, { year: 1979, ave: 11.3 },
  { year: 1980, ave: 13.5 }, { year: 1981, ave: 10.3 }, { year: 1982, ave: 6.2 }, { year: 1983, ave: 3.2 }, { year: 1984, ave: 4.3 }, { year: 1985, ave: 3.6 },
  { year: 1986, ave: 1.9 }, { year: 1987, ave: 3.6 }, { year: 1988, ave: 4.1 }, { year: 1989, ave: 4.8 }, { year: 1990, ave: 5.4 }, { year: 1991, ave: 4.2 },
  { year: 1992, ave: 3.0 }, { year: 1993, ave: 3.0 }, { year: 1994, ave: 2.6 }, { year: 1995, ave: 2.8 }, { year: 1996, ave: 3.0 }, { year: 1997, ave: 2.3 },
  { year: 1998, ave: 1.6 }, { year: 1999, ave: 2.2 }, { year: 2000, ave: 3.4 }, { year: 2001, ave: 2.8 }, { year: 2002, ave: 1.6 }, { year: 2003, ave: 2.3 },
  { year: 2004, ave: 2.7 }, { year: 2005, ave: 3.4 }, { year: 2006, ave: 3.2 }, { year: 2007, ave: 2.8 }, { year: 2008, ave: 3.8 }, { year: 2009, ave: -0.4 },
  { year: 2010, ave: 1.6 }, { year: 2011, ave: 3.2 }, { year: 2012, ave: 2.1 }, { year: 2013, ave: 1.5 }, { year: 2014, ave: 1.6 }, { year: 2015, ave: 0.1 },
  { year: 2016, ave: 1.3 }, { year: 2017, ave: 2.1 }, { year: 2018, ave: 2.4 }, { year: 2019, ave: 1.8 }, { year: 2020, ave: 1.2 }, { year: 2021, ave: 4.7 },
  { year: 2022, ave: 8.0 }, { year: 2023, ave: 4.1 }, { year: 2024, ave: 2.9 }, { year: 2025, ave: 2.6 }
];

const eras = [
  { name: 'Great Depression', start: 1929, end: 1939, color: '#fef2f2', label: 'Deflationary Spiral' },
  { name: 'Post-WWII Spike', start: 1946, end: 1948, color: '#fffbeb', label: 'Post-War Rebound' },
  { name: 'Great Inflation', start: 1973, end: 1982, color: '#fff1f2', label: 'Stagflation Era' },
  { name: 'Financial Crisis', start: 2008, end: 2009, color: '#f5f3ff', label: '"The Big Short" Crash' },
  { name: 'Modern Spike', start: 2021, end: 2023, color: '#f0f9ff', label: 'Supply Chain/COVID' }
];

const App = () => {
  const stats = useMemo(() => {
    const values = rawData.map(d => d.ave);
    return {
      max: Math.max(...values),
      min: Math.min(...values),
      avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
      current: rawData[rawData.length - 1].ave
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isDeflation = data.ave < 0;
      return (
        <div className="bg-white p-3 md:p-4 border rounded-xl shadow-2xl border-slate-200 pointer-events-none">
          <p className="text-[10px] md:text-sm font-bold text-slate-500 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className={`text-xl md:text-2xl font-black ${isDeflation ? 'text-blue-600' : 'text-rose-600'}`}>
              {data.ave}%
            </span>
            <span className="text-[8px] md:text-xs font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-widest">
              {isDeflation ? 'Deflation' : 'Inflation'}
            </span>
          </div>
          {eras.find(e => label >= e.start && label <= e.end) && (
            <p className="text-[9px] md:text-xs mt-2 italic text-slate-400">
              During: {eras.find(e => label >= e.start && label <= e.end).name}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12 space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-600">
              <TrendingUp size={18} className="md:w-6 md:h-6" />
              <span className="font-bold tracking-tight uppercase text-[10px] md:text-xs">Economic Indicator</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl leading-tight">
              US Inflation <span className="text-slate-400 font-light">History</span>
            </h1>
            <p className="text-slate-500 text-xs md:text-base max-w-2xl leading-relaxed">
              Tracking CPI annual averages from 1914 to 2025.
            </p>
          </div>
          <div className="flex items-center md:items-end gap-3 self-start md:self-auto">
             <div className="px-3 py-1.5 md:px-5 md:py-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <p className="text-[8px] md:text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Current (2025)</p>
                <p className="text-lg md:text-2xl font-black text-slate-800 tracking-tighter">{stats.current}%</p>
             </div>
          </div>
        </header>

        {/* Stats Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatCard title="All-Time High" value={`${stats.max}%`} sub="1920 Post-WWI" icon={<ArrowUpRight className="text-rose-500" size={16} />} />
          <StatCard title="All-Time Low" value={`${stats.min}%`} sub="1921 Deflation" icon={<ArrowDownRight className="text-blue-500" size={16} />} />
          <StatCard title="Historic Avg" value={`${stats.avg}%`} sub="111-year mean" icon={<Info className="text-slate-400" size={16} />} />
          <StatCard title="Total Years" value={rawData.length} sub="Continuous" icon={<Calendar className="text-slate-400" size={16} />} />
        </div>

        {/* Main Chart Card */}
        <div className="bg-white p-4 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-10">
            <h2 className="text-sm md:text-lg font-bold text-slate-800">Annual Percentage Change</h2>
            <div className="flex gap-4 text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-500 rounded-full"></span> Inflation</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-slate-100 border border-slate-200 rounded-sm"></span> Context</span>
            </div>
          </div>

          <div className="h-[280px] sm:h-[400px] md:h-[500px] w-full -ml-4 sm:ml-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rawData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAve" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10}}
                  minTickGap={35} // Prevents overlapping dates on small screens
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10}}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ stroke: '#f43f5e', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                
                {eras.map((era, idx) => (
                  <ReferenceArea 
                    key={idx}
                    x1={era.start} 
                    x2={era.end} 
                    fill={era.color} 
                    strokeOpacity={0.2}
                  />
                ))}

                <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1} />
                <ReferenceLine 
                  y={2} 
                  stroke="#e2e8f0" 
                  strokeDasharray="5 5" 
                  label={{ position: 'right', value: '2% Target', fill: '#94a3b8', fontSize: 8, fontWeight: 'bold' }} 
                />
                
                <Area 
                  type="monotone" 
                  dataKey="ave" 
                  stroke="#f43f5e" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorAve)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend / Key Era Context */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
          <div className="bg-slate-900 text-white p-6 md:p-10 rounded-[2.5rem] space-y-6 order-2 lg:order-1">
            <h3 className="text-base md:text-xl font-bold flex items-center gap-3">
              <Info size={20} className="text-rose-400" /> Economic Context
            </h3>
            <ul className="space-y-4 md:space-y-6">
              <ObservationItem number="01" text="WWI drove the all-time peak of 18.0% in 1918." />
              <ObservationItem number="02" text="The 1930s Great Depression saw severe deflation (-9.9% in 1932)." />
              <ObservationItem number="03" text="1970s oil shocks led to 'Stagflation', peaking at 13.5% in 1980." />
              <ObservationItem number="04" text="The 2008 Financial Crisis caused a rare modern deflationary dip (-0.4%)." />
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 order-1 lg:order-2">
            {eras.map((era, idx) => (
              <EraCard key={idx} era={era} />
            ))}
          </div>
        </div>

        <footer className="text-center pt-8 pb-12">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
             BLS Historical Series • Mobile Optimized Build v1.3
           </p>
        </footer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, icon }) => (
  <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-3">
      <p className="text-[8px] md:text-[10px] uppercase font-black text-slate-400 tracking-wider">{title}</p>
      <div className="p-1.5 bg-slate-50 rounded-lg">{icon}</div>
    </div>
    <p className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter leading-none">{value}</p>
    <p className="text-[9px] md:text-xs text-slate-500 mt-2 font-medium">{sub}</p>
  </div>
);

const ObservationItem = ({ number, text }) => (
  <li className="flex gap-4 items-start">
    <span className="text-rose-500 font-black text-xs md:text-sm pt-0.5">{number}.</span>
    <span className="text-xs md:text-sm text-slate-300 leading-relaxed">{text}</span>
  </li>
);

const EraCard = ({ era }) => (
  <div className="flex items-center justify-between p-3.5 md:p-5 bg-white border border-slate-200 rounded-[1.25rem] group hover:border-rose-300 transition-all shadow-sm">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black text-[10px] md:text-xs text-slate-700" style={{backgroundColor: era.color}}>
        {era.start.toString().slice(-2)}
      </div>
      <div>
        <h4 className="font-bold text-slate-800 leading-tight text-xs md:text-sm">{era.name}</h4>
        <p className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-tight font-bold">{era.label}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[9px] md:text-[10px] font-black text-slate-300">{era.start}—{era.end.toString().slice(-2)}</p>
    </div>
  </div>
);

export default App;