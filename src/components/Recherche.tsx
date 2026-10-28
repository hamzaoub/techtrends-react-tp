interface RechercheProps {
  valeur: string;
  onChange: (valeur: string) => void;
}

function Recherche({ valeur, onChange }: RechercheProps) {
  return (
    <input
      type="search"
      placeholder="Rechercher (ex. docker)"
      value={valeur}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Recherche;
