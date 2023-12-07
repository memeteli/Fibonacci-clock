import './App.css';
import React from "react";
import { useState, useEffect } from 'react';

function App() {
  const [hour, setHour] = useState(new Date().getHours() > 12 ? 12 : new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes() > 55 ? 55 : new Date().getMinutes())
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  const MINUTE_MS = 1000; // 5 Minute

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [MINUTE_MS])

  const handleHourChange = (e) => {
    setHour(e.target.value)
  }

  const handleMinuteChange = (e) => {
    setMinute(e.target.value)
  }

  const implementTime = (e) => {
    e.preventDefault();

    //Here to prepare the arrays
    const fibonacciCubes = [1, 1, 2, 3, 5]
    const hourArray = calculateFibonacciArray(hour)
    const minuteArray = calculateFibonacciArray(minute / 5)

    //Remove the current colors
    var cube = document.getElementsByClassName('Cube');
    for (let i = 0; i < cube.length; i++) {
      cube[i].style.removeProperty('background-color')
    }

    //HERE IS THE FUNCTION FOR CALCULATION  
    for (let i = 0; i < fibonacciCubes.length; i++) {

      //Add logic for blue cube

      if (hourArray?.includes(fibonacciCubes[i])) {
        applyBackgroundColor(fibonacciCubes[i], "red");
      }

      // if (minuteArray?.includes(fibonacciCubes[i])) {
      //   applyBackgroundColor(fibonacciCubes[i], "green");
      // }
    }
  }

  function calculateFibonacciArray(value) {
    var tempValue = value
    const tempArray = [];
    if (value === 1) {
      return tempArray.push(1)
    }

    if (tempValue % 5 >= 0 && tempValue >= 5) {
      tempArray.push(5);
      tempValue = tempValue - 5;
    }

    if (tempValue % 3 >= 0 && tempValue >= 3) {
      tempArray.push(3);
      tempValue = tempValue - 3;
    }

    if (tempValue % 2 >= 0 && tempValue >= 2) {
      tempArray.push(2);
      tempValue = tempValue - 2;
    }

    if (tempValue === 1) {
      tempArray.push(1);
    }

    return tempArray
  }

  const applyBackgroundColor = (value, backgroundColor = "white") => {
    let element = "";

    if (value === 5) {
      element = document.getElementsByClassName('Cube-5');
      element[0].style.backgroundColor = backgroundColor;
    } else if (value === 3) {
      element = document.getElementsByClassName('Cube-3');
      element[0].style.backgroundColor = backgroundColor;
    } else if (value === 2) {
      element = document.getElementsByClassName('Cube-2');
      element[0].style.backgroundColor = backgroundColor;
    } else if (value === 1) {
      element = document.getElementsByClassName('Cube-1');
      element[0].style.backgroundColor = backgroundColor;
    } else if (value === '') {
      element = document.getElementsByClassName('Cube-1');
      if (element[0] === element[1]) {
        element[0].style.backgroundColor = backgroundColor;
        element[1].style.backgroundColor = backgroundColor;
      }
      element[0].style.backgroundColor = backgroundColor;
    }
  }


  return (
    <div className='App'>
      <h1>Fibonacci Uhr</h1>
      <div className='ClockContainer Flex-Row'>
        <div className='ContainerLeft Flex-Column'>
          <div className='ContainerLeftTop Flex-Row'>
            <div className='Cube Cube-2 Flex-Center'>
              2
            </div>
            <div className='ContainerTopRight Flex-Column'>
              <div className='Cube Cube-1 Flex-Center'>
                1
              </div>
              <div className='Cube Cube-1 Flex-Center'>
                1
              </div>
            </div>
          </div>
          <div className='Cube Cube-3 Flex-Center'>
            3
          </div>
        </div>
        <div className='Cube Cube-5 Flex-Center'>
          5
        </div>
      </div>

      <>
        <h3>currentTime: {currentTime}</h3>
      </>
      <form onSubmit={implementTime}>
        <input type='number' min="1" max="12" step="1" placeholder='Hour' value={hour} onChange={handleHourChange} />:
        <input type='number' min="5" max="55" step="5" placeholder='Minute' value={minute} onChange={handleMinuteChange} />
        <button type='submit' onSubmit={implementTime}>Calculate time</button>
      </form>
    </div >
  );
}

export default App;
