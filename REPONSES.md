# Questions de compréhension

## 1. React et JavaScript vanilla

React est une bibliothèque JavaScript pour construire des interfaces avec des composants.
On décrit ce que l'interface doit afficher selon les données.
En JavaScript vanilla, on peut modifier directement les éléments du DOM à la main.

## 2. Le DOM virtuel

React garde une représentation de l'interface en mémoire.
Quand une donnée change, il calcule la nouvelle représentation et la compare à l'ancienne.
Il met ensuite à jour les parties nécessaires du DOM dans la page.

## 3. Props et state

Une prop est une donnée envoyée par un composant parent à un enfant.
Par exemple, `titre` est une prop du composant `Header`.
Un state est une donnée qui peut changer dans le composant, comme `recherche` dans `App`.

## 4. Les fichiers TSX

Un fichier `.tsx` permet d'écrire du JSX dans du TypeScript.
Il sert aux composants qui retournent une interface React.
Un fichier `.ts` convient à du TypeScript sans JSX, comme les types ou les données.

## 5. Le tableau de dépendances de useEffect

Le tableau `[]` indique que l'effet ne dépend d'aucune valeur du composant.
Le chargement est lancé après le montage, sans être relancé à chaque rendu.
La liste des tâches l'utilise pour éviter de faire une requête à chaque mise à jour.

## 6. Les états d'un appel API

Au début, `chargement` vaut `true` et un message est affiché.
Si la requête réussit, les données sont enregistrées puis affichées.
Si elle échoue, le message d'erreur est enregistré et affiché à la place.

## 7. Les dossiers d'un projet Vite React

`src` contient le code de l'application, comme les composants et les styles.
`public` contient les fichiers statiques servis tels quels.
`node_modules` contient les dépendances installées par npm ; on ne les modifie pas à la main.
