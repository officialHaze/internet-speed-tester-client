import React, { useEffect, useState } from "react";
import "./App.css";
import speedTest from "./api/speedTest";
import checkLatency from "./api/checkLatency";

function App() {
  const [latency, setLatency] = useState<number>(0);

  useEffect(() => {
    // Get the latency
    checkLatency()
      .then(latency => {
        setLatency(latency);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // Handle the click event
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    speedTest(latency, "test1");
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Speed test</button>
    </div>
  );
}

export default App;

