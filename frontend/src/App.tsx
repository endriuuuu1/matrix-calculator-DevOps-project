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
          transposeHandler={() => transposeHandler(matrixA, matrixB, setResult)}
          determinantHandler={() =>
            determinantHandler(matrixA, matrixB, setResult)
          }
          inverseHandler={() => inverseHandler(matrixA, matrixB, setResult)}
          scalarNum={scalarNum}
          setScalarNum={setScalarNum}
          scalarHandler={() =>
            scalarHandler(matrixA, matrixB, setResult, scalarNum)
          }
        />
        <Matrix
          title="Matrix B"
          matrix={matrixB}
          setMatrix={setMatrixB}
          transposeHandler={() => transposeHandler(matrixA, matrixB, setResult)}
          determinantHandler={() =>
            determinantHandler(matrixA, matrixB, setResult)
          }
          inverseHandler={() => inverseHandler(matrixA, matrixB, setResult)}
          scalarNum={scalarNum}
          setScalarNum={setScalarNum}
          scalarHandler={() =>
            scalarHandler(matrixA, matrixB, setResult, scalarNum)
          }
        />
      </div>
      <BasicCalculation />
      <Result result={result} />
    </div>
  );
}

export default App;
