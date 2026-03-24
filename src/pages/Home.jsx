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
                <li>{"${some text|list-item}"} - creates color version of the passed color (either name or hex)</li>
              </ul>

              You can use it like: "Gain 1{"${aether}"}. {"${newline}"} {"${OR|bold}"} {"${newline}"} Gain 1 HP."
            </p>
          </div>

          <div class="instruction-section">
            <h3>💾 Saving & Storage</h3>
            <p>
              Your progress is saved automatically in your browser.
              Clearing browser data or switching devices will reset your saved content.
              You can also export forms to persist your data in even safer manner!
            </p>
          </div>
        </div>

        <div>
          <div class="storage-info">
            <h3>Lack of category?</h3>
            
            <p>
              If you lack a category or need a custom card creator, you can visit <code>Other</code> tab and go to the <code>Custom</code> creator, where you can input your custom background and play with adding the fields yourself.
              Notice that this feature is considered <strong>Advanced</strong> and requires you to more or less know what you're doing. <strong>Especially do not repeat keys of the fields as it might lead to unexpected behavior!</strong>
              Remember that on this page, the changes are not persisted, so refreshing the page or going into another page in this creator will result in you loosing all your progress.
            </p>
          </div>

          <div class="storage-info">
            <h3>Custom CSS</h3>
            
            <p>
              Most of the fields that you can modify have <code>Custom CSS</code> option you can use. You can use <a style={{color: '#0077B6'}} href="https://www.w3schools.com/react/react_css.asp" target="_blank">React style CSS</a> in form of JSON object. The object is then sanitized and passed directly to the <code>style</code> property.
              Notice that we've been using some CSS already to position or style objects. If you opt to use your custom CSS in this field, some styling might break (e.g. using <code>top</code> and <code>left</code> properties might break positioning).
            </p>
            <p>
              For example, you can include this custom css to create a shadowed text:
              <pre><code>
                {`{"textShadow": "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000"}`}
              </code></pre>
              or such a css for a glassy background effect (I used <a href="https://css.glass/" target="_blank" style={{color: '#0077B6'}}>this site to generate the css</a>):
              <pre><code>
              {`{"background": "rgba(255, 255, 255, 0.2)", "borderRadius": "16px", "boxShadow": "0 4px 30px rgba(0, 0, 0, 0.1)", "backdropFilter": "blur(5px)", "WebkitBackdropFilter": "blur(5px)", "border": "1px solid rgba(255, 255, 255, 0.3)", "padding": "8px"}`}
              </code></pre>
            </p>
          </div>

          <div class="storage-info">
            <h3>Noticed any bugs?</h3>
            
            <p>
              If you've noticed any bugs or have features that we're not planning on doing, feel free to reach out and create a <a style={{color: '#0077B6'}} href="https://github.com/Davenury/aeons-end-builder/issues/new" target="_blank">Github Issue</a>, where you'll describe
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
              To be extra sure, you can export your work and then import it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}