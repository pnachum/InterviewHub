export function isUserAdmin(userId) {
  // Shitty global refernce to alanning/meteor-roles
  return !!userId && Roles.userIsInRole(userId, ['admin']);
}
