import { Account, JournalEvent, Position, Strategy } from '@/domain/models';

export const strategies:Strategy[] = [
 {id:'gc-vwap-v2',name:'GC VWAP V2',market:'GC',family:'VWAP Mean Reversion',lifecycle:'FROZEN',mode:'PAPER',signal:'WAIT',position:'LONG',dailyR:.42,rollingR:4.81,health:'HEALTHY',allocation:35,winRate:58.4,expectancy:.31,profitFactor:1.72,trades:126,hash:'a71f9c2'},
 {id:'nq-dvp',name:'NQ Drift VWAP Pullback',market:'NQ',family:'Drift / Continuation',lifecycle:'FROZEN',mode:'PAPER',signal:'WAIT',position:'FLAT',dailyR:0,rollingR:6.32,health:'HEALTHY',allocation:35,winRate:52.1,expectancy:.38,profitFactor:1.88,trades:94,hash:'c29e4b1'},
 {id:'es-vwap',name:'ES VWAP Mean Reversion',market:'ES',family:'VWAP Mean Reversion',lifecycle:'VALIDATING',mode:'FORWARD',signal:'LONG',position:'PAPER',dailyR:.18,rollingR:1.04,health:'VALIDATING',allocation:15,winRate:55.3,expectancy:.21,profitFactor:1.44,trades:38,hash:'e84b120'},
 {id:'cl-dvp',name:'CL Drift VWAP Pullback',market:'CL',family:'Drift / Continuation',lifecycle:'RESEARCH',mode:'DISABLED',signal:'NONE',position:'FLAT',dailyR:null,rollingR:null,health:'RESEARCH',allocation:0,winRate:47.2,expectancy:.08,profitFactor:1.12,trades:31,hash:'—'}
];
export const accounts:Account[] = [
 {id:'MFFU-01',firm:'My Funded Futures',product:'Rapid EOD 50K',stage:'FUNDED',size:50000,equity:52140,buffer:2040,drawdownRemaining:1690,consistency:24,tradingDays:8,status:'SAFE'},
 {id:'FN-01',firm:'FundedNext Futures',product:'Flex 50K',stage:'EVALUATION',size:50000,equity:50820,buffer:820,drawdownRemaining:2180,consistency:18,tradingDays:3,status:'SAFE'}
];
export const positions:Position[] = [
 {id:'p1',symbol:'GC',side:'LONG',qty:1,entry:2418.6,last:2423.1,stop:2410.4,pnl:450,risk:164,strategy:'GC VWAP V2',account:'MFFU-01'},
 {id:'p2',symbol:'ES',side:'LONG',qty:1,entry:5598.25,last:5601.5,stop:5594.25,pnl:163,risk:200,strategy:'ES VWAP',account:'FN-01'}
];
export const events:JournalEvent[] = [
 {time:'14:32:01',type:'RISK_BLOCK',symbol:'GC',description:'GC VWAP entry blocked: portfolio exposure cap',severity:'warning'},
 {time:'14:31:44',type:'ACCOUNT_STATE',description:'MFFU-01 drawdown state recalculated',severity:'info'},
 {time:'14:30:00',type:'NEWS_LOCKOUT',description:'Macro event lockout cleared',severity:'positive'},
 {time:'14:21:17',type:'EXIT',symbol:'NQ',description:'NQ DVP position closed +0.74R',severity:'positive'},
 {time:'14:18:52',type:'SIGNAL',symbol:'ES',description:'ES VWAP long signal accepted for paper routing',severity:'info'}
];
export const markets = [
 {symbol:'GC',name:'Gold Futures',price:'2,423.10',change:'+0.38%',high:'2,429.70',low:'2,407.20',vwap:'2,417.84',atr:'22.4',signal:'WAIT'},
 {symbol:'NQ',name:'Nasdaq 100',price:'19,842.25',change:'+0.21%',high:'19,914.00',low:'19,721.50',vwap:'19,810.40',atr:'186',signal:'WAIT'},
 {symbol:'ES',name:'S&P 500',price:'5,601.50',change:'+0.16%',high:'5,614.25',low:'5,574.75',vwap:'5,592.18',atr:'43.8',signal:'LONG'},
 {symbol:'CL',name:'WTI Crude',price:'74.18',change:'-0.42%',high:'75.04',low:'73.88',vwap:'74.41',atr:'1.92',signal:'NONE'}
];
