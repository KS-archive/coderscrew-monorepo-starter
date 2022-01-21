export const getDescribeFor = (request: { path: string; method: string }) =>
  `${request.method.toUpperCase()} ${request.path}`;
