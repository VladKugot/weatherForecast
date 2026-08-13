export const Header = () => {
  return (
    <div
      className="header w-wh sticky top-0 z-50 box-border flex h-20 flex-row
        items-center justify-between border-b-4 border-blue-600 bg-blue-200/50
        p-5 backdrop-blur-md"
    >
      <h1 className="text-xm sm:text-lg cursor-pointer text-blue-600 font-medium">
        Weather Forecast
      </h1>

      <ul className="flex flex-row items-center gap-6 list-none m-0 p-0">
        <li
          className="text-xs sm:text-base cursor-pointer text-slate-700 hover:text-blue-600
            font-medium transition-colors"
        >
          Головна
        </li>
        <li
          className="text-xs sm:text-base cursor-pointer text-slate-700 hover:text-blue-600
            font-medium transition-colors"
        >
          Прогноз
        </li>
        <li
          className="text-xs sm:text-base cursor-pointer text-slate-700 hover:text-blue-600
            font-medium transition-colors"
        >
          Карта
        </li>
        <li
          className="text-xs sm:text-base cursor-pointer text-slate-700 hover:text-blue-600
            font-medium transition-colors"
        >
          Налаштування
        </li>
      </ul>
    </div>
  );
};
