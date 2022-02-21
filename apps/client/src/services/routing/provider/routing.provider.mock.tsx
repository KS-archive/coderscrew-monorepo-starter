import type { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const RoutingProviderMock: FC = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
