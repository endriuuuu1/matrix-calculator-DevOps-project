export default function BasicCalculation({
  addHandler,
  subHandler,
  multiplyHandler,
  swapHandler,
}: {
  addHandler: () => Promise<void>;
  subHandler: () => Promise<void>;
  multiplyHandler: () => Promise<void>;
  swapHandler: () => void;
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
      <div
        className="bg-[#008000] p-[1.6rem]
      text-[1.6rem] font-bold text-white
      rounded-[0.8rem] transition-all duration-300
      hover:bg-black cursor-pointer
      w-[56px] flex items-center
      h-[56px]"
        onClick={swapHandler}
      >
        <svg
          width="auto"
          height="auto"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 7.5L8 7.5M21 7.5L16.6667 3M21 7.5L16.6667 12"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 16.5L17 16.5M4 16.5L8.33333 21M4 16.5L8.33333 12"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
