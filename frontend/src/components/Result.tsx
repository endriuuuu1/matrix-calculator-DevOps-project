function Result({
  result,
  copyToAHandler,
  copyToBHandler,
}: {
  result: any;
  copyToAHandler: () => void;
  copyToBHandler: () => void;
}) {
  if (!result) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <p className="text-gray-600">
          No results yet. Perform a calculation to see results.
        </p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="text-[1.6rem] font-[500] text-center p-8 bg-red-100 rounded-lg">
        <p className="text-red-600">Error: {result.error}</p>
      </div>
    );
  }

  if (result.operation === "Determinant") {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <h3 className="text-[2.4rem] font-bold mb-4">
          Result - {result.operation}
        </h3>
        <h1
          className="mr-[2.4rem] text-[2.4rem] font-bold
        flex items-center gap-[0.8rem]"
        >
          {result.matrix_used === "matrix_a" ? "A" : "B"} =
          <p className="text-3xl font-bold">{result.result}</p>
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div
        className="text-center p-8 bg-white rounded-lg shadow max-w-full overflow-x-auto
      flex flex-col"
      >
        <h3 className="text-[2.4rem] font-bold mb-4">
          Result - {result.operation}
        </h3>
        <div className="inline-flex items-center font-mono text-lg">
          {result.matrix_used === "matrix_a" && (
            <h1 className="mr-[2.4rem] text-[2.4rem] font-bold">A =</h1>
          )}
          {result.matrix_used === "matrix_b" && (
            <h1 className="mr-[2.4rem] text-[2.4rem] font-bold">B =</h1>
          )}
          {result.matrix_used === "A+B" && (
            <h1 className="mr-[2.4rem] text-[2.4rem] font-bold">A+B=</h1>
          )}
          {result.matrix_used === "A-B" && (
            <h1 className="mr-[2.4rem] text-[2.4rem] font-bold">A-B=</h1>
          )}
          {result.matrix_used === "AB" && (
            <h1 className="mr-[2.4rem] text-[2.4rem] font-bold">AB=</h1>
          )}
          <div
            className="relative mr-4"
            style={{
              width: "8px",
              height: `${result.result.length * 3 + 2}rem`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>
          </div>

          <div
            className="flex flex-col gap-[1.6rem] py-4
          text-[1.6rem] font-[600]
          pl-[1.5rem]"
          >
            {result.result.map((row: number[], rowIndex: number) => (
              <div
                key={rowIndex}
                className="grid gap-[1.6rem] text-left"
                style={{ gridTemplateColumns: `repeat(${row.length}, auto)` }}
              >
                {row.map((cell: number, colIndex: number) => (
                  <span key={colIndex} className="min-w-[4rem]">
                    {Number.isInteger(cell) ? cell : cell.toFixed(3)}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div
            className="relative"
            style={{
              width: "8px",
              height: `${result.result.length * 3 + 2}rem`,
            }}
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-black"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-black"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-black"></div>
          </div>
        </div>
        <div
          className="flex items-center justify-center
          gap-[2.4rem]
          mt-[2.4rem]"
        >
          <button
            className="bg-[#0000FF] p-[0.6rem]
              text-[1.3rem] font-bold text-white
              rounded-[0.8rem] transition-all duration-300
              hover:bg-black cursor-pointer"
            onClick={copyToAHandler}
          >
            Copy to A
          </button>
          <button
            className="bg-[#0000FF] p-[0.6rem]
            text-[1.3rem] font-bold text-white
            rounded-[0.8rem] transition-all duration-300
            hover:bg-black cursor-pointer"
            onClick={copyToBHandler}
          >
            Copy to B
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
