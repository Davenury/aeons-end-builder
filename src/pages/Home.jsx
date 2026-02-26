export default function Home() {
    return (
    <div className="home">
      <h2>Create your own Aeon's End cards</h2>
      <p>
        Design spells, relics, and mages using a community-friendly editor.
        Export and share your creations with other players.
      </p>

      <div className="home-buttons">
        <a className="primary-btn" href="/create">Start Creating</a>
        <a className="secondary-btn" href="/gallery">Browse Cards</a>
      </div>
    </div>
  );
}