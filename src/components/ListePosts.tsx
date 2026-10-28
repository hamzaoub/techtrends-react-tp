import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

function ListePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const reponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!reponse.ok) {
          throw new Error('Réponse du serveur incorrecte : ' + reponse.status);
        }
        const donnees: Post[] = await reponse.json();
        if (!annule) {
          setPosts(donnees);
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
  if (posts.length === 0) return <p>Aucun article.</p>;

  return (
    <ul>
      {posts.slice(0, 10).map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default ListePosts;
