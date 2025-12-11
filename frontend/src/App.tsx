import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Matrix from "./components/Matrix";
import BasicCalculation from "./components/BasicCalculation";
import Result from "./components/Result";
import {
  transposeHandler,
  determinantHandler,
  inverseHandler,
  scalarHandler,
  addHandler,
  subHandler,
  multiplyHandler,
} from "./functions";

function App() {
  const [matrixA, setMatrixA] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );
  const [matrixB, setMatrixB] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );
  const [result, setResult] = useState<any>(null);
  const [scalarNum, setScalarNum] = useState<string>("3");
  const matrixATitle = "Matrix A";
  const matrixBTitle = "Matrix B";

  const swapHandler = () => {
    const matrixACopy = matrixA.map((row) => [...row]);
    const matrixBCopy = matrixB.map((row) => [...row]);
    setMatrixA(matrixBCopy);
    setMatrixB(matrixACopy);
  };

  const copyToAHandler = () => {
    setMatrixA(result.result);
  };
  const copyToBHandler = () => {
    setMatrixB(result.result);
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
          title={matrixATitle}
          matrix={matrixA}
          setMatrix={setMatrixA}
          transposeHandler={() =>
            transposeHandler(matrixA, matrixB, setResult, matrixATitle)
          }
          determinantHandler={() =>
            determinantHandler(matrixA, matrixB, setResult, matrixATitle)
          }
          inverseHandler={() =>
            inverseHandler(matrixA, matrixB, setResult, matrixATitle)
          }
          scalarNum={scalarNum}
          setScalarNum={setScalarNum}
          scalarHandler={() =>
            scalarHandler(matrixA, matrixB, setResult, scalarNum, matrixATitle)
          }
        />
        <Matrix
          title={matrixBTitle}
          matrix={matrixB}
          setMatrix={setMatrixB}
          transposeHandler={() =>
            transposeHandler(matrixA, matrixB, setResult, matrixBTitle)
          }
          determinantHandler={() =>
            determinantHandler(matrixA, matrixB, setResult, matrixBTitle)
          }
          inverseHandler={() =>
            inverseHandler(matrixA, matrixB, setResult, matrixBTitle)
          }
          scalarNum={scalarNum}
          setScalarNum={setScalarNum}
          scalarHandler={() =>
            scalarHandler(matrixA, matrixB, setResult, scalarNum, matrixBTitle)
          }
        />
      </div>
      <BasicCalculation
        addHandler={() => addHandler(matrixA, matrixB, setResult)}
        subHandler={() => subHandler(matrixA, matrixB, setResult)}
        multiplyHandler={() => multiplyHandler(matrixA, matrixB, setResult)}
        swapHandler={swapHandler}
      />
      <Result
        result={result}
        copyToAHandler={copyToAHandler}
        copyToBHandler={copyToBHandler}
      />
    </div>
  );
}

export default App;
