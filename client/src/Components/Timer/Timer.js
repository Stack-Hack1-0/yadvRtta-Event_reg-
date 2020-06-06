import React, { Component } from 'react'
class Timer extends Component {
    state = {
        hours:24,
        minutes: 0,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes ,hours } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if(seconds===0){
                this.setState (({minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
               if(seconds === 0){
                   if(minutes === 0){
                       if(hours === 0){
                           clearInterval(this.myInterval)
                       }
                       else{
                           this.setState (({hours}) => ({
                               hours: hours-1,
                               minutes: 59,
                               seconds: 59
                           }))
                       }
                   }
               }
    },1000)
}

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { hours,minutes, seconds } = this.state
        return (
            <div>
                { hours===0&&minutes === 0 && seconds === 0
                    ? <h1>Time Up!!!!</h1>
                : <h1>Time Remaining: {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}
export default Timer;