(function() {
  let lastRollTime = Date.now();

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "style") {
        const target = mutation.target;
        if (target.tagName && target.tagName.toLowerCase() === "img") {
          const newStyle = target.getAttribute("style") || "";
          const oldStyle = mutation.oldValue || "";

          const newOpacity = (newStyle.match(/opacity:\s*([0-9.]+)/) || [])[1];
          const oldOpacity = (oldStyle.match(/opacity:\s*([0-9.]+)/) || [])[1];

          if (newOpacity === "1" && oldOpacity !== "1") {
            const now = Date.now();
            const elapsed = (now - lastRollTime) / 1000;

            if (elapsed < 1) return; // ignore duplicate fires

            console.log(`New roll detected. Time since last roll: ${elapsed.toFixed(2)}s`);
            lastRollTime = now;
          }
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["style"],
    attributeOldValue: true
  });
})();
