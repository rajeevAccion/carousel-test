import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Carousel} from 'modules';
import './App.css';

class App extends Component {
  state = {
    images: null,
  };
  async componentDidMount() {
    const response = await (await fetch(
      'https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo'
    )).json();
    this.setState({
      images: response.hits,
    });
  }
  render() {
    const {images} = this.state;
    return (
      <div className="App">
        <div className="header">
          <h1>Carousel Test</h1>
        </div>
        <div>
          <Carousel items={images} />
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({});

// export default connect(
//   mapStateToProps,
//   {}
// )(App);

export default App;
