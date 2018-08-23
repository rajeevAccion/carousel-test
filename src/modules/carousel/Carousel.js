import React, {Component, Fragment} from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import Slide from './Slide';
import scrollTo from './animate';
import './Carousel.css';

/**
 * React class component for carousel. Handles carousel  prev/next button click.
 * @returns {JSX.Element}
 */
class Carousel extends Component {
  carouselViewport = React.createRef();

  // initialize state for carousel
  state = {
    numOfSlidesToScroll: 4,
  };

  /**
   * handles left/right arrow key press to move item in carousel
   */
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

  /**
   * execute on window resize to reset no. of slides
   */
  onWindowResize = () => {
    this.checkNoOfSlideToScroll();
  };

  /**
   * initial setup for carousel item and register event handler for `resize` and `keydown`
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.checkNoOfSlideToScroll();
    window.addEventListener('resize', throttle(this.onWindowResize, 500));
    window.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Removed register handlers on component unmount lifecycle.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.onWindowResize, 500));
    window.removeEventListener('keydown', this.onKeyDown);
  }

  /**
   * reset no. of slide to scroll on window resize event and component mount
   */
  checkNoOfSlideToScroll = () => {
    let numOfSlidesToScroll;
    if (window.innerWidth >= 321) {
      numOfSlidesToScroll = 'full';
    } else {
      numOfSlidesToScroll = 1;
    }
    if (this.state.numOfSlidesToScroll !== numOfSlidesToScroll) {
      this.setState({
        numOfSlidesToScroll,
      });
    }
  };

  /**
   * calculates total width to slide and transition timing.
   * @returns {object} - widthToScroll and timeToScroll
   */
  widthAndTimeToScroll = () => {
    const carouselViewport = this.carouselViewport.current;
    const {
      items: {length: len},
    } = this.props;

    const {numOfSlidesToScroll} = this.state;
    if (numOfSlidesToScroll === 'full') {
      return {
        widthToScroll: carouselViewport.offsetWidth,
        timeToScroll: 400,
      };
    } else {
      const slideWidth = carouselViewport.scrollWidth / len + 5;
      const timeToScrollOneSlide = 200;
      return {
        widthToScroll: numOfSlidesToScroll * slideWidth,
        timeToScroll: Math.min(timeToScrollOneSlide * numOfSlidesToScroll, 400),
      };
    }
  };

  /**
   * handle prev button click event which call `scrollTo` utility method to scroll with animation
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
   * handle next button click event which call `scrollTo` utility method to scroll with animation
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
        <div
          className="carousel-conatainer"
          role="slider"
          data-test="carousel-container">
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

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      userImageURL: PropTypes.string.isRequired,
      user: PropTypes.string,
    })
  ).isRequired,
};

export default Carousel;
