import type { TerminalEvent, TerminalTopic, TerminalTopicMap } from '@/domain/terminal-events';

type TopicListener<TTopic extends TerminalTopic> = (event: TerminalEvent<TTopic>) => void;

export interface TerminalEventBus {
  publish<TTopic extends TerminalTopic>(event: TerminalEvent<TTopic>): void;
  subscribe<TTopic extends TerminalTopic>(topic: TTopic, listener: TopicListener<TTopic>): () => void;
}

export class LocalTerminalEventBus implements TerminalEventBus {
  private readonly listeners = new Map<TerminalTopic, Set<(event: TerminalEvent) => void>>();

  publish<TTopic extends TerminalTopic>(event: TerminalEvent<TTopic>): void {
    this.listeners.get(event.topic)?.forEach((listener) => listener(event as TerminalEvent));
  }

  subscribe<TTopic extends TerminalTopic>(topic: TTopic, listener: TopicListener<TTopic>): () => void {
    const topicListeners = this.listeners.get(topic) ?? new Set();
    topicListeners.add(listener as (event: TerminalEvent) => void);
    this.listeners.set(topic, topicListeners);

    return () => {
      topicListeners.delete(listener as (event: TerminalEvent) => void);
      if (topicListeners.size === 0) this.listeners.delete(topic);
    };
  }
}

export function createTerminalEvent<TTopic extends TerminalTopic>(
  topic: TTopic,
  payload: TerminalTopicMap[TTopic],
): TerminalEvent<TTopic> {
  const occurredAt = new Date().toISOString();
  return {
    id: `${topic}:${occurredAt}`,
    topic,
    occurredAt,
    source: 'MOCK_PROVIDER',
    payload,
  };
}

