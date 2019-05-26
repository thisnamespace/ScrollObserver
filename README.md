# Scroll Observer
<!-- [![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][scroll-url]
[![Downloads Stats][npm-downloads]][npm-url] -->


Turn any container into an infinite scroll container or fire a function when reaching a particular part of a web page.

This simple react component allows you convert any container into infinite scroll container by firing your callback function when it appears on screen, this same concept can be used to fire the same callback function when a it appears on screen without being an infinite scroll container.

## Installation

```sh
npm install @thisnamespace/scrollobserver --save
```

## Usage example

For example you have a list of 100's of rows but you only want to load 15 at a time, create you list with your rows and the 'ScrollObserver' after it when the 'ScrollObserver' appears on screen the callback function will fire. When all the items have been fetched set 'loadMore' to false and the callback will no longer fire when the observer appears on screen.

```sh
<div>
    <ul>
        <li></li>
        ...
    </ul>
    <ScrollObserver callback={()=>{fetch more rows}} loadMore={true} />
</div>
```

## Release History
* 0.1.0
    * The first proper release
* 0.0.1
    * Work in progress, initial commit

## Meta

Michael Day – [@thisnamespace](https://twitter.com/thisnamesapce) – info@thisnamespace.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/thisnamesapce](https://github.com/thisnamespace/)

## Contributing

1. Fork it (<https://github.com/thisnamesapce/scrollobserver/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@thisnamespace/scrollobserver
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[scroll-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki -->