export type Status = 'SAFE'|'HEALTHY'|'WARNING'|'VALIDATING'|'RESEARCH'|'INCOMPLETE'|'CONNECTED';
export interface Strategy { id:string; name:string; market:string; family:string; lifecycle:string; mode:string; signal:string; position:string; dailyR:number|null; rollingR:number|null; health:Status; allocation:number; winRate:number; expectancy:number; profitFactor:number; trades:number; hash:string; }
export interface Account { id:string; firm:string; product:string; stage:string; size:number; equity:number; buffer:number; drawdownRemaining:number; consistency:number; tradingDays:number; status:Status; }
export interface Position { id:string; symbol:string; side:'LONG'|'SHORT'; qty:number; entry:number; last:number; stop:number; pnl:number; risk:number; strategy:string; account:string; }
export interface JournalEvent { time:string; type:string; symbol?:string; description:string; severity:'info'|'positive'|'warning'; }
