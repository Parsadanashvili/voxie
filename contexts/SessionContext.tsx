import React, { createContext } from "react";
import { SessionContextValue } from "../types";

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);
