// @flow

import type { Solution } from '../ui/shapes/SolutionShape';

export function isUserAdmin(userId: ?string): boolean {
  // Shitty global refernce to alanning/meteor-roles
  return !!userId && Roles.userIsInRole(userId, ['admin']);
}

export function canEditSolution(userId: ?string, authorId: string): boolean {
  const isLoggedIn: boolean = !!userId;
  const isAuthor: boolean = userId === authorId;
  const isAdmin: boolean = isUserAdmin(userId);
  return isLoggedIn && (isAuthor || isAdmin);
}
