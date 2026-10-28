import CarteTechnologie from './CarteTechnologie';
import type { Technologie } from './CarteTechnologie';

interface ListeTendancesProps {
  technologies: Technologie[];
}

function ListeTendances({ technologies }: ListeTendancesProps) {
  return (
    <section className="liste-technologies">
      {technologies.map((tech) => <CarteTechnologie key={tech.id} tech={tech} />)}
    </section>
  );
}

export default ListeTendances;
