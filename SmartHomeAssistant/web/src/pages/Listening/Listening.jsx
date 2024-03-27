import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./Listening.css";

const Listening = () => {
  const requestRef = useRef();
  const dataArray = useRef([]);

  const [heights, setHeights] = useState([]);

  const interpolate = useCallback((data, easing = easeInOutSine) => {
    // since the low-end data is more step-ish, we would just need to process this part, like 3/4 of the data
    let halfwayPoint = Math.floor(data.length / 4);
    let firstHalf = data.slice(0, halfwayPoint * 3);
    let secondHalf = data.slice(halfwayPoint * 3);

    let output = [];
    let group = [firstHalf[0]];

    for (let i = 1; i < firstHalf.length; i++) {
      if (firstHalf[i] !== group[0]) {
        // if all elements in the group equal 0, add them to the output array
        if (group[0] === 0) {
          output.push(...group);
        } else {
          // calculate the step according the count of same-number elements
          let step = 1 / group.length;
          let difference = firstHalf[i] - group[0];

          // copulate the output array
          for (let j = 0; j < group.length; j++) {
            // Apply the easing function to the interpolated value
            let value = group[0] + difference * easing(step * j);
            output.push(value);
          }
        }

        group = [firstHalf[i]]; // Reset the group
      } else {
        group.push(firstHalf[i]);
      }
    }

    // process the final group
    for (let j = 0; j < group.length; j++) {
      let value = group[0];
      output.push(value);
    }

    // combine the processed first half and the original second half
    return [...output, ...secondHalf];
  }, []);

  const animate = useCallback(
    (analyser, dataArray) => {
      const minBarHeight = window.innerWidth / dataArray.length - 1;

      analyser.getByteFrequencyData(dataArray);
      setHeights(() =>
        interpolate(logScale(dataArray)).map((height) =>
          Math.max(height, minBarHeight)
        )
      );

      requestRef.current = requestAnimationFrame(() =>
        animate(analyser, dataArray)
      );
    },
    [interpolate]
  );

  const logScale = (data) => {
    let temp = [];
    let length = data.length;
    let maxLog = Math.log(length);
    let step = maxLog / length;

    for (let i = 0; i < length; i++) {
      let dataIndex = Math.floor(Math.exp(step * i));
      temp.push(data[dataIndex]);
    }

    return temp;
  };

  const easeInOutSine = (x) => {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  };

  useEffect(() => {
    const audioContext = new window.AudioContext();

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        const audioSource = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.88;
        analyser.fftSize = 1024;

        audioSource.connect(analyser);

        dataArray.current = new Uint8Array(analyser.frequencyBinCount);

        requestRef.current = requestAnimationFrame(() =>
          animate(analyser, dataArray.current)
        );
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <div>
      <div className="Listening__audio-visualizer">
        {heights.map((height, i) => (
          <div
            key={i}
            className="Listening__audio-bar"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      <h1>Listening</h1>
      <Link to="/response">Response</Link>
    </div>
  );
};

export default Listening;
