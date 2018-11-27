import React, { Component } from 'react'
import './Timer.css'

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            seconds: 0,
            timer: null,
            type: this.props.type
        }
    }

    componentDidMount = () => {
        let timer = setInterval(this.tick, 1000);
        this.setState({
            timer
        });

        switch (this.state.type) {
            case 'minutes':
            this.setState({
                count: this.props.time*60
            })
            break;
            case 'seconds':
            this.setState({
                count: this.props.time
            })
            break;
            default:
            this.setState({
                count: this.props.time
            })
        }
    }
    componentWillUnmount = () => {
        clearInterval(this.state.timer);
    }
    tick = () => {
        if(this.state.count >0){
        this.setState({
            count: this.state.count - 1
        });
if(this.state.seconds>0){
    this.setState({
        seconds: this.state.seconds - 1
    });
}else{
    this.setState({
        seconds: 59
    });
}

    }else{
       console.log('el tiempo se ha acabado')
       clearInterval(this.state.timer); 
    }
    }

  render() {
      let minutes = Math.floor(this.state.count/60);
      let seconds = this.state.seconds
    return (
      <div>
          <h1>{minutes>=10?minutes:"0"+minutes}:{seconds>=10?seconds:"0"+seconds}</h1>
          <p>{this.state.count}</p>
        
      </div>
    )
  }
}
