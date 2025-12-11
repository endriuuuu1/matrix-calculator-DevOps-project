import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Matrix from "./components/Matrix";
import BasicCalculation from "./components/BasicCalculation";
import Result from "./components/Result";

function App() {
  const [matrixA, setMatrixA] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );
  const [matrixB, setMatrixB] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );
  const [result, setResult] = useState<any>(null);

  const transposeHandler = async () => {
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
      setResult(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const determinantHandler = async () => {
    const matrix_a = matrixA.map((row) => row.map(Number));
    const matrix_b = matrixB.map((row) => row.map(Number));
    try {
      const res = await fetch("http://127.0.0.1:5000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "determinant",
          matrix_a,
          matrix_b,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const inverseHandler = async () => {
    const matrix_a = matrixA.map((row) => row.map(Number));
    const matrix_b = matrixB.map((row) => row.map(Number));
    try {
      const res = await fetch("http://127.0.0.1:5000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "inverse",
          matrix_a,
          matrix_b,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center
    justify-center min-h-screen
    gap-[2.4rem] pb-[2.4rem]"
    >
      <Header />
      <div
        className="flex flex-col px-[1.6rem]
        xl:flex-row items-center gap-[2.4rem]
      "
      >
        <Matrix
          title="Matrix A"
          matrix={matrixA}
          setMatrix={setMatrixA}
          transposeHandler={transposeHandler}
          determinantHandler={determinantHandler}
          inverseHandler={inverseHandler}
        />
        <Matrix
          title="Matrix B"
          matrix={matrixB}
          setMatrix={setMatrixB}
          transposeHandler={transposeHandler}
          determinantHandler={determinantHandler}
          inverseHandler={inverseHandler}
        />
      </div>
      <BasicCalculation />
      <Result result={result} />
    </div>
  );
}

export default App;
