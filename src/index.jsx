import React, { Component } from 'react'

class ScrollObserver extends Component {    
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    if (this.cmpRef.current){
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting){
            this.onIntersecting()
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0.1, 0.5, 1.0]
        }
      )
      this.observer.observe(this.cmpRef.current);
    }
  }

  componentWillUnmount = () => {
    this.observer.disconnect();
  }

  onIntersecting = () => {
    if (this.props.loadMore){
      if (this.props.onLoadMore){
        this.props.callback();
      }
    }
  }

  render() {
    return (
      <div ref={this.cmpRef} />
    )
  }
}

export default ScrollObserver;