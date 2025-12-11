export default function Buttons({
  clearHandler,
  allZeroHandler,
  randomHandler,
  allOneHandler,
}: {
  clearHandler: () => void;
  allZeroHandler: () => void;
  randomHandler: () => void;
  allOneHandler: () => void;
}) {
  const buttonsArray = [
    "Clear",
    "All 0",
    "All 1",
    "Random",
    "Transpose",
    "Determinant",
    "Inverse",
    "x",
  ];
  return (
    <div
      className="flex flex-wrap gap-[1.2rem] px-[1.6rem]
    pb-[1.6rem]"
    >
      {buttonsArray.map((b) => (
        <div
          key={b}
          className={`${
            b === "x" ? "bg-black rounded-[0.8rem] px-[0.6rem]" : "bg-none"
          }`}
        >
          <button
            className={`p-[0.5rem] text-white
        rounded-[0.8rem] text-[1.6rem]
        cursor-pointer
        ${b === "x" ? "bg-none" : "bg-black"}`}
            onClick={() => {
              if (b === "Clear") {
                clearHandler();
              } else if (b === "All 0") {
                allZeroHandler();
              } else if (b === "Random") {
                randomHandler();
              } else if (b === "All 1") {
                allOneHandler();
              }
            }}
          >
            {b}
          </button>
          {b === "x" && (
            <input
              type="number"
              className="border w-[3rem] h-[3rem]
            rounded-full [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none
            text-center text-[1.3rem] font-[500]
            border-2 outline-none bg-white"
            />
          )}
        </div>
      ))}
    </div>
  );
}
