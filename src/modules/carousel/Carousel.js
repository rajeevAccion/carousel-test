import React, {Component, Fragment} from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Slide from './Slide';
import scrollTo from './animate';
import './Carousel.css';

class Carousel extends Component {
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
    if (window.innerWidth <= 768) {
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

  /**
   * handle prev button click event
   */
  onPrevClickHanlder = () => {
    const carouselViewport = this.carouselViewport.current;
    const {widthToScroll, timeToScroll} = this.widthAndTimeToScroll();
    const newPosition = carouselViewport.scrollLeft - widthToScroll;
    const params = {
      element: carouselViewport,
      to: newPosition,
      duration: timeToScroll,
      scrollDirection: 'scrollLeft',
    };
    scrollTo(params);
  };

  /**
   * handle next button click event
   */
  onNextClickHanlder = () => {
    const carouselViewport = this.carouselViewport.current;
    const {widthToScroll, timeToScroll} = this.widthAndTimeToScroll();
    const newPosition = carouselViewport.scrollLeft + widthToScroll;
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
    const navClasse = classNames({
      'carousel-nav': true,
    });
    const leftNavClasses = classNames(
      {
        'carousel-left-nav': true,
      },
      navClasse
    );
    const rightNavClasses = classNames(
      {
        'carousel-right-nav': true,
      },
      navClasse
    );
    return (
      <Fragment>
        <div className="carousel-conatainer" role="slider">
          <button className={leftNavClasses} onClick={this.onPrevClickHanlder}>
            <FontAwesomeIcon icon="chevron-left" className="control-icon" />
          </button>
          <div className="carousel-viewport" ref={this.carouselViewport}>
            {items && items.map(item => <Slide item={item} key={item.id} />)}
          </div>
          <button className={rightNavClasses} onClick={this.onNextClickHanlder}>
            <FontAwesomeIcon icon="chevron-right" className="control-icon" />
          </button>
        </div>
        <div className="carousel-action">
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
