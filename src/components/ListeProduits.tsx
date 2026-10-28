import { useEffect, useState } from 'react';

interface Produit {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  categorie: string;
}

function ListeProduits() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const reponse = await fetch('/api/produits');
        if (!reponse.ok) {
          throw new Error('Réponse du serveur incorrecte : ' + reponse.status);
        }
        const donnees: Produit[] = await reponse.json();
        if (!annule) {
          setProduits(donnees);
          setChargement(false);
        }
      } catch (e) {
        if (!annule) {
          setErreur(e instanceof TypeError
            ? 'Impossible de joindre l’API du TP3.'
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

  if (chargement) return <p>Chargement des produits…</p>;
  if (erreur) return <p role="alert">API des produits : {erreur}</p>;
  if (produits.length === 0) return <p>Aucun produit.</p>;

  return (
    <ul>
      {produits.map((produit) => (
        <li key={produit.id}>{produit.nom} — {produit.prix} $</li>
      ))}
    </ul>
  );
}

export default ListeProduits;
