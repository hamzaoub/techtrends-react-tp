export interface Technologie {
  id: number;
  nom: string;
  categorie: string;
  niveauPopularite: 1 | 2 | 3 | 4 | 5;
  couleur: string;
}
interface CarteProps { tech: Technologie; }
function CarteTechnologie({ tech }: CarteProps) {
  return (
    <article style={{ borderLeft: '6px solid ' + tech.couleur, padding: 12 }}>
      <h3>{tech.nom}</h3>
      <p>{tech.categorie} · Popularité {tech.niveauPopularite}/5</p>
    </article>
  );
}
export default CarteTechnologie;
