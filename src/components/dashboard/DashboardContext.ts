"use client";

import { DateTime } from "luxon";
import { createContext, useContext } from "react";

export const DashboardContext = createContext({ startDate: DateTime.now(), endDate: DateTime.now() });

export const useDashboardContext = () => useContext(DashboardContext);
