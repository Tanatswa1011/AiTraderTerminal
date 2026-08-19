import type { Account, JournalEvent, Position, Strategy } from './models';

export interface MarketQuote {
  symbol: string;
  price: number;
  changedAt: string;
}

export interface PortfolioRiskState {
  utilization: number;
  correlatedExposure: number;
  openRisk: number;
  safetyState: 'NORMAL' | 'CAUTION' | 'SAFE_MODE' | 'HALTED';
}

export interface MacroLockoutState {
  event: string;
  eventTime: string;
  lockoutStart: string;
  lockoutEnd: string;
  entryPermission: 'ALLOWED' | 'LOCKOUT_SOON' | 'LOCKED';
  positionManagement: 'ALLOWED';
}

export interface SystemHeartbeat {
  latencyMs: number;
  status: 'HEALTHY' | 'DEGRADED' | 'DISCONNECTED';
  receivedAt: string;
}

export type TerminalTopicMap = {
  [topic: `market:${string}:quote`]: MarketQuote;
  [topic: `strategy:${string}:state`]: Strategy;
  [topic: `prop:${string}:state`]: Account;
  'portfolio:risk': PortfolioRiskState;
  'portfolio:positions': Position[];
  'journal:event': JournalEvent;
  'macro:lockout': MacroLockoutState;
  'system:heartbeat': SystemHeartbeat;
};

export type TerminalTopic = keyof TerminalTopicMap;

export interface TerminalEvent<TTopic extends TerminalTopic = TerminalTopic> {
  id: string;
  topic: TTopic;
  occurredAt: string;
  source: 'MOCK_PROVIDER' | 'AITRADER_CORE';
  payload: TerminalTopicMap[TTopic];
}

