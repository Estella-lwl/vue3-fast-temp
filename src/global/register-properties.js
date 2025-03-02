import { utcDateFormat } from "@/utils/dateFormat";

export default function registerProperties(app) {
  app.config.globalProperties.$filters = {
    timeFormat(value) {
      return utcDateFormat(value);
    }
  };
}
