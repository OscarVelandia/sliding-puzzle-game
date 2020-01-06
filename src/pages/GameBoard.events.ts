function onClickRestartGame(listener: EventListenerOnClickMethod): void {
  const showButton = document.getElementById('restart-game');
  return showButton?.addEventListener('click', listener);
}

function onClickSetNewGame(listener: EventListenerOnClickMethod): void {
  const resetButton = document.getElementById('reset');
  return resetButton?.addEventListener('click', listener);
}

export { onClickRestartGame, onClickSetNewGame };
