import Buttons from "./Buttons";
import Input from "./Input";
import Row_Column from "./Row_Column";

export default function Matrix({
  title,
  matrix,
  setMatrix,
}: {
  title: string;
  matrix: any[][];
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>;
}) {
  const MAX_SIZE = 10;

  function addRow() {
    if (matrix.length >= MAX_SIZE) return;
    setMatrix((prev) => [...prev, Array(prev[0].length).fill(0)]);
  }

  function addColumn() {
    if (matrix[0].length >= MAX_SIZE) return;
    setMatrix((prev) => prev.map((row) => [...row, 0]));
  }

  function removeRow() {
    if (matrix.length <= 1) return;
    setMatrix((prev) => prev.slice(0, -1));
  }

  function removeColumn() {
    if (matrix[0].length <= 1) return;
    setMatrix((prev) => prev.map((row) => row.slice(0, -1)));
  }

  function updateCell(r: number, c: number, value: number) {
    const newMatrix = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? value : cell))
    );
    setMatrix(newMatrix);
  }

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
            onIncrease={addRow}
            onDecrease={removeRow}
            lenght={matrix.length}
          />
          <p className="text-[2.4rem] font-bold">X</p>
          <Row_Column
            type={"Column"}
            onIncrease={addColumn}
            onDecrease={removeColumn}
            lenght={matrix[0].length}
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
                onChange={(v) => updateCell(r, c, v)}
              />
            ))
          )}
        </div>
      </div>
      <Buttons />
    </div>
  );
}
