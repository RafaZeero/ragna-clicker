/**
 * The username format for all our users.
 *
 * Rules:
 *
 * - Must be 3-28 characters long.
 * - Can contain lowercase letters, uppercase letters, numbers, underscores and hyphens.
 * - Can contain exclamation and interrogation points
 * - Cannot contain colon and semi colons and greater than and lower than
 *
 */
const USERNAME_REGEX = /^(?!.*[<>:;])[\w\d\-_]{3,28}$/;

export const isUsernameValid = (username: string) => USERNAME_REGEX.test(username);
