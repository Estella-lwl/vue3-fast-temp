import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * 时间格式化
 * @param utcTime UTC格式的时间
 * @param format 目标格式
 * @returns 格式化后的时间
 */
export function utcDateFormat(utcTime, format) {
  console.log("utcTime1: ", utcTime);
  console.log("utcTime2: ", format);
  console.log("utcTime3: ", dayjs.utc(utcTime).utcOffset(8).format(format));

  return dayjs.utc(utcTime).utcOffset(8).format(format);
}
