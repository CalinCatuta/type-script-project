import { useEffect, useState } from "react";
import "./App.css";
import hole from "./image/hole.png";
import mole from "./image/mole.png";
function App() {
  const [score, setScore] = useState<number>(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  const showMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  };

  const wackMole = (index: number) => {
    if (!moles[index]) return;
    showMoleVisibility(index, false);
    setScore((score) => score + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      showMoleVisibility(randomIndex, true);
      setTimeout(() => {
        showMoleVisibility(randomIndex, false);
      }, 700);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  return (
    <div>
      <h1>Score {score}</h1>
      <div className="grid">
        {moles.map((isMole, idx) => (
          <img
            key={idx}
            onClick={() => wackMole(idx)}
            src={isMole ? mole : hole}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
