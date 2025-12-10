export default function Row_Column({
  type,
  onIncrease,
  onDecrease,
  lenght,
}: // onManualChange,
{
  type: string;
  onIncrease: () => void;
  onDecrease: () => void;
  lenght: number;
  // onManualChange: (newColCount: number) => void;
}) {
  return (
    <div
      className="flex flex-col bg-[#808080]/50 rounded-[0.8rem]
    p-[1.6rem] h-full
    border
    "
    >
      <p className="text-[1.6rem] font-[500]">{type}</p>
      <div className="flex items-center">
        <input
          className="border border-black rounded-[0.8rem]
          px-[1.6rem] text-[1.3rem] font-[500]
          w-full outline-none
          
        "
          type="number"
          value={lenght}
          // onChange={(e) => {
          //   const val = parseInt(e.target.value) || 1;
          //   onManualChange(val);
          // }}
        />
        <div className="flex">
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={type === "Row" ? onIncrease : onDecrease}
          >
            <g>
              <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z" />
              <polygon
                transform={`${
                  type === "Row" ? "rotate(180,12,12)" : "rotate(90,12,12)"
                }`}
                points="12 12.586 8.707 9.293 7.293 10.707 12 15.414 16.707 10.707 15.293 9.293 12 12.586"
              />
            </g>
          </svg>
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={type === "Row" ? onDecrease : onIncrease}
          >
            <g>
              <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z" />
              <polygon
                transform={`${type === "Column" ? "rotate(-90,12,12)" : ""}`}
                points="12 12.586 8.707 9.293 7.293 10.707 12 15.414 16.707 10.707 15.293 9.293 12 12.586"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
