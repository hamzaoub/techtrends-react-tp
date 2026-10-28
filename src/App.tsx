import { useState } from 'react';
import Header from './components/Header';
import ListeTendances from './components/ListeTendances';
import Recherche from './components/Recherche';
import Video from './components/Video';
import ListePosts from './components/ListePosts';
import ListeTaches from './components/ListeTaches';
import ListeProduits from './components/ListeProduits';
import AjouterTechnologie from './components/AjouterTechnologie';
import { technologies } from './data/technologies';

function App() {
  const [recherche, setRecherche] = useState('');
  const [triCroissant, setTriCroissant] = useState(true);

  const technologiesFiltrees = technologies.filter((tech) =>
    tech.nom.toLowerCase().includes(recherche.toLowerCase())
  );
  const technologiesTriees = [...technologiesFiltrees].sort((a, b) =>
    triCroissant ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom)
  );
  const nbCartes = technologiesTriees.length;

  return (
    <main>
      <Header titre="TechTrends — Galerie des tendances" phrase="Recherchez une technologie" />
      <Recherche valeur={recherche} onChange={setRecherche} />
      <button onClick={() => setTriCroissant(!triCroissant)}>
        Trier ({triCroissant ? 'A → Z' : 'Z → A'})
      </button>
      <p>{nbCartes} technologie(s) affichée(s)</p>
      {nbCartes === 0 ? <p>Aucune technologie trouvée.</p> : <ListeTendances technologies={technologiesTriees} />}
      <section>
        <h2>Vidéos</h2>
        <Video video={{ id: 1, titre: 'Introduction à React', dureeEnSecondes: 210 }} />
        <Video video={{ id: 2, titre: 'Les composants', dureeEnSecondes: 185 }} />
      </section>
      <section><h2>Derniers articles</h2><ListePosts /></section>
      <section><h2>Tâches</h2><ListeTaches /></section>
      <section><h2>Produits du TP3</h2><ListeProduits /></section>
      <section><h2>Ajouter une technologie</h2><AjouterTechnologie /></section>
    </main>
  );
}

export default App;
