import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const RoutingProvider: FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
