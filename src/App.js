import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Weather from './Weather';
import './App.css';


class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      cityData: { display_name: 'Choose Your City', lat: 'East/West Coordinates', lon: 'North/South Coordinates' },
      cityName: '',
      latitude: '',
      longitude: '',
      isMapOpen: false,
      error: false,
      errorMessage: '',
      weatherDataState: '',
    }
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let LocationIQToken = process.env.REACT_APP_LOCATIONIQ_API_KEY;

      // Axios action happens here
      let myData = await axios.get(`https://us1.locationiq.com/v1/search?key=${LocationIQToken}&q=${this.state.cityName}&format=json`)
      this.setState({
        cityData: myData.data[0],
        latitude: this.state.cityData.lat,
        longitude: this.state.cityData.lon,
        isMapOpen: true
      }, this.handleWeather)
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `Error: ${error.response.status}`
      })
    }

  }


  handleChange = (e) => {
    this.setState
      ({
        cityName: e.target.value,
      })
  }

  handleWeather = async () => {
    let weatherURL = `http://localhost:3001/weather?searchQuery=${this.state.cityName}`
    console.log(weatherURL);
    let weatherData = await axios.get(weatherURL);
    this.setState({
      weatherDataState: weatherData
    })
    console.log(weatherData);
  }


  render() {
    
    
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label for="cityName">Select City</Form.Label>
          <Form.Control id="cityName" type="text" onChange={this.handleChange}></Form.Control>
          <Button type='submit'>Explore!</Button>
        </Form>

        {this.state.weatherDataState
          &&
          this.state.weatherDataState.data.map(eachDay => {
            //  return <p>{eachDay.date} - {eachDay.description}</p>
            return <Weather eachDay={eachDay}
            cityName={this.state.cityName} />
          })
        } 
        <Image 
        src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`}>

        </Image>
        </>



    );

  }
}

export default App;