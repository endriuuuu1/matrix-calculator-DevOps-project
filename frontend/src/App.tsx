import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Matrix from "./components/Matrix";

function App() {
  const [matrixA, setMatrixA] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );
  const [matrixB, setMatrixB] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );

  const sendToBackend = async () => {
    const matrix_a = matrixA.map((row) => row.map(Number));
    const matrix_b = matrixB.map((row) => row.map(Number));
    try {
      const res = await fetch("http://127.0.0.1:5000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "transpose",
          matrix_a,
          matrix_b,
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
        <Matrix title="Matrix A" matrix={matrixA} setMatrix={setMatrixA} />
        <Matrix title="Matrix B" matrix={matrixB} setMatrix={setMatrixB} />
      </div>
      <button onClick={sendToBackend}>SEND</button>
    </div>
  );
}

export default App;
