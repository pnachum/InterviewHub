// @flow

export type User = {
  _id: string,
  emails: Array<{ address: string, verified: boolean }>,
};
