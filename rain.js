(function() {
    let lastRoundTime = Date.now();
    let lastRoundNumber = null;
  
    // This function will parse strings like "Round 12 of 22" or "12 of 22" and return { current, total }
    function parseRoundText(text) {
      text = text.trim();
      // Ignore text if it's just "CLAIM" (or similar)
      if (text.toUpperCase() === "CLAIM") return null;
      // Try matching "Round 12 of 22"
      let m = text.match(/round\s*(\d+)\s*of\s*(\d+)/i);
      if (m) return { current: parseInt(m[1], 10), total: parseInt(m[2], 10) };
      // Try matching "12 of 22"
      m = text.match(/(\d+)\s*of\s*(\d+)/i);
      if (m) return { current: parseInt(m[1], 10), total: parseInt(m[2], 10) };
      // Try matching "12/22"
      m = text.match(/(\d+)\s*\/\s*(\d+)/);
      if (m) return { current: parseInt(m[1], 10), total: parseInt(m[2], 10) };
      return null;
    }
  
    // Checks for the state of the round by looking for specific divs.
    function getRoundState() {
      const upcoming = document.querySelector("div.sc-7f67bd7d-0.hcdUJG.sc-cda0cd7b-5.kSuSLI");
      const roundOver = document.querySelector("div.sc-7f67bd7d-0.hcdUJG.sc-cda0cd7b-5.dMKVsK");
      if (upcoming) return "upcoming round";
      if (roundOver) return "round over";
      return "state unknown";
    }
  
    // Instead of just looking at the span, we target its parent container
    // which contains both spans (one with "Round " and one with "12 of 22")
    function checkRound() {
      // The container div that wraps the two spans (adjust the selector if needed)
      const container = document.querySelector("div.sc-f63de73e-0.bTgJiE");
      if (!container) {
        console.log("Round container not found");
        return;
      }
      const fullText = container.innerText; // Should be something like "Round 12 of 22"
      const info = parseRoundText(fullText);
      if (!info) {
        // If we can't parse, log the full text for debugging (only once)
        console.log("Unable to parse round info from text:", fullText);
        return;
      }
      if (info.current !== lastRoundNumber) {
        const now = Date.now();
        const elapsed = ((now - lastRoundTime) / 1000).toFixed(2);
        const state = getRoundState();
        console.log(`Round ${info.current} of ${info.total} (${state}). Time since last round: ${elapsed} seconds`);
        lastRoundTime = now;
        lastRoundNumber = info.current;
      }
    }
  
    // Use requestAnimationFrame for continuous checking at roughly 60 FPS
    function loop() {
      checkRound();
      requestAnimationFrame(loop);
    }
    
    // Start the loop when the DOM is ready.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loop);
    } else {
      loop();
    }
  })();
  