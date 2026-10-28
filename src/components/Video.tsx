interface VideoProps {
  video: { id: number; titre: string; dureeEnSecondes: number };
}

function Video({ video }: VideoProps) {
  const minutes = Math.floor(video.dureeEnSecondes / 60);
  const secondes = video.dureeEnSecondes % 60;

  return (
    <div>
      <strong>{video.titre}</strong>
      <span> — {minutes} min {secondes.toString().padStart(2, '0')}</span>
    </div>
  );
}

export default Video;
