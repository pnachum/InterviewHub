import { Meteor } from 'meteor/meteor';
import { isUserAdmin } from '../../../helpers/Roles';
import { Issues } from '../issues';

if (Meteor.isServer) {
  Meteor.publish('issues', function allIssues() {
    if (isUserAdmin(this.userId)) {
      return Issues.find({});
    } else {
      return this.ready();
    }
  });
}
