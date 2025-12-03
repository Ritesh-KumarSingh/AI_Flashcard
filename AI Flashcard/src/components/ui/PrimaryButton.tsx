type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "indigo" | "green" | "red";
};

export default function PrimaryButton({ children, onClick, color = "indigo" }: Props) {
  const base = "px-4 py-2 text-white rounded transition font-medium";
  const colors = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button onClick={onClick} className={`${base} ${colors[color]}`}>
      {children}
    </button>
  );
}