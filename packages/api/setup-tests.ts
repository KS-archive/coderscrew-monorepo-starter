import { serverTests } from './src/server';

const isServerMocked = process.env.MOCKED_SERVER === 'true';

beforeAll(() => {
  serverTests.beforeAll(isServerMocked);
});

beforeEach(() => {
  serverTests.beforeEach();
});

afterEach(() => {
  serverTests.afterEach(isServerMocked);
});

afterAll(() => {
  serverTests.afterAll(isServerMocked);
});
