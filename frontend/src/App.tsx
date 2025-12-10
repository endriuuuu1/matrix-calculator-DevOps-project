import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Matrix from "./components/Matrix";

function App() {
  const [matrix_a, setMatrixA] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );
  const [matrix_b, setMatrixB] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );

  const stringToNumberA = matrix_a.map((row) => row.map(Number));
  const stringToNumberB = matrix_b.map((row) => row.map(Number));

  const sendToBackend = async () => {
    try {
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({
          operation: "transpose",
          stringToNumberA,
          stringToNumberB,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center
    justify-center min-h-screen
    gap-[2.4rem]"
    >
      <Header />
      <div
        className="flex flex-col px-[1.6rem]
        xl:flex-row items-center gap-[2.4rem]
      "
      >
        <Matrix title="Matrix A" matrix={matrix_a} setMatrix={setMatrixA} />
        <Matrix title="Matrix B" matrix={matrix_b} setMatrix={setMatrixB} />
      </div>
      <button onClick={sendToBackend}>SEND</button>
    </div>
  );
}

export default App;
