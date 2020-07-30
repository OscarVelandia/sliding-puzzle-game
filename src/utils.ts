import part1 from './assets/img/row-1-col-1.jpg';
import part2 from './assets/img/row-1-col-2.jpg';
import part3 from './assets/img/row-1-col-3.jpg';
import part4 from './assets/img/row-1-col-4.jpg';
import part5 from './assets/img/row-2-col-1.jpg';
import part6 from './assets/img/row-2-col-2.jpg';
import part7 from './assets/img/row-2-col-3.jpg';
import part8 from './assets/img/row-2-col-4.jpg';
import part9 from './assets/img/row-3-col-1.jpg';
import part10 from './assets/img/row-3-col-2.jpg';
import part11 from './assets/img/row-3-col-3.jpg';
import part12 from './assets/img/row-3-col-4.jpg';
import part13 from './assets/img/row-4-col-1.jpg';
import part14 from './assets/img/row-4-col-2.jpg';
import part15 from './assets/img/row-4-col-3.jpg';

export const removeElementsFromDOM = (elementClassOrId: string): void => {
  document.querySelectorAll(elementClassOrId).forEach((element) => element.remove());
};

export const uniqueId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const createHTMLImageElement = (
  imgSrc: ImageURL,
  id: Id,
  alt: string,
  className: string,
  onClick: HTMLElementClickMethod,
): HTMLImageElement => {
  const img = new Image();
  img.src = imgSrc;
  img.alt = alt;
  img.title = alt;
  img.id = id;
  img.className = className;
  img.onclick = onClick;

  return img;
};

export const compareArraysEquality = (
  originalBoard: PairIDAndUrl[],
  modifiedBoard: PairIDAndUrlWithEmptySlot[],
): boolean => {
  return originalBoard.every((item, index) => item === modifiedBoard[index]);
};

export const createSlots = (width: number, height: number): Id[] => {
  return (
    Array(width * height - 1)
      .fill(0)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_) => uniqueId())
  );
};

export const puzzleImageRoutes: string[] = [
  part1,
  part2,
  part3,
  part4,
  part5,
  part6,
  part7,
  part8,
  part9,
  part10,
  part11,
  part12,
  part13,
  part14,
  part15,
];
