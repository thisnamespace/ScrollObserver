// Runs against the built index.js, which is the file npm users get.
const test = require('node:test');
const assert = require('node:assert');
const React = require('react');
const TestRenderer = require('react-test-renderer');
const ScrollObserver = require('../index.js').default;

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const act = React.act || TestRenderer.act;

let observers = [];

class FakeIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.targets = [];
    this.disconnected = false;
    observers.push(this);
  }
  observe(target) {
    this.targets.push(target);
  }
  disconnect() {
    this.disconnected = true;
  }
  fire(isIntersecting) {
    this.callback([{ isIntersecting }]);
  }
}

const element = (props) => React.createElement(ScrollObserver, props);

function mount(props) {
  let renderer;
  act(() => {
    renderer = TestRenderer.create(element(props), {
      createNodeMock: () => ({})
    });
  });
  return renderer;
}

function update(renderer, props) {
  act(() => {
    renderer.update(element(props));
  });
}

test.beforeEach(() => {
  observers = [];
  globalThis.IntersectionObserver = FakeIntersectionObserver;
});

test('observes with the original options when no props are given', () => {
  mount({});
  assert.strictEqual(observers.length, 1);
  assert.deepStrictEqual(observers[0].options, {
    root: null,
    rootMargin: '0px',
    threshold: [0.1, 0.5, 1.0]
  });
  assert.strictEqual(observers[0].targets.length, 1);
});

test('fires the callback only when intersecting and loadMore is set', () => {
  let calls = 0;
  const callback = () => calls++;
  const renderer = mount({ callback, loadMore: true });
  observers[0].fire(false);
  assert.strictEqual(calls, 0);
  observers[0].fire(true);
  assert.strictEqual(calls, 1);
  update(renderer, { callback, loadMore: false });
  observers[0].fire(true);
  assert.strictEqual(calls, 1);
});

test('does not throw when intersecting without a callback', () => {
  mount({ loadMore: true });
  observers[0].fire(true);
});

test('passes root, rootMargin and threshold to the observer', () => {
  const root = {};
  mount({ root, rootMargin: '200px', threshold: 0 });
  assert.strictEqual(observers[0].options.root, root);
  assert.strictEqual(observers[0].options.rootMargin, '200px');
  assert.strictEqual(observers[0].options.threshold, 0);
});

test('keeps the same observer across re-renders with equal options', () => {
  const renderer = mount({ threshold: [0, 1], loadMore: true });
  update(renderer, { threshold: [0, 1], loadMore: false });
  assert.strictEqual(observers.length, 1);
  assert.strictEqual(observers[0].disconnected, false);
});

test('reconnects when an observer option changes', () => {
  const renderer = mount({ rootMargin: '0px' });
  update(renderer, { rootMargin: '100px' });
  assert.strictEqual(observers.length, 2);
  assert.strictEqual(observers[0].disconnected, true);
  assert.strictEqual(observers[1].options.rootMargin, '100px');
});

test('checks again when recheckKey changes, and only then', () => {
  let calls = 0;
  const callback = () => calls++;
  const renderer = mount({ callback, loadMore: true, recheckKey: 15 });
  observers[0].fire(true);
  update(renderer, { callback, loadMore: true, recheckKey: 15 });
  assert.strictEqual(observers.length, 1);
  update(renderer, { callback, loadMore: true, recheckKey: 30 });
  assert.strictEqual(observers.length, 2);
  assert.strictEqual(observers[0].disconnected, true);
  observers[1].fire(true);
  assert.strictEqual(calls, 2);
});

test('disconnects on unmount', () => {
  const renderer = mount({});
  act(() => renderer.unmount());
  assert.strictEqual(observers[0].disconnected, true);
});

test('mounts and unmounts where IntersectionObserver is missing', () => {
  delete globalThis.IntersectionObserver;
  const renderer = mount({ loadMore: true });
  assert.strictEqual(observers.length, 0);
  act(() => renderer.unmount());
});

test('renders a bare div by default and applies className and style', () => {
  const bare = mount({}).toJSON();
  assert.strictEqual(bare.type, 'div');
  assert.strictEqual(bare.props.className, undefined);
  assert.strictEqual(bare.props.style, undefined);
  const styled = mount({ className: 'sentinel', style: { height: 1 } }).toJSON();
  assert.strictEqual(styled.props.className, 'sentinel');
  assert.deepStrictEqual(styled.props.style, { height: 1 });
});
