import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

/**
 * Cache entry interface
 * - Contains the response and the timestamp to check if the cache is expired
 */
interface CacheEntry {
  response: HttpResponse<any>;
  timestamp: number;
}

// Cache storage using Map
const cache = new Map<string, CacheEntry>();

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Get a valid cached response or undefined
 * @param url - The URL of the request, used as the key
 * @returns The cached response or undefined if not found or expired
 */
const getValidCachedResponse = (url: string): HttpResponse<any> | undefined => {
  const entry = cache.get(url);
  if (!entry) return undefined;

  const hasExpired = Date.now() - entry.timestamp > CACHE_DURATION;
  if (hasExpired) {
    cache.delete(url);
    return undefined;
  }

  return entry.response;
};

/**
 * Set a response in the cache
 * @param url - The URL of the request, used as the key
 * @param response - The response to cache
 */
const setCacheResponse = (url: string, response: HttpResponse<any>): void => {
  cache.set(url, {
    response,
    timestamp: Date.now()
  });
};

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') return next(req);

  // ToDo: Add invalidation based on the request parameters to force a new request

  // Check if we have a valid cached response
  const cachedResponse = getValidCachedResponse(req.url);
  if (cachedResponse) return of(cachedResponse);

  // If not cached, make the request...
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        // ...and cache the response
        setCacheResponse(req.url, event);
      }
    })
  );
};
