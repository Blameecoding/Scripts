(() => {
  const getRound = () => {
    const buttons = document.querySelectorAll('button[aria-label="info"]');
    for (const btn of buttons) {
      const p = btn.querySelector('p');
      if (p && p.textContent.includes('/')) {
        return parseInt(p.childNodes[0].textContent.trim());
      }
    }
    return null;
  };

  let currentRound = getRound();
  let roundStart = performance.now();

  console.log(`Tracking started — current round: ${currentRound}`);

  setInterval(() => {
    const newRound = getRound();
    if (newRound === null || newRound === currentRound) return;

    const elapsed = ((performance.now() - roundStart) / 1000).toFixed(2);
    console.log(`Round ${currentRound} → ${newRound} | took ${elapsed}s`);

    currentRound = newRound;
    roundStart = performance.now();
  }, 100);
})();
