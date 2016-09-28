// @flow

export type Status = 'approved' | 'pending' | 'rejected';

export type Question = {
  _id: string,
  title: string,
  content: string,
  status: Status,
  userId: string,
  createdAt: Object,
};
