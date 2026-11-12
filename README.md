# ac-visuels-accueil

**AC Visuels** : page d'accueil des générateurs de visuels AlloCiné, installable comme une appli sur Android et iPhone (appli web, pas de store).

En ligne : https://jhervier.github.io/ac-visuels-accueil/

- Onglets **Statiques** / **Carrousels** (tout générateur dont le dossier contient « carrousel » va dans Carrousels).
- Les générateurs s'ouvrent dans l'appli, sous une barre « ‹ AC Visuels » pour revenir à l'accueil.
- Pour ajouter un générateur : une ligne dans `GENERATEURS` (en tête du script de `index.html`).
- Icône : ticket AlloCiné officiel dans un tirage photo (`icons/icon.svg`, PNG exportés à partir de ce fichier).
- Après une modification, changer `VERSION` dans `sw.js`.

## Installer
- **iPhone** : ouvrir le site dans Safari → Partager → « Sur l'écran d'accueil ».
- **Android** : ouvrir le site dans Chrome → « Installer » (bandeau ou menu ⋮).
