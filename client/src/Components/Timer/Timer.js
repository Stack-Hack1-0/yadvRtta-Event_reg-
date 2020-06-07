import React, { Component } from "react";
class Timer extends Component {
  getTime = () => {
    let time =
      new Date("jun 9, 2020 15:00:00").getTime() - new Date().getTime();
    const hr = Math.floor(time / (3600 * 1000));
    time = time % (3600 * 1000);
    const min = Math.floor(time / (60 * 1000));
    time = time % (60 * 1000);
    const sec = Math.floor(time / 1000);
    return { hours: hr, minutes: min, seconds: sec };
  };
  constructor(props) {
    super(props);
    let timeObj = this.getTime();
    this.state = {
      hours: timeObj.hours,
      minutes: timeObj.minutes,
      seconds: timeObj.seconds,
    };
  }

  componentDidMount() {
    const timeObj = this.getTime();
    this.setState({
      hours: timeObj.hours,
      minutes: timeObj.minutes,
      seconds: timeObj.seconds,
    });
    this.myInterval = setInterval(() => {
      const { seconds, minutes, hours } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(this.myInterval);
          } else {
            this.setState(({ hours }) => ({
              hours: hours - 1,
              minutes: 59,
              seconds: 59,
            }));
          }
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { hours, minutes, seconds } = this.state;
    return (
      <div>
        {hours === 0 && minutes === 0 && seconds === 0 ? (
          <h1>Time Up!!!!</h1>
        ) : (
          <h1 style={{ color: "#cdeafa" }}>
            Registration Ends In :{" "}
            <div>
              {hours}hr :{minutes < 10 ? `0${minutes}` : minutes}min :
              {seconds < 10 ? `0${seconds}` : seconds}sec
            </div>
          </h1>
        )}
      </div>
    );
  }
}
export default Timer;
