export default function Buttons() {
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
        <button
          className="p-[0.5rem] bg-black text-white
        rounded-[0.8rem] text-[1.6rem]
        cursor-pointer"
        >
          {b}
        </button>
      ))}
    </div>
  );
}
