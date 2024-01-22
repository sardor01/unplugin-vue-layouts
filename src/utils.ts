import { posix } from 'node:path';

export function normalizePath(path: string) {
  path = path.startsWith('/') ? path : `/${path}`;
  return posix.normalize(path);
}
