// @flow

export function isUserAdmin(userId: ?string): boolean {
  // Shitty global refernce to alanning/meteor-roles
  return !!userId && Roles.userIsInRole(userId, ['admin']);
}
