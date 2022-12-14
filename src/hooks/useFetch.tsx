import { useState } from 'react';

interface FetchCache {
  keys: unknown[];
  promised?: Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rejected?: any;
  resolved?: unknown;
}

const fetchClient = new Map<string, FetchCache>();

// @see https://dev.to/charlesstover/react-suspense-with-the-fetch-api-374j
export function useFetch<T>(
  _keys: unknown[],
  promiseFn: () => Promise<T>,
  client: Map<string, FetchCache> = fetchClient
): { data: T; invalidate: () => void } {
  const [invalidateKey, setInvalidateKey] = useState<unknown>();
  const keys = [..._keys, invalidateKey];

  const { rejected, resolved, promised } = client.get(String(keys)) || {};

  if (rejected != null) {
    throw rejected;
  }

  if (resolved != null) {
    return {
      data: resolved as T,
      invalidate: (key?: unknown) => {
        setInvalidateKey(key ?? Date.now());
      },
    };
  }

  if (promised != null) {
    throw promised;
  }

  const cache = createFetchCache(keys, promiseFn);

  client.set(String(keys), cache);

  throw cache.promised;
}

function createFetchCache<T>(keys: unknown[], promiseFn: () => Promise<T>) {
  const cache: FetchCache = {
    keys,
    promised: promiseFn()
      .then((r) => (cache.resolved = r))
      .catch((e) => (cache.rejected = e)),
  };

  return cache;
}
