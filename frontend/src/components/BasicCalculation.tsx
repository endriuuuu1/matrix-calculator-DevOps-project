export default function BasicCalculation({
  addHandler,
  subHandler,
  multiplyHandler,
}: {
  addHandler: () => Promise<void>;
  subHandler: () => Promise<void>;
  multiplyHandler: () => Promise<void>;
}) {
  return (
    <div
      className="flex items-center justify-center
    gap-[2.4rem]"
    >
      <div
        className="bg-[#008000] p-[1.6rem]
      text-[1.6rem] font-bold text-white
      rounded-[0.8rem] transition-all duration-300
      hover:bg-black cursor-pointer"
        onClick={addHandler}
      >
        A + B
      </div>
      <div
        className="bg-[#008000] p-[1.6rem]
      text-[1.6rem] font-bold text-white
      rounded-[0.8rem] transition-all duration-300
      hover:bg-black cursor-pointer"
        onClick={subHandler}
      >
        A - B
      </div>
      <div
        className="bg-[#008000] p-[1.6rem]
      text-[1.6rem] font-bold text-white
      rounded-[0.8rem] transition-all duration-300
      hover:bg-black cursor-pointer"
        onClick={multiplyHandler}
      >
        AB
      </div>
    </div>
  );
}
