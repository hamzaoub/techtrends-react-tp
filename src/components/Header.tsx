interface HeaderProps {
  titre: string;
  phrase: string;
}

function Header({ titre, phrase }: HeaderProps) {
  return (
    <header>
      <h1>{titre}</h1>
      <p>{phrase}</p>
    </header>
  );
}

export default Header;
