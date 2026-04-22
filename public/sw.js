/* No-op service worker.
 * This file exists to satisfy browsers that are requesting `/sw.js` (often due to a previously-registered SW).
 * It does not intercept requests.
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

