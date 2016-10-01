// @flow

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Solutions } from './solutions';
import { isUserAdmin, canEditSolution } from '../../helpers/Roles';

export const insert = new ValidatedMethod({
  name: 'solutions.insert',
  validate: new SimpleSchema({
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    content: { type: String },
  }).validator(),
  run({ questionId, content }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Solutions.insert({
      createdAt: new Date(),
      userId: this.userId,
      questionId,
      content,
    });
  },
});

export const update = new ValidatedMethod({
  name: 'solutions.update',
  validate: new SimpleSchema({
    solutionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    newContent: { type: String },
  }).validator(),
  run({ solutionId, userId, newContent }) {
    if (canEditSolution(this.userId, userId)) {
      Solutions.update(solutionId, { $set: { content: newContent } });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  }
});
