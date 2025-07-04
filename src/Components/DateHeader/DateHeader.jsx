const DateHeader = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <p className="text-[12px] md:text-xl font-semibold items-end text-[#232323] mt-2 md:mt-0">
      Today • {dayName}, {monthDay}
    </p>
  );
};

export default DateHeader;
