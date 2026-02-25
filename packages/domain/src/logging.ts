import type { NormalizedAppError } from './error-management';

export type AppLogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface AppLogEvent {
  id: string;
  timestamp: string;
  app: string;
  namespace: string;
  level: AppLogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: NormalizedAppError;
}

interface AppLoggerOptions {
  app: string;
  namespace?: string;
  env?: string;
  minLevel?: AppLogLevel;
  minRemoteLevel?: AppLogLevel;
  remoteEndpoint?: string;
  consoleInProduction?: boolean;
}

export interface AppLogger {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(
    message: string,
    context?: Record<string, unknown>,
    normalizedError?: NormalizedAppError,
  ): void;
  child(namespace: string): AppLogger;
}

const LEVEL_PRIORITY: Record<AppLogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const DEV_LIKE_ENVS = new Set(['development', 'dev', 'local', 'mock', 'test']);

function toLogId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function shouldWriteLog(level: AppLogLevel, minLevel: AppLogLevel) {
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[minLevel];
}

function isConsoleEnabled(env: string, consoleInProduction: boolean) {
  if (consoleInProduction) {
    return true;
  }

  return DEV_LIKE_ENVS.has(env.toLowerCase());
}

function sanitizeValue(value: unknown, depth = 0, seen = new WeakSet<object>()): unknown {
  if (depth > 4) {
    return '[MaxDepthExceeded]';
  }

  if (value === null || value === undefined) {
    return value;
  }

  const valueType = typeof value;
  if (
    valueType === 'string' ||
    valueType === 'number' ||
    valueType === 'boolean' ||
    valueType === 'bigint'
  ) {
    return value;
  }

  if (valueType === 'function') {
    const functionName =
      typeof (value as { name?: unknown }).name === 'string'
        ? (value as { name: string }).name
        : 'anonymous';
    return `[Function:${functionName}]`;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(item => sanitizeValue(item, depth + 1, seen));
  }

  if (valueType === 'object') {
    if (seen.has(value as object)) {
      return '[CircularReference]';
    }

    seen.add(value as object);
    const output: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, nestedValue]) => {
      output[key] = sanitizeValue(nestedValue, depth + 1, seen);
    });
    seen.delete(value as object);
    return output;
  }

  return String(value);
}

function logToConsole(event: AppLogEvent) {
  const prefix = `[${event.app}][${event.namespace}]`;
  const payload = {
    id: event.id,
    timestamp: event.timestamp,
    context: event.context,
    error: event.error,
  };

  if (event.level === 'debug') {
    console.debug(prefix, event.message, payload);
    return;
  }

  if (event.level === 'info') {
    console.info(prefix, event.message, payload);
    return;
  }

  if (event.level === 'warn') {
    console.warn(prefix, event.message, payload);
    return;
  }

  console.error(prefix, event.message, payload);
}

function sendToRemote(endpoint: string, event: AppLogEvent) {
  if (typeof window === 'undefined') {
    return;
  }

  const serialized = JSON.stringify(event);

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const payload = new Blob([serialized], {
        type: 'application/json',
      });
      navigator.sendBeacon(endpoint, payload);
      return;
    }
  } catch {
    // noop
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    keepalive: true,
    body: serialized,
  }).catch(() => undefined);
}

export function createAppLogger(options: AppLoggerOptions): AppLogger {
  const namespace = options.namespace ?? 'app';
  const env = options.env ?? 'development';
  const minLevel = options.minLevel ?? (DEV_LIKE_ENVS.has(env) ? 'debug' : 'info');
  const minRemoteLevel = options.minRemoteLevel ?? 'error';
  const consoleEnabled = isConsoleEnabled(env, options.consoleInProduction ?? false);

  const emit = (
    level: AppLogLevel,
    message: string,
    context?: Record<string, unknown>,
    normalizedError?: NormalizedAppError,
  ) => {
    if (!shouldWriteLog(level, minLevel)) {
      return;
    }

    const event: AppLogEvent = {
      id: toLogId(),
      timestamp: new Date().toISOString(),
      app: options.app,
      namespace,
      level,
      message,
      context: context ? (sanitizeValue(context) as Record<string, unknown>) : undefined,
      error: normalizedError ? (sanitizeValue(normalizedError) as NormalizedAppError) : undefined,
    };

    if (consoleEnabled) {
      logToConsole(event);
    }

    if (options.remoteEndpoint && shouldWriteLog(level, minRemoteLevel)) {
      sendToRemote(options.remoteEndpoint, event);
    }
  };

  return {
    debug: (message, context) => emit('debug', message, context),
    info: (message, context) => emit('info', message, context),
    warn: (message, context) => emit('warn', message, context),
    error: (message, context, normalizedError) => emit('error', message, context, normalizedError),
    child: childNamespace =>
      createAppLogger({
        ...options,
        namespace: `${namespace}:${childNamespace}`,
        minLevel,
        minRemoteLevel,
      }),
  };
}
