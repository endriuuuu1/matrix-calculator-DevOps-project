export default function Input({
  value,
  onChange,
}: {
  value: string | number;
  onChange: (val: any) => void;
}) {
  return (
    <input
      type="number"
      className="border p-2 rounded outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
      [&::-webkit-inner-spin-button]:appearance-none
      text-[1.3rem]"
      value={value}
      placeholder=""
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
