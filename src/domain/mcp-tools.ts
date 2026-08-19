export type OperatorToolRisk = 'READ_ONLY' | 'OPERATIONAL' | 'CRITICAL';

export interface OperatorToolDefinition {
  name: string;
  risk: OperatorToolRisk;
  confirmationRequired: boolean;
  enabledInMock: boolean;
  purpose: string;
}

export const operatorTools: readonly OperatorToolDefinition[] = [
  ['aitrader_get_status', 'System and execution status'],
  ['aitrader_get_strategies', 'Strategy registry'],
  ['aitrader_get_strategy', 'Strategy state and lineage'],
  ['aitrader_get_accounts', 'Prop-account registry'],
  ['aitrader_get_positions', 'Open positions'],
  ['aitrader_get_portfolio', 'Portfolio allocation and performance'],
  ['aitrader_get_risk', 'Portfolio and account risk'],
  ['aitrader_get_prop_status', 'Prop-rule compliance'],
  ['aitrader_get_journal', 'Operational audit events'],
  ['aitrader_get_macro', 'Macro regime and event lockouts'],
].map(([name, purpose]) => ({
  name,
  purpose,
  risk: 'READ_ONLY' as const,
  confirmationRequired: false,
  enabledInMock: true,
}));

export const futureControlTools: readonly OperatorToolDefinition[] = [
  { name: 'aitrader_pause', purpose: 'Request engine pause', risk: 'OPERATIONAL', confirmationRequired: true, enabledInMock: false },
  { name: 'aitrader_resume', purpose: 'Request engine resume', risk: 'OPERATIONAL', confirmationRequired: true, enabledInMock: false },
  { name: 'aitrader_safe_mode', purpose: 'Request safe mode', risk: 'CRITICAL', confirmationRequired: true, enabledInMock: false },
  { name: 'aitrader_disable_strategy', purpose: 'Request strategy disable', risk: 'CRITICAL', confirmationRequired: true, enabledInMock: false },
];

