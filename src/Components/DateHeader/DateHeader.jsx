const DateHeader = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <p className="text-[11px] md:text-sm lg:text-xl font-semibold items-end text-end text-[#232323] mt-1 md:mt-0">
      {dayName}, {monthDay}
    </p>
  );
};

export default DateHeader;
