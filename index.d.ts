import * as React from 'react';

export interface ScrollObserverProps {
  /** Called when the observer scrolls into view while `loadMore` is true. */
  callback?: () => void;
  /** Set to false to stop `callback` firing, e.g. when there is nothing left to load. */
  loadMore?: boolean;
  /** Scroll container to observe against. Defaults to the browser viewport. */
  root?: Element | null;
  /** Margin around the root, in CSS margin syntax. Defaults to `"0px"`. */
  rootMargin?: string;
  /** Visibility ratios that trigger a check. Defaults to `[0.1, 0.5, 1.0]`. */
  threshold?: number | number[];
  className?: string;
  style?: React.CSSProperties;
  /**
   * When this value changes, the observer checks again and fires `callback`
   * if it is still on screen. Pass something that changes after each load,
   * such as the number of loaded items.
   */
  recheckKey?: unknown;
}

export default class ScrollObserver extends React.Component<ScrollObserverProps> {}
