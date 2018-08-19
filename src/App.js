import React, {Component} from 'react';
import {connect} from 'react-redux';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import {Carousel} from 'modules';
import {fetchImages} from 'redux/modules';
import './App.css';

library.add(faChevronRight, faChevronLeft);

class App extends Component {
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

  componentDidMount() {
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
