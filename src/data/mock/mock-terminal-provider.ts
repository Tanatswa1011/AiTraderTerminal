import { LocalTerminalEventBus, createTerminalEvent } from '@/data/bus/terminal-event-bus';
import type { TerminalDataProvider } from '@/data/repositories/contracts';
import { accounts, events, positions, strategies } from './repository';
import type { MacroLockoutState, PortfolioRiskState } from '@/domain/terminal-events';

const risk: PortfolioRiskState = {
  utilization: 46,
  correlatedExposure: 62,
  openRisk: 364,
  safetyState: 'NORMAL',
};

const lockout: MacroLockoutState = {
  event: 'FOMC Minutes',
  eventTime: '14:00 ET',
  lockoutStart: '13:55 ET',
  lockoutEnd: '14:10 ET',
  entryPermission: 'LOCKOUT_SOON',
  positionManagement: 'ALLOWED',
};

export function createMockTerminalProvider(): TerminalDataProvider {
  const bus = new LocalTerminalEventBus();

  return {
    strategies: { list: async () => strategies, get: async (id) => strategies.find((item) => item.id === id) },
    accounts: { list: async () => accounts, get: async (id) => accounts.find((item) => item.id === id) },
    positions: { listOpen: async () => positions },
    risk: { getPortfolioRisk: async () => risk },
    journal: { listRecent: async (limit = 50) => events.slice(0, limit) },
    macro: { getLockout: async () => lockout },
    system: { getHeartbeat: async () => ({ latencyMs: 328, status: 'HEALTHY', receivedAt: new Date().toISOString() }) },
    events: bus,
    connect: () => {
      let heartbeatCount = 0;
      const heartbeatTimer = window.setInterval(() => {
        heartbeatCount += 1;
        const latencyMs = 310 + ((heartbeatCount * 17) % 41);
        bus.publish(createTerminalEvent('system:heartbeat', {
          latencyMs,
          status: latencyMs > 345 ? 'DEGRADED' : 'HEALTHY',
          receivedAt: new Date().toISOString(),
        }));
      }, 5_000);

      let quoteTick = 0;
      const quoteTimer = window.setInterval(() => {
        quoteTick += 1;
        bus.publish(createTerminalEvent('market:GC:quote', {
          symbol: 'GC',
          price: 2423.1 + (((quoteTick % 5) - 2) * 0.1),
          changedAt: new Date().toISOString(),
        }));
      }, 8_000);

      let journalIndex = 0;
      const journalTimer = window.setInterval(() => {
        const simulatedEvents = [
          { time: new Date().toLocaleTimeString('en-US', { hour12: false }), type: 'SIGNAL', symbol: 'GC', description: 'GC VWAP state evaluated; no entry permission requested', severity: 'info' as const },
          { time: new Date().toLocaleTimeString('en-US', { hour12: false }), type: 'ACCOUNT_STATE', description: 'Prop-account loss allowances reconciled', severity: 'info' as const },
        ];
        bus.publish(createTerminalEvent('journal:event', simulatedEvents[journalIndex % simulatedEvents.length]));
        journalIndex += 1;
      }, 30_000);

      bus.publish(createTerminalEvent('portfolio:risk', risk));
      bus.publish(createTerminalEvent('macro:lockout', lockout));

      return () => {
        window.clearInterval(heartbeatTimer);
        window.clearInterval(quoteTimer);
        window.clearInterval(journalTimer);
      };
    },
  };
}

export const mockTerminalProvider = createMockTerminalProvider();
