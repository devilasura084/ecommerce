import { unstable_cache as nextCache } from 'next/cache';
import { cache as Reactcache } from 'react';

type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback>(
  cb: T,
  keyparts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  return nextCache(Reactcache(cb), keyparts, options);
}
