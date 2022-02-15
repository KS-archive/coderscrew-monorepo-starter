import '@testing-library/jest-dom';

import { serverTests } from '@ccms/api/dist/server';

beforeAll(() => {
  serverTests.beforeAll();
});

beforeEach(() => {
  serverTests.beforeEach();
});

afterEach(() => {
  serverTests.afterEach();
});

afterAll(() => {
  serverTests.afterAll();
});
