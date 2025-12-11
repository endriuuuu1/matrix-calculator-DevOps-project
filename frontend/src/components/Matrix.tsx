import Buttons from "./Buttons";
import Input from "./Input";
import Row_Column from "./Row_Column";
import {
  addRow,
  addColumn,
  removeRow,
  removeColumn,
  updateCell,
  setRowManual as setRowManualUtil,
  setColumnManual as setColumnManualUtil,
  clearHandler,
  allZeroHandler,
  randomHandler,
  allOneHandler,
} from "../functions";

export default function Matrix({
  title,
  matrix,
  setMatrix,
}: {
  title: string;
  matrix: any[][];
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>;
}) {
  const setRowManual = (newRowCount: number) => {
    setRowManualUtil(matrix, setMatrix, newRowCount);
  };

  const setColumnManual = (newRowCount: number) => {
    setColumnManualUtil(matrix, setMatrix, newRowCount);
  };

  return (
    <div
      className="flex flex-col border-b border-l 
      border-r rounded-[0.8rem]
      max-w-[58rem] min-h-[37.5rem]
      justify-between
      
    "
    >
      <div className="flex flex-col">
        <div className="w-full bg-black p-[0.8rem] rounded-t-[0.8rem]">
          <h1 className="text-[2rem] font-bold text-white">{title} Input</h1>
        </div>
        <div
          className="flex items-center gap-[1.6rem]
        p-[1.6rem] max-w-[380px]
      "
        >
          <Row_Column
            type={"Row"}
            onIncrease={() => addRow(matrix, setMatrix)}
            onDecrease={() => removeRow(matrix, setMatrix)}
            lenght={matrix.length}
            onManualChange={setRowManual}
          />
          <p className="text-[2.4rem] font-bold">X</p>
          <Row_Column
            type={"Column"}
            onIncrease={() => addColumn(matrix, setMatrix)}
            onDecrease={() => removeColumn(matrix, setMatrix)}
            lenght={matrix[0].length}
            onManualChange={setColumnManual}
          />
        </div>
        <div
          className="grid gap-2
        p-[1.6rem]"
          style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 50px)` }}
        >
          {matrix.map((row, r) =>
            row.map((value, c) => (
              <Input
                key={`${r}-${c}`}
                value={value}
                onChange={(v) => updateCell(matrix, setMatrix, r, c, v)}
              />
            ))
          )}
        </div>
      </div>
      <Buttons
        clearHandler={() => clearHandler(setMatrix)}
        allZeroHandler={() => allZeroHandler(setMatrix)}
        randomHandler={() => randomHandler(setMatrix)}
        allOneHandler={() => allOneHandler(setMatrix)}
      />
    </div>
  );
}
