import React, {Component} from 'react';
import {connect} from 'react-redux';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import {Carousel} from 'modules';
import {fetchImages} from 'redux/modules';
import './App.css';

// add `faChevronRight` and `faChevronLeft` icon to be used app wide.
library.add(faChevronRight, faChevronLeft);

/**
 * React container component, gets data from redux store and passes to `Carousel` component.
 * @returns {JSX.Element}
 */
export class App extends Component {
  // state = {
  //   images: null,
  // };
  // async componentDidMount() {
  // const response = await (await fetch(
  //   'https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo'
  // )).json();
  // this.setState({
  //   images: response.hits,
  // });
  // }

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // redux action fetch images for carousel
    this.props.fetchImages();
  }
  render() {
    // const {images} = this.state;
    const {request = true, images = []} = this.props;
    return (
      <div className="App">
        <div className="header">
          <h1>Carousel Test</h1>
        </div>
        {request && <div>Loading carousel....</div>}
        {images.length && (
          <div>
            <Carousel items={images} />
          </div>
        )}
      </div>
    );
  }
}

App.defaultProps = {
  images: [],
};
App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      userImageURL: PropTypes.string.isRequired,
      user: PropTypes.string,
    })
  ).isRequired,
  request: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = ({carousel: {request, error, data}}) => ({
  request,
  error,
  images: data,
});

export default connect(
  mapStateToProps,
  {fetchImages}
)(App);

// export default App;
