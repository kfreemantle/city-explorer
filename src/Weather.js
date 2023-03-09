import React from "react";
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {

  render() {

    return (

      <Card>
        <Card.Body>
        <Card.Title>City: {this.props.cityName}</Card.Title>
        <Card.Text>
        {this.props.eachDay.date} - {this.props.eachDay.description}
        </Card.Text>
        </Card.Body>
        
      </Card>
    )
  }
}

export default Weather;