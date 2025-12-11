const MAX_SIZE = 10;
export function addRow(
  matrix: any[][],
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) {
  if (matrix.length >= MAX_SIZE) return;
  setMatrix((prev) => [...prev, Array(prev[0].length).fill("")]);
}

export function addColumn(
  matrix: any[][],
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) {
  if (matrix[0].length >= MAX_SIZE) return;
  setMatrix((prev) => prev.map((row) => [...row, ""]));
}

export function removeRow(
  matrix: any[][],
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) {
  if (matrix.length <= 1) return;
  setMatrix((prev) => prev.slice(0, -1));
}

export function removeColumn(
  matrix: any[][],
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) {
  if (matrix[0].length <= 1) return;
  setMatrix((prev) => prev.map((row) => row.slice(0, -1)));
}

export function updateCell(
  matrix: any[][],
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>,
  r: number,
  c: number,
  value: number
) {
  const newMatrix = matrix.map((row, ri) =>
    row.map((cell, ci) => (ri === r && ci === c ? value : cell))
  );
  setMatrix(newMatrix);
}

export function setRowManual(
  matrix: any[][],
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>,
  newRowCount: number
) {
  const count = Math.max(1, Math.min(MAX_SIZE, newRowCount)); // 1-დან MAX_SIZE-მდე
  const currentCols = matrix[0].length;

  if (count > matrix.length) {
    const rowsToAdd = count - matrix.length;
    const newRows = Array.from({ length: rowsToAdd }, () =>
      Array(currentCols).fill("")
    );
    setMatrix((prev) => [...prev, ...newRows]);
  } else if (count < matrix.length) {
    setMatrix((prev) => prev.slice(0, count));
  }
}

export function setColumnManual(
  matrix: any[][],
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>,
  newColCount: number
) {
  const count = Math.max(1, Math.min(MAX_SIZE, newColCount)); // 1-დან MAX_SIZE-მდე
  const currentCols = matrix[0].length;

  if (count > currentCols) {
    const colsToAdd = count - currentCols;
    setMatrix((prev) =>
      prev.map((row) => [...row, ...Array(colsToAdd).fill("")])
    );
  } else if (count < currentCols) {
    setMatrix((prev) => prev.map((row) => row.slice(0, count)));
  }
}

export const clearHandler = (
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) => {
  setMatrix((prev) =>
    Array(prev.length)
      .fill(null)
      .map(() => Array(prev[0].length).fill(""))
  );
};

export const allZeroHandler = (
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) => {
  setMatrix((prev) =>
    Array(prev.length)
      .fill("0")
      .map(() => Array(prev[0].length).fill("0"))
  );
};

export const allOneHandler = (
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) => {
  setMatrix((prev) =>
    Array(prev.length)
      .fill("1")
      .map(() => Array(prev[0].length).fill("1"))
  );
};

export const randomHandler = (
  setMatrix: React.Dispatch<React.SetStateAction<any[][]>>
) => {
  setMatrix((prev) =>
    Array(prev.length)
      .fill(null)
      .map(() =>
        Array(prev[0].length)
          .fill(null)
          .map(() => (Math.random() * MAX_SIZE).toFixed(0))
      )
  );
};
