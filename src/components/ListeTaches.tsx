import { useEffect, useState } from 'react';
import type { Todo } from '../types';

function ListeTaches() {
  const [taches, setTaches] = useState<Todo[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const reponse = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
        if (!reponse.ok) {
          throw new Error('Réponse du serveur incorrecte : ' + reponse.status);
        }
        const donnees: Todo[] = await reponse.json();
        if (!annule) {
          setTaches(donnees);
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

  if (chargement) return <p>Chargement des données…</p>;
  if (erreur) return <p role="alert" style={{ color: '#c62828' }}>Erreur : {erreur}</p>;
  if (taches.length === 0) return <p>Aucune tâche.</p>;

  return (
    <ul>
      {taches.map((tache) => (
        <li key={tache.id}>{tache.completed ? '☑' : '☐'} {tache.title}</li>
      ))}
    </ul>
  );
}

export default ListeTaches;
