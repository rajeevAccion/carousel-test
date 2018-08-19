import React, {Component, Fragment} from 'react';
import throttle from 'lodash.throttle';

import Slide from './Slide';
import scrollTo from './animate';
import './Carousel.css';

class Carousel extends Component {
  // constructor(props) {
  //   super(props);
  //   this.carouselViewport = React.createRef();
  //   this.state = {
  //     numOfSlidesToScroll: 4,
  //   };
  // }

  carouselViewport = React.createRef();
  state = {
    numOfSlidesToScroll: 4,
  };
  onKeyDown = e => {
    const {keyCode} = e;
    const leftarrow = keyCode === 37;
    const rightarrow = keyCode === 39;
    if (leftarrow) {
      this.onPrevClickHanlder();
    } else if (rightarrow) {
      this.onNextClickHanlder();
    }
  };

  onWindowResize = () => {
    console.log('resizing');
    this.checkNoOfSlideToScroll();
  };
  componentDidMount() {
    this.checkNoOfSlideToScroll();
    window.addEventListener('resize', throttle(this.onWindowResize, 500));
    window.addEventListener('keydown', this.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.onWindowResize, 500));
    window.removeEventListener('keydown', this.onKeyDown);
  }
  checkNoOfSlideToScroll = () => {
    let numOfSlidesToScroll;
    if (window.innerWidth <= 900) {
      numOfSlidesToScroll = 'full';
    } else {
      numOfSlidesToScroll = 4;
    }
    if (this.state.numOfSlidesToScroll !== numOfSlidesToScroll) {
      this.setState({
        numOfSlidesToScroll,
      });
    }
  };
  widthAndTimeToScroll = () => {
    const carouselViewport = this.carouselViewport.current;
    const {numOfSlidesToScroll} = this.state;
    if (numOfSlidesToScroll === 'full') {
      return {
        widthToScroll: carouselViewport.offsetWidth,
        timeToScroll: 400,
      };
    } else {
      const slideWidth = 250;
      const timeToScrollOneSlide = 200;
      return {
        widthToScroll: numOfSlidesToScroll * slideWidth,
        timeToScroll: Math.min(timeToScrollOneSlide * numOfSlidesToScroll, 400),
      };
    }
  };
  onPrevClickHanlder = () => {
    const carouselViewport = this.carouselViewport.current;
    const {widthToScroll, timeToScroll} = this.widthAndTimeToScroll();

    // const {numOfSlidesToScroll} = this.state;
    // const slideWidth = 250;
    const newPosition = carouselViewport.scrollLeft - widthToScroll;
    // const timeToScrollOneSlide = 200;
    // const totalTimeToScroll = Math.min(
    //   timeToScrollOneSlide * numOfSlidesToScroll,
    //   500
    // );
    const params = {
      element: carouselViewport,
      to: newPosition,
      duration: timeToScroll,
      scrollDirection: 'scrollLeft',
    };
    scrollTo(params);
  };
  onNextClickHanlder = () => {
    const carouselViewport = this.carouselViewport.current;
    const {widthToScroll, timeToScroll} = this.widthAndTimeToScroll();
    // const {numOfSlidesToScroll} = this.state;
    // const slideWidth = 250;
    const newPosition = carouselViewport.scrollLeft + widthToScroll;
    // const timeToScrollOneSlide = 200;
    // const totalTimeToScroll = Math.min(
    //   timeToScrollOneSlide * numOfSlidesToScroll,
    //   500
    // );
    const params = {
      element: carouselViewport,
      to: newPosition,
      duration: timeToScroll,
      scrollDirection: 'scrollLeft',
    };
    scrollTo(params);
  };
  render() {
    const {items} = this.props;
    return (
      <Fragment>
        <div className="carousel-conatainer" role="slider">
          <button
            className="button leftround"
            onClick={this.onPrevClickHanlder}>
            prev
          </button>
          <div className="carousel-viewport" ref={this.carouselViewport}>
            {items && items.map(item => <Slide item={item} key={item.id} />)}
          </div>
          <button
            className="button rightround"
            onClick={this.onNextClickHanlder}>
            next
          </button>
        </div>
        <div className="footer">
          <button
            className="button leftround"
            onClick={this.onPrevClickHanlder}>
            prev
          </button>
          <button
            className="button rightround"
            onClick={this.onNextClickHanlder}>
            next
          </button>
        </div>
      </Fragment>
    );
  }
}

export default Carousel;
