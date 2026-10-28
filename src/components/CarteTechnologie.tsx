export interface Technologie {
  id: string;
  nom: string;
  categorie: string;
  niveauPopularite: number;
  telechargements: number;
  couleur: string;
}
interface CarteProps { tech: Technologie; }
function CarteTechnologie({ tech }: CarteProps) {
  return (
    <article style={{ borderLeft: '6px solid ' + tech.couleur, padding: 12 }}>
      <h3>{tech.nom}</h3>
      <p>{tech.categorie} · Popularité relative {tech.niveauPopularite}/5</p>
      <p>{tech.telechargements.toLocaleString('fr-CA')} téléchargements sur 7 jours</p>
    </article>
  );
}
export default CarteTechnologie;
