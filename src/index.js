import React, { Component } from 'react'

const DEFAULT_ROOT_MARGIN = '0px'
const DEFAULT_THRESHOLD = [0.1, 0.5, 1.0]

// Compare by value so an inline array like threshold={[0, 1]} doesn't
// rebuild the observer on every render.
const sameThreshold = (a, b) => String(a) === String(b)

class ScrollObserver extends Component {
  constructor(props) {
    super(props);
    this.cmpRef = React.createRef();
  }

  componentDidMount() {
    this.connect();
  }

  componentDidUpdate(prevProps) {
    const { root, rootMargin, threshold, recheckKey } = this.props;
    if (
      prevProps.root !== root ||
      prevProps.rootMargin !== rootMargin ||
      !sameThreshold(prevProps.threshold, threshold) ||
      prevProps.recheckKey !== recheckKey
    ) {
      // A new observer reports the element's current state, so the
      // callback fires again if it is still on screen.
      this.disconnect();
      this.connect();
    }
  }

  componentWillUnmount() {
    this.disconnect();
  }

  connect() {
    if (!this.cmpRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const {
      root = null,
      rootMargin = DEFAULT_ROOT_MARGIN,
      threshold = DEFAULT_THRESHOLD
    } = this.props;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting){
          this.onIntersecting()
        }
      },
      { root, rootMargin, threshold }
    )
    this.observer.observe(this.cmpRef.current);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  onIntersecting = () => {
    if (this.props.loadMore){
      if (this.props.callback){
        this.props.callback();
      }
    }
  }

  render() {
    const { className, style } = this.props;
    return (
      <div ref={this.cmpRef} className={className} style={style} />
    )
  }
}

export default ScrollObserver;
