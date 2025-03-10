(function() {
    let lastRoundTime = null;
  
    // Function to check if a given element represents a new round
    function checkForNewRound(element) {
      if (element && element.classList) {
        // Define the set of classes required for an active round
        const requiredClasses = [
          "group/case",
          "relative",
          "flex",
          "h-56",
          "w-56",
          "items-center",
          "justify-center",
          "sm:h-88",
          "sm:w-88",
          "opacity-100"
        ];
        // Check if the element has all the required classes
        const isActiveCase = requiredClasses.every(cls => element.classList.contains(cls));
        if (isActiveCase) {
          const now = Date.now();
          if (lastRoundTime !== null) {
            // Calculate elapsed time in seconds (to two decimal places)
            const elapsedSeconds = ((now - lastRoundTime) / 1000).toFixed(2);
            console.log("New round started. Time since last round: " + elapsedSeconds + " seconds");
          } else {
            console.log("First round detected at: " + (now / 1000).toFixed(2) + " seconds (epoch)");
          }
          lastRoundTime = now;
        }
      }
    }
  
    // Create a MutationObserver to watch for attribute changes and added nodes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Check for attribute changes on elements
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkForNewRound(mutation.target);
        }
        // Also check for new nodes added to the DOM
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              checkForNewRound(node);
              // Also check for any div elements within the added node
              node.querySelectorAll('div').forEach(child => {
                checkForNewRound(child);
              });
            }
          });
        }
      });
    });
  
    // Start observing the document body for both attribute changes and new nodes
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      childList: true
    });
  })();
  