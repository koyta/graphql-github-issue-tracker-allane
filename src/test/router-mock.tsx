// Mock for react-router-dom
import { ReactNode } from "react";

import { MemoryRouter } from "react-router-dom";

export const RouterMock = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);
