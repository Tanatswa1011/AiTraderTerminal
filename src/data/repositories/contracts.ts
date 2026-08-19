import type { Account, JournalEvent, Position, Strategy } from '@/domain/models';
import type { MacroLockoutState, PortfolioRiskState, SystemHeartbeat } from '@/domain/terminal-events';
import type { TerminalEventBus } from '@/data/bus/terminal-event-bus';

export interface StrategyRepository { list(): Promise<readonly Strategy[]>; get(id: string): Promise<Strategy | undefined>; }
export interface AccountRepository { list(): Promise<readonly Account[]>; get(id: string): Promise<Account | undefined>; }
export interface PositionRepository { listOpen(): Promise<readonly Position[]>; }
export interface RiskRepository { getPortfolioRisk(): Promise<PortfolioRiskState>; }
export interface JournalRepository { listRecent(limit?: number): Promise<readonly JournalEvent[]>; }
export interface MacroRepository { getLockout(): Promise<MacroLockoutState>; }
export interface SystemRepository { getHeartbeat(): Promise<SystemHeartbeat>; }

export interface TerminalDataProvider {
  strategies: StrategyRepository;
  accounts: AccountRepository;
  positions: PositionRepository;
  risk: RiskRepository;
  journal: JournalRepository;
  macro: MacroRepository;
  system: SystemRepository;
  events: TerminalEventBus;
  connect(): () => void;
}

