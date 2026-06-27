import type { ConversationMessage, MockTransaction } from "@/lib/mockData";

const prefix = "strictly-woofs:";

export function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(`${prefix}${key}`);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
}

export function readStringSet(key: string) {
  return new Set(readStored<string[]>(key, []));
}

export function writeStringSet(key: string, value: Set<string>) {
  writeStored(key, Array.from(value));
}

export function toggleStoredId(key: string, id: string) {
  const values = readStringSet(key);
  if (values.has(id)) {
    values.delete(id);
  } else {
    values.add(id);
  }
  writeStringSet(key, values);
  return values;
}

export function appendTransaction(transaction: Omit<MockTransaction, "id" | "createdAt">) {
  const transactions = readStored<MockTransaction[]>("transactions", []);
  const next = [
    {
      ...transaction,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
    },
    ...transactions,
  ].slice(0, 30);

  writeStored("transactions", next);
  return next[0];
}

export function readConversation(creatorId: string) {
  return readStored<ConversationMessage[]>(`conversation:${creatorId}`, []);
}

export function writeConversation(creatorId: string, messages: ConversationMessage[]) {
  writeStored(`conversation:${creatorId}`, messages);
}

export function appendConversationMessage(message: Omit<ConversationMessage, "id" | "timestamp">) {
  const current = readConversation(message.creatorId);
  const nextMessage: ConversationMessage = {
    ...message,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    timestamp: new Date().toISOString(),
  };
  const next = [...current, nextMessage];
  writeConversation(message.creatorId, next);
  return nextMessage;
}
