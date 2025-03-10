(function() {
    // Save the timestamp of the last roll event.
    let lastRollTime = Date.now();
  
    // Create a MutationObserver to monitor style attribute changes.
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Only process attribute changes for the "style" attribute.
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          const target = mutation.target;
          // Only look at IMG elements.
          if (target.tagName && target.tagName.toLowerCase() === "img") {
            const newStyle = target.getAttribute("style") || "";
            const oldStyle = mutation.oldValue || "";
  
            // Use regex to extract opacity values from the styles.
            const newOpacityMatch = newStyle.match(/opacity:\s*([0-9.]+)/);
            const oldOpacityMatch = oldStyle.match(/opacity:\s*([0-9.]+)/);
            const newOpacity = newOpacityMatch ? newOpacityMatch[1] : null;
            const oldOpacity = oldOpacityMatch ? oldOpacityMatch[1] : null;
  
            // If the new opacity is 1 (live case) and the old one was not 1, log the event.
            if (newOpacity === "1" && oldOpacity !== "1") {
              const now = Date.now();
              const elapsedSeconds = ((now - lastRollTime) / 1000).toFixed(2);
              console.log(`New roll detected. Time since last roll: ${elapsedSeconds} seconds`);
              lastRollTime = now;
            }
          }
        }
      });
    });
  
    // Start observing the entire document for style attribute changes on any element.
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["style"],
      attributeOldValue: true
    });
  })();
  