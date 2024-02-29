import dayjs, { Dayjs } from "dayjs";

export const isCurrentDateInRange = (
  startDate: string,
  endDate: string,
  date: Dayjs
) => {
  // Parse the start and end dates using dayjs
  const currentDate = date.startOf("M");
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs(new Date());

  // Check if the current date is within the range
  return currentDate.isBetween(start, end, "day", "[]");
};

export const calcDaysInMonth = (
  startDate: string,
  endDate: string,
  date: Dayjs
) => {
  // Parse the start date using dayjs
  const startJS = dayjs(startDate).add(1, "day");
  //set end
  const endJs = endDate ? dayjs(endDate) : dayjs(new Date());

  // Calculate the remaining days in the current month
  let remainDays = date.daysInMonth();

  if (startJS.format("MM-YYYY") === date.format("MM-YYYY")) {
    remainDays = remainDays - startJS.get("D");
  } else if (endJs.format("MM-YYYY") === date.format("MM-YYYY")) {
    remainDays = remainDays - (date.daysInMonth() - endJs.get("D"));
  }

  return remainDays;
};

export const calcRevenuePerDay = (date: Dayjs, MonthlyPrice: string) => {
  const res = parseInt(MonthlyPrice) / date.daysInMonth();
  return res;
};
