import { useEffect, useState } from 'react';
import type { Todo } from '../types';

interface Issue {
  id: number;
  title: string;
  state: 'open' | 'closed';
  html_url: string;
  pull_request?: unknown;
}

function ListeTaches() {
  const [taches, setTaches] = useState<Todo[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const reponse = await fetch('https://api.github.com/repos/facebook/react/issues?state=all&per_page=30');
        if (!reponse.ok) {
          throw new Error('Réponse de GitHub incorrecte : ' + reponse.status);
        }
        const donnees: Issue[] = await reponse.json();
        const issues = donnees.filter((issue) => !issue.pull_request).map((issue) => ({
          id: issue.id,
          title: issue.title,
          completed: issue.state === 'closed',
          url: issue.html_url,
        }));
        if (!annule) {
          setTaches(issues);
          setChargement(false);
        }
      } catch (e) {
        if (!annule) {
          setErreur(e instanceof TypeError
            ? 'Impossible de joindre GitHub.'
            : e instanceof Error ? e.message : 'Erreur inconnue');
          setChargement(false);
        }
      }
    }

    charger();
    return () => {
      annule = true;
    };
  }, []);

  if (chargement) return <p>Chargement des tâches…</p>;
  if (erreur) return <p role="alert" style={{ color: '#c62828' }}>Erreur : {erreur}</p>;
  if (taches.length === 0) return <p>Aucune tâche trouvée.</p>;

  return (
    <>
      <p>Issues publiques du projet React sur GitHub :</p>
      <ul>
        {taches.map((tache) => (
          <li key={tache.id}>
            {tache.completed ? '☑' : '☐'}{' '}
            <a href={tache.url} target="_blank" rel="noopener noreferrer">{tache.title}</a>
            {' '}({tache.completed ? 'fermée' : 'ouverte'})
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListeTaches;
