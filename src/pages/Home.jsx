export default function Home() {
    return (
    <div className="home">
      <h2>Create your own Aeon's End cards</h2>
      <p>
        With this creator you can more-or-less easily design mages and supply cards (spells, relics, and gems).
      </p>

      <div style={{display: 'flex', flexDirection: 'row', flexGrow: '1'}}>

        <div class="instructions">
          <h2>How to Use the Card Creator</h2>

          <div class="instruction-section">
            <h3>🃏 Creating a Card</h3>
            <ol>
              <li>
                In the navigation bar, click on the <strong>category</strong> of the card you want to create.
              </li>
              <li>
                Fill in all the required fields (name, abilities, costs, etc.).
              </li>
              <li>
                When you're done, click <strong>“Ready”</strong> to generate and save your card file.
              </li>
            </ol>
            <p class="tip">
              Your card will be generated based on the information you provide — make sure everything looks correct before clicking Ready.
            </p>
          </div>

          <div class="instruction-section">
            <h3>⚙️ Using Advanced Settings</h3>
            <p>
              The Advanced Settings allow you to fine-tune the position of elements on your card.
            </p>
            <ol>
              <li>
                Click the <strong>Advanced Settings</strong> button to open the positioning controls.
              </li>
              <li>
                You will see fields labeled <strong>Top</strong> and <strong>Left</strong>.
              </li>
            </ol>
            <p>
              Think of it like this:
            </p>
            <ul>
              <li><strong>Top</strong> → moves the element up or down.</li>
              <li><strong>Left</strong> → moves the element left or right.</li>
            </ul>
            <p class="tip">
              Increasing the number moves the element further down (Top) or further right (Left).
            </p>
          </div>

          <div class="instruction-section">
            <h3>✨ Special Element Syntax</h3>
            <p>
              You can use special placeholders inside text fields to automatically insert images.
            </p>
            <p>
              For example:
            </p>
            <div class="code-example">
              {"${aether}"}
            </div>
            <p>
              When the card is generated, this text will be replaced with the corresponding image.
            </p>
            <p class="tip">
              Make sure to type it exactly as shown, including the <strong>{"${ }"}</strong> symbols.
            </p>
            <p>
              Possible replacements are:
              <ul>
                <li>{"${aether}"} - replaces text with black aether icon</li>
                <li>{"${aether-white}"} - replaces text with white aether icon</li>
                <li>{"${newline}"} - replaces text with new line (use for <strong>OR</strong> instructions in your cards)</li>
                <li>{"${some text|bold}"} - creates bold version of "some text"</li>
                <li>{"${some text|italic}"} - creates italic version of "some text"</li>
                <li>{"${some text|color:<color>}"} - creates color version of the passed color (either name or hex)</li>
              </ul>

              You can use it like: "Gain 1{"${aether}"}. {"${newline}"} {"${OR|bold}"} {"${newline}"} Gain 1 HP."
            </p>
          </div>

          <div class="instruction-section">
            <h3>💾 Saving & Storage</h3>
            <p>
              Your progress is saved automatically in your browser.
              Clearing browser data or switching devices will reset your saved content.
            </p>
          </div>
        </div>

        <div>
          <div class="storage-info">
            <h3>Noticed any bugs?</h3>
            
            <p>
              If you've noticed any bugs or have features that we're not planning on doing, feel free to reach out and create a <a href="https://github.com/Davenury/aeons-end-builder/issues/new">Github Issue</a>, where you'll describe
              what didn't work for you or what you'd like to be added here.
            </p>
          </div>

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
                <li>Nemesis mats</li>
                <li>Treasures</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}