# FinceptTerminal → AITRADER Reuse Matrix

## Audit boundary

FinceptTerminal is an **AGPL-3.0 reference implementation**, not an AITRADER dependency. This matrix records an independent-design audit of the subsystems named in the integration directive. No Fincept source file, visual asset, identifier, or branded screen has been copied into this repository. Direct repository access was unavailable in the implementation environment (the GitHub CONNECT request returned HTTP 403), so every decision below is deliberately limited to architectural concepts documented by the project and the supplied integration brief. Source-level adaptation remains blocked pending a legal and technical file-by-file review.

## Decision vocabulary

- **ADOPT CONCEPT** — retain the architectural lesson, with AITRADER-owned implementation.
- **REIMPLEMENT** — build a clean-room equivalent around AITRADER domain contracts.
- **WRAP** — isolate a compatible external service behind an AITRADER interface.
- **INTEGRATE EXTERNALLY** — communicate across a process/API boundary only.
- **IGNORE** — no operational value for the current product.
- **LICENSE BLOCKED** — never copy until an explicit AGPL compatibility decision exists.
- **FUTURE** — useful, but outside this phase.

| Fincept subsystem | What it demonstrates | AITRADER use | Decision | Priority | Boundary / rationale |
|---|---|---|---|---|---|
| DataHub / data plane | Central distribution rather than page-to-page coupling | Typed terminal topic bus | **REIMPLEMENT** | HIGH | Local bus now; WebSocket adapter later |
| Event bus | Producers and subscribers exchange structured events | Market, strategy, risk, prop, journal, macro and system topics | **REIMPLEMENT** | HIGH | AITRADER owns event vocabulary and payloads |
| MCP | Tool-oriented retrieval and operator actions | ASK AITRADER query surface | **ADOPT CONCEPT** | HIGH | Read tools first; mutations require confirmation and Core authorization |
| Portfolio analytics | Aggregated allocation, contribution and risk views | Portfolio workspace | **ADOPT CONCEPT** | HIGH | Calculations remain AITRADER Core outputs |
| Risk analytics | Portfolio/account risk inspection | Risk monitor and correlated exposure | **REIMPLEMENT** | HIGH | UI displays authoritative Core state only |
| Journal / persistence | Durable operational history | Structured live audit stream | **REIMPLEMENT** | HIGH | Repository contract separates mock/API persistence |
| WebSocket architecture | Streaming state updates | Future Core transport | **ADOPT CONCEPT** | HIGH | Adapter publishes into the same local topic bus |
| Tables | Dense financial information display | Registry, risk, positions, accounts and audit ledger | **ADOPT CONCEPT** | HIGH | AITRADER visual language, not copied widgets |
| Docking / workstation layout | Persistent multi-pane operator context | Resizable/saved layouts | **FUTURE** | MEDIUM | Current responsive grid establishes pane boundaries |
| Command interfaces | Keyboard-first navigation | Ctrl/Cmd+K palette and scoped commands | **REIMPLEMENT** | HIGH | Dangerous commands are not registered in mock MVP |
| Economics / macro | Economic series and calendar organization | Regime, calendar and market context | **REIMPLEMENT** | MEDIUM | Mock-only; future FRED/DBnomics adapters |
| News | Context and alert aggregation | Economic lockout context | **ADOPT CONCEPT** | HIGH | Lockout authority remains Prop/Risk engines |
| Market data | Instrument-oriented quote distribution | GC/NQ/ES/CL context | **WRAP** | MEDIUM | Future provider adapters normalize to Core schemas |
| Charts | Compact financial visualization | Equity and exposure supporting views | **ADOPT CONCEPT** | MEDIUM | Restrained web-native charts; no copied code |
| Notifications | Attention routing | Warnings, connection degradation, rule proximity | **REIMPLEMENT** | MEDIUM | Severity and acknowledgement become journal events |
| Trading | Order and position workflows | Execution state display | **INTEGRATE EXTERNALLY** | HIGH | AITRADER Core exclusively owns decisions/orders |
| Paper trading | Simulated execution | Paper/forward-validation display | **INTEGRATE EXTERNALLY** | MEDIUM | No terminal-side fill simulator |
| Broker abstraction | Multi-broker connectivity | Future broker/prop adapters | **FUTURE** | LOW | Belongs behind AITRADER Core |
| Backtesting | Historical evaluation workflows | Strategy lineage and validation summaries | **INTEGRATE EXTERNALLY** | MEDIUM | Existing strategy factory remains authoritative |
| AI agents | Contextual financial assistance | ASK AITRADER explanation/retrieval | **ADOPT CONCEPT** | MEDIUM | No autonomous signals or parameter changes |
| Workflow / node editor | Visual flow composition | Explain signal → risk → prop → execution path | **FUTURE** | LOW | Read-only operational visualization first |
| Secure storage | Credential and secret handling | Future authenticated terminal configuration | **FUTURE** | HIGH before live | Secrets never enter browser mock data |
| Fincept UI source/assets | Existing Qt screens, widgets, brands and assets | None | **LICENSE BLOCKED** | — | AGPL and identity requirements prohibit silent copying |
| Fincept broker/execution source | Existing adapters and execution code | None in terminal | **IGNORE** | — | Would violate AITRADER source-of-truth boundary |

## Smallest high-value subset

This phase implements only four clean-room ideas:

1. A typed topic bus with explicit namespaces.
2. Repository interfaces with a mock aggregate provider.
3. Restrained mock streaming that feeds the same bus a future WebSocket adapter will use.
4. A non-dominant ASK AITRADER placeholder exposing read-only capability boundaries.

Everything else is adopted as information-architecture guidance, deferred, externally integrated, or explicitly rejected.

## Explicit outcomes

### Adopted or reimplemented now

- Data plane and namespaced topics.
- Repository/provider seams.
- Live journal, quote, risk, heartbeat and macro-event channels.
- Dense multi-pane Command Center.
- Read-only assistant surface and future MCP tool catalogue.

### Deferred

- Dock persistence and user-authored layouts.
- WebSocket transport, external macro providers and broker adapters.
- Node/workflow editor, full charts and notifications centre.
- Authenticated operational MCP commands.

### Rejected

- Copying Fincept source, assets, branding, product names or exact screens.
- Moving strategy, portfolio, risk, prop-rule or execution decisions into the terminal.
- Combining the repositories or adopting Qt for the web-first frontend.

