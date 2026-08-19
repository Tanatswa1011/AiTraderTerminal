# AITRADER Terminal Architecture

```text
┌──────────────────────── AITRADER TERMINAL ────────────────────────┐
│ Workspaces  ←  repositories/provider  ←  typed terminal event bus │
│                                  ↑                                │
│                     mock stream │ WebSocket adapter (future)      │
└──────────────────────────────────┼────────────────────────────────┘
                                   │ REST / WebSocket / MCP
                                   ▼
┌────────────────────────── AITRADER CORE ──────────────────────────┐
│ Strategy Engine │ Portfolio Manager │ Risk Engine                 │
│ Prop-Firm Rule Engine │ Execution Engine │ Journal / State        │
└──────────────────────────────────┬────────────────────────────────┘
                                   ▼
                         Broker / Prop Firm
```

AITRADER Core is authoritative. The terminal observes, explains, organizes and requests controls; it never derives a signal, approves a trade, calculates a prop rule, or assumes execution success.

## Data flow

```text
market:* ───────┐
strategy:* ─────┤
portfolio:* ────┤
prop:* ─────────┼──► TerminalEventBus ──► repositories/state ──► workspaces
journal:event ──┤
macro:* ────────┤
system:* ───────┘
```

The mock provider and future Core WebSocket adapter publish the same event envelope. Replacing mock transport therefore does not require page redesign.

## Control boundary

Read-only MCP capabilities may retrieve status, strategies, accounts, positions, portfolio, risk, prop state, journal and macro context. Operational tools (`pause`, `resume`, `safe_mode`, `disable_strategy`) are future-only and require authenticated Core-side permission, explicit human confirmation, idempotency and journal acknowledgement.

