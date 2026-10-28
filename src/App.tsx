import { useEffect, useState } from 'react';
import Header from './components/Header';
import ListeTendances from './components/ListeTendances';
import Recherche from './components/Recherche';
import Video from './components/Video';
import ListePosts from './components/ListePosts';
import ListeTaches from './components/ListeTaches';
import ListeProduits from './components/ListeProduits';
import AjouterTechnologie from './components/AjouterTechnologie';
import type { Technologie } from './components/CarteTechnologie';

interface Paquet {
  collected: { metadata: { name: string } };
  score: { detail: { popularity: number } };
}

function App() {
  const [technologies, setTechnologies] = useState<Technologie[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [recherche, setRecherche] = useState('');
  const [triCroissant, setTriCroissant] = useState(true);

  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const reponse = await fetch('https://api.npms.io/v2/package/mget', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(['react', 'typescript', 'dockerode', 'redis', 'pg', 'openai']),
        });
        if (!reponse.ok) {
          throw new Error('Réponse du serveur incorrecte : ' + reponse.status);
        }
        const donnees: Record<string, Paquet> = await reponse.json();
        const liste = Object.values(donnees).map((paquet) => ({
          id: paquet.collected.metadata.name,
          nom: paquet.collected.metadata.name,
          categorie: 'Paquet npm',
          niveauPopularite: Math.round(paquet.score.detail.popularity * 5),
          couleur: '#3178c6',
        }));
        if (!annule) {
          setTechnologies(liste);
          setChargement(false);
        }
      } catch (e) {
        if (!annule) {
          setErreur(e instanceof Error ? e.message : 'Erreur inconnue');
          setChargement(false);
        }
      }
    }

    charger();
    return () => {
      annule = true;
    };
  }, []);

  const technologiesFiltrees = technologies.filter((tech) =>
    tech.nom.toLowerCase().includes(recherche.toLowerCase())
  );
  const technologiesTriees = [...technologiesFiltrees].sort((a, b) =>
    triCroissant ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom)
  );
  const nbCartes = technologiesTriees.length;
  return (
    <main>
      <Header titre="TechTrends — Galerie des tendances" phrase="Recherchez un paquet npm (données npms.io)" />
      <Recherche valeur={recherche} onChange={setRecherche} />
      <button onClick={() => setTriCroissant(!triCroissant)}>
        Trier ({triCroissant ? 'A → Z' : 'Z → A'})
      </button>
      {chargement && <p>Chargement des technologies…</p>}
      {erreur && <p role="alert">Erreur : {erreur}</p>}
      {!chargement && !erreur && (
        <>
          <p>{nbCartes} technologie(s) affichée(s)</p>
          {nbCartes === 0 ? <p>Aucune technologie trouvée.</p> : <ListeTendances technologies={technologiesTriees} />}
        </>
      )}
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
