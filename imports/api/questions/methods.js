import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Questions } from './questions';
import { isUserAdmin } from '../../helpers/Roles';

export const insert = new ValidatedMethod({
  name: 'questions.insert',
  validate: new SimpleSchema({
    title: { type: String },
    content: { type: String },
  }).validator(),
  run({ title, content }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Questions.insert({
      createdAt: new Date(),
      status: 'pending',
      userId: this.userId,
      title,
      content,
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'questions.remove',
  validate: new SimpleSchema({
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  }).validator(),
  run({ questionId }) {
    if (isUserAdmin(this.userId)) {
      Questions.remove(questionId);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
});

const DataSchema = new SimpleSchema({
  status: {
    type: String,
    optional: true,
  },
  title: {
    type: String,
    optional: true,
  },
  content: {
    type: String,
    optional: true,
  },
})

export const update = new ValidatedMethod({
  name: 'questions.update',
  validate: new SimpleSchema({
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    data: { type: DataSchema },
  }).validator(),
  run({ questionId, data }) {
    if (isUserAdmin(this.userId)) {
      Questions.update(questionId, { $set: data });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
});
