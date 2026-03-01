export default function Home() {
    return (
    <div className="home">
      <h2>Create your own Aeon's End cards</h2>
      <p>
        With this creator you can more-or-less easily design mages and supply cards (spells, relics, and gems).
      </p>

      <div class="storage-info">
        <h3>Your Progress Is Saved!</h3>
        
        <p>
          As long as you're using the same browser and don’t clear its data,
          everything will stay right where you left it.
        </p>

        <div class="storage-details">
          <p><strong>Things that can reset your progress:</strong></p>
          <ul>
            <li>Clearing browser data</li>
            <li>Using private / incognito mode</li>
            <li>Switching to a different browser or device</li>
            <li>Sometimes browsers clear their data by themselves!</li>
          </ul>
        </div>

        <p class="coming-soon">
          We’re working on adding export/import soon so you’ll be able to create backups and move your data safely.
        </p>
      </div>

      <div class="storage-info">
        <h3>What we're working on?</h3>
        
        <p>
          <ul>
            <li>Adding possbiility to change font sizes of all elements</li>
            <li>Nemesis mats and cards</li>
            <li>Treasures</li>
          </ul>
        </p>
      </div>
    </div>
  );
}