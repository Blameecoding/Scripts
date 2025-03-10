(function() {
    let lastRoundTime = null;
  
    // Create a mutation observer to track changes to element attributes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          // Check if the element has both required classes
          if (target.classList.contains("game-round-case") && target.classList.contains("is-previous")) {
            const now = Date.now();
            if (lastRoundTime !== null) {
              // Calculate elapsed time in seconds, fixed to two decimal places
              const elapsedSeconds = ((now - lastRoundTime) / 1000).toFixed(2);
              console.log("Time since last round: " + elapsedSeconds + " seconds");
            } else {
              console.log("First round detected at: " + (now / 1000).toFixed(2) + " seconds (epoch)");
            }
            lastRoundTime = now;
          }
        }
      });
    });
  
    // Start observing the document body for attribute changes in all child elements
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  })();
  