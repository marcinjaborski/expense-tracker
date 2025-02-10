import { createContext, useContext } from "react";
import { DateTime } from "luxon";

export const DashboardContext = createContext<{ startDate: DateTime; endDate: DateTime; planned: boolean }>({
  startDate: DateTime.now(),
  endDate: DateTime.now(),
  planned: true,
});
const useDashboardContext = () => useContext(DashboardContext);
export default useDashboardContext;
