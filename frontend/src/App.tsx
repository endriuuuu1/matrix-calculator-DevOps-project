import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Matrix from "./components/Matrix";

function App() {
  const [matrixA, setMatrixA] = useState(
    Array.from({ length: 4 }, () => Array(4).fill("0"))
  );
  const [matrixB, setMatrixB] = useState(
    Array.from({ length: 4 }, () => Array(4).fill("0"))
  );

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
      <button>SEND</button>
    </div>
  );
}

export default App;
