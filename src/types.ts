// create a new type HTMLElementEvent that has a target of type you pass
// type T must be a HTMLElement (e.g. HTMLTextAreaElement extends HTMLElement)
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

type HTMLElementClickMethod = (ev: MouseEvent) => void;

type EventListenerOnClickMethod = () => void;
