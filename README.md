# Scroll Observer
[![NPM Version][npm-image]][npm-url]
[![Build Status][building-image]][scroll-url]
[![Downloads Stats][npm-downloads]][npm-url]


Turn any container into an infinite scroll container or fire a function when reaching a particular part of a web page.

This simple react component allows you convert any container into infinite scroll container by firing your callback function when it appears on screen, this same concept can be used to fire the same callback function when a it appears on screen without being an infinite scroll container.

## Installation

```sh
npm install @thisnamespace/scrollobserver --save
```

## Usage example

For example you have a list of 100's of rows but you only want to load 15 at a time, create you list with your rows and the 'ScrollObserver' after it when the 'ScrollObserver' appears on screen the callback function will fire. When all the items have been fetched set 'loadMore' to false and the callback will no longer fire when the observer appears on screen.

```jsx
import ScrollObserver from '@thisnamespace/scrollobserver';

<div>
    <ul>
        <li></li>
        ...
    </ul>
    <ScrollObserver callback={fetchMoreRows} loadMore={true} />
</div>
```

Works with React 16.8 and later, including 17, 18 and 19. TypeScript types are included.

## Props

Every prop is optional.

| Prop | Type | Default | What it does |
|---|---|---|---|
| `callback` | `() => void` | none | Called when the observer scrolls into view while `loadMore` is true. |
| `loadMore` | `boolean` | `false` | Set to `false` to stop the callback firing. |
| `rootMargin` | `string` | `"0px"` | Margin around the scroll container. `"200px"` fires the callback 200px before the observer is on screen. |
| `root` | `Element` or `null` | `null` | Scroll container to observe against. `null` is the browser viewport. |
| `threshold` | `number` or `number[]` | `[0.1, 0.5, 1.0]` | Passed to `IntersectionObserver`. |
| `className`, `style` | | none | Applied to the observer's `div`. |
| `recheckKey` | any | none | See below. |

`root`, `rootMargin` and `threshold` are the [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#options).

### Short pages and `recheckKey`

The callback fires when the observer scrolls into view. If a page of results is too short to push it back off screen, it never scrolls into view again and loading stops.

Pass `recheckKey` a value that changes after each load, such as the number of items. When it changes, the observer checks again and fires the callback if it is still on screen.

```jsx
<ScrollObserver
    callback={fetchMoreRows}
    loadMore={hasMore}
    recheckKey={rows.length}
/>
```

In browsers without `IntersectionObserver` the component renders and does nothing.

## Release History
* 0.1.0
    * Supports React 17, 18 and 19 as well as 16.8+
    * New optional props: `rootMargin`, `root`, `threshold`, `className`, `style`, `recheckKey`
    * TypeScript types
    * No longer throws on unmount, or in browsers without `IntersectionObserver`
    * Existing usage is unchanged
* 0.0.9
    * Last release on the original build tooling
* 0.0.1
    * Work in progress, initial commit

## Meta

Michael Day – [@thisnamespace](https://twitter.com/thisnamesapce) – info@thisnamespace.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/thisnamespace](https://github.com/thisnamespace/)

## Contributing

1. Fork it (<https://github.com/thisnamespace/ScrollObserver/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@thisnamespace/scrollobserver.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@thisnamespace/scrollobserver
[npm-downloads]: https://img.shields.io/npm/dm/@thisnamespace/scrollobserver.svg?style=flat-square
[building-image]: https://img.shields.io/github/actions/workflow/status/thisnamespace/ScrollObserver/ci.yml?branch=master&style=flat-square
[scroll-url]: https://github.com/thisnamespace/ScrollObserver
[wiki]: https://github.com/yourname/yourproject/wiki