/* Service worker d'AC Visuels.
   Il ne s'occupe QUE des fichiers de l'accueil (liste ci-dessous) : réseau d'abord, copie locale si hors ligne.
   Sa portée est limitée au dossier de l'accueil : les générateurs et les autres dépôts jhervier.github.io ne sont jamais touchés.
   Changer VERSION à chaque mise en ligne de l'accueil pour renouveler la copie locale. */
'use strict';
const VERSION = 'acv-2026-11-24a';
/* Le dossier de l'accueil (en ligne : /ac-visuels-accueil/), déduit de l'adresse de ce fichier. */
const BASE = new URL('./', self.location).pathname;
const ACCUEIL = [
  '', 'index.html', 'manifest.webmanifest',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'
].map(p => BASE + p);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ACCUEIL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(cles => Promise.all(cles.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || !ACCUEIL.includes(url.pathname)) return;
  e.respondWith(
    fetch(e.request)
      .then(rep => {
        const copie = rep.clone();
        caches.open(VERSION).then(c => c.put(e.request, copie));
        return rep;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
