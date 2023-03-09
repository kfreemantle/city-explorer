import React from "react";
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {

  render() {

    return (

      <Card style={{ width: '18rem' }}>
        <Card.Title>Date: {this.props.date}</Card.Title>'
        <Card.Text>Weather Description: {this.props.description}</Card.Text>

      </Card>
    )
  }
}

export default Weather;