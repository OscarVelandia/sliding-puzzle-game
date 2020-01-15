import { onClickSetNewGame, onClickRestartGame } from './GameBoard.events';
import {
  compareArraysEquality,
  createHTMLImageElement,
  hideElement,
  puzzleImageRoutes,
  showElement,
  shuffleItems,
  createSlidingPuzzleSlots,
  findArrayIndexById,
  removeElementsFromDOM,
} from '../utils';

const GameBoard = (): void => {
  const width = 4;
  const height = 4;
  const puzzleSlots = createSlidingPuzzleSlots(width, height);
  let imageAndIDSlots: PairIDAndUrl[];
  let shuffledBoardSlotsWithEmptySlot: PairIDAndUrlWithEmptySlot[];
  let gameTimeInterval: number;
  let counter = 0;
  let moves = 0;

  shuffleImagesAndCreateSlotsArray(puzzleSlots);
  setListeners();

  function movePiece(evt: Event) {
    const { target } = evt as HTMLElementEvent<HTMLImageElement>;
    const clickedSlot = shuffledBoardSlotsWithEmptySlot.findIndex(slots =>
      findArrayIndexById(slots[0], target.id),
    );
    const emptySlot = shuffledBoardSlotsWithEmptySlot.findIndex(
      ([, slotUrl]) => {
        return slotUrl === undefined;
      },
    );
    const pieceCanBeMoved = getMovementDisponibility(clickedSlot, emptySlot);
    const isFirstMove = pieceCanBeMoved && counter === 0;

    if (isFirstMove) {
      setCounterInterval();
    }

    if (pieceCanBeMoved) {
      const [selectedSlotId] = shuffledBoardSlotsWithEmptySlot[clickedSlot];
      const [emptySlotId] = shuffledBoardSlotsWithEmptySlot[emptySlot];

      swapclickedItemInSlotsArray(clickedSlot, emptySlot);
      swapHTMLElements(selectedSlotId, emptySlotId);
      checkIfGameWasWon();
      updateMoves(false);
    }
  }

  function checkIfGameWasWon() {
    const gameWasWon = compareArraysEquality(
      imageAndIDSlots,
      shuffledBoardSlotsWithEmptySlot,
    );

    if (gameWasWon) {
      showElement('reset');
      clearInterval(gameTimeInterval);
      counter = 0;
    }
  }

  function swapclickedItemInSlotsArray(clickedSlot: number, emptySlot: number) {
    [
      shuffledBoardSlotsWithEmptySlot[clickedSlot],
      shuffledBoardSlotsWithEmptySlot[emptySlot],
    ] = [
      shuffledBoardSlotsWithEmptySlot[emptySlot],
      shuffledBoardSlotsWithEmptySlot[clickedSlot],
    ];
  }

  function swapHTMLElements(selectedSlotId: string, emptySlotId: string) {
    const selectedSlot = document.getElementById(
      selectedSlotId,
    ) as HTMLImageElement;
    const emptySlot = document.getElementById(emptySlotId) as HTMLDivElement;

    // create marker element and insert it where selectedSlot is
    const temp = document.createElement('div');

    selectedSlot?.parentNode?.insertBefore(temp, selectedSlot);
    emptySlot?.parentNode?.insertBefore(selectedSlot, emptySlot);
    temp?.parentNode?.insertBefore(emptySlot, temp);
    temp?.parentNode?.removeChild(temp);
  }

  function addSlots(imagesWithIds: PairIDAndUrl[]): void {
    const gameBoard = document.getElementById('game-board') as HTMLDivElement;
    const emptySlot = document.createElement('div') as HTMLDivElement;
    emptySlot.id = 'empty-slot';

    addImageSlots(gameBoard, imagesWithIds);

    gameBoard.appendChild(emptySlot);
    insertCounterInHTML();
  }

  function addImageSlots(
    gameBoard: HTMLDivElement,
    imagesWithIds: PairIDAndUrl[],
  ) {
    imagesWithIds.forEach((pair): void => {
      const [id, imgUrl]: PairIDAndUrl = pair;
      const imageIdInOriginalOrder = imageAndIDSlots.findIndex(slot =>
        findArrayIndexById(slot[0], id),
      );
      const puzzleSlotsWithImages = createHTMLImageElement(
        imgUrl,
        id,
        `piece no. ${imageIdInOriginalOrder + 1}`,
        'piece',
        movePiece,
      );
      gameBoard.appendChild(puzzleSlotsWithImages);
    });
  }

  function shuffleImagesAndCreateSlotsArray(slots: string[]) {
    imageAndIDSlots = [...slots].map((id, index): [string, string] => {
      return [id, puzzleImageRoutes[index]];
    });
    const shuffledSlotsImages = [...imageAndIDSlots].sort(shuffleItems);

    shuffledBoardSlotsWithEmptySlot = [
      ...shuffledSlotsImages,
      ['empty-slot', undefined],
    ];

    addSlots(shuffledSlotsImages);
  }

  function getMovementDisponibility(
    clickedSlot: number,
    emptySlot: number,
  ): boolean {
    const canMoveUp = emptySlot - clickedSlot === -width;
    const canMoveDown = emptySlot - clickedSlot === width;
    const canMoveRight = emptySlot - clickedSlot === 1;
    const canMoveLeft = emptySlot - clickedSlot === -1;

    if (clickedSlot <= 3 && (canMoveDown || canMoveRight || canMoveLeft)) {
      return true;
    }

    if (clickedSlot >= 12 && (canMoveUp || canMoveRight || canMoveLeft)) {
      return true;
    }

    if (canMoveUp || canMoveDown || canMoveRight || canMoveLeft) {
      return true;
    }

    return false;
  }

  function setNewGame() {
    removeElementsFromDOM('.piece');
    removeElementsFromDOM('#empty-slot');
    shuffleImagesAndCreateSlotsArray(puzzleSlots);
    hideElement('reset');
    clearInterval(gameTimeInterval);
    counter = 0;
    updateMoves(true);
  }

  function setElapsedTime() {
    insertCounterInHTML();
    counter += 1;
  }

  function insertCounterInHTML() {
    const elapsedTimeEl = document.getElementById(
      'elapsed-time',
    ) as HTMLSpanElement;

    elapsedTimeEl.innerHTML = String(counter);
  }

  function setCounterInterval() {
    gameTimeInterval = window.setInterval(setElapsedTime, 1000);
  }

  function updateMoves(resetMoves: boolean) {
    const movesEl = document.getElementById('moves') as HTMLSpanElement;
    moves = resetMoves ? 0 : (moves += 1);
    movesEl.innerHTML = String(moves);
  }

  function setListeners() {
    onClickRestartGame(() => {
      setNewGame();
      insertCounterInHTML();
    });

    onClickSetNewGame(() => {
      setNewGame();
    });
  }
};

GameBoard();
