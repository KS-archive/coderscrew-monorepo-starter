export const createStrictIdentity =
  <Data>() =>
  (data: Data): Data =>
    data;

export const createExtendableIdentity =
  <DataToExtend>() =>
  <Data extends DataToExtend>(data: Data): Data =>
    data;
