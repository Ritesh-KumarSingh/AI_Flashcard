export default function XPDisplay() {
  const xp = 60;

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">XP Progress</h2>
      <div className="w-full bg-white/20 rounded-full h-4">
        <div
          className="bg-green-400 h-4 rounded-full transition-all"
          style={{ width: `${xp}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-200 mt-2">{xp} XP</p>
    </div>
  );
}