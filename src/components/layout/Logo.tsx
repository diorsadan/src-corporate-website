export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-[#059669] rounded-md flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-lg tracking-tight">SRC</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-semibold text-gray-900">Sarangani</span>
        <span className="text-xs font-semibold text-[#059669]">Resources</span>
      </div>
    </div>
  );
}
