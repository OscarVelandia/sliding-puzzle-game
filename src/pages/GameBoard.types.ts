type ID = string;

type ImageURL = string;

type PairIDAndUrl = [ID, ImageURL];

type PairIDAndUrlWithEmptySlot = [ID, ImageURL | undefined];
