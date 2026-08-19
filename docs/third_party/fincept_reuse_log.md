# FinceptTerminal Reuse Log

| Field | Record |
|---|---|
| Source repository | `https://github.com/Fincept-Corporation/FinceptTerminal` |
| Upstream license | AGPL-3.0 (per integration directive; legal verification required before any source reuse) |
| Source paths copied | **None** |
| Source files adapted | **None** |
| Assets copied | **None** |
| Integration method | Independent AITRADER implementation of general architectural concepts |
| Purpose | Data distribution, workstation information architecture, portfolio/macro context and future MCP planning |

## Compliance rule

No Fincept implementation code may enter this repository without a new row identifying the upstream path, commit, copyright notice, purpose, transformation, license analysis and approval. When compatibility is uncertain, the concept must be independently reimplemented or the product must integrate through an external API/process boundary.

## Current clean-room implementations

| AITRADER path | Concept | Upstream code used | License effect |
|---|---|---|---|
| `src/data/bus/terminal-event-bus.ts` | Central publish/subscribe data plane | None | No copied AGPL material |
| `src/data/repositories/contracts.ts` | Repository/provider boundary | None | No copied AGPL material |
| `src/data/mock/mock-terminal-provider.ts` | Restrained local streaming provider | None | No copied AGPL material |
| `src/domain/terminal-events.ts` | Namespaced AITRADER event contracts | None | No copied AGPL material |
| `src/domain/mcp-tools.ts` | Future ASK AITRADER capability catalogue | None | No copied AGPL material |

## Prohibited without review

- Fincept Qt components, node editor, charts, tables, icons, themes or layouts.
- Fincept server, MCP, broker, trading, persistence or data-provider implementation files.
- Fincept names, marks, screenshots or product-specific copy.

