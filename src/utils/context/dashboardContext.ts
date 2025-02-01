import { createContext, useContext } from "react";
import { DateTime } from "luxon";

export const DashboardContext = createContext({ startDate: DateTime.now(), endDate: DateTime.now() });
const useDashboardContext = () => useContext(DashboardContext);
export default useDashboardContext;
