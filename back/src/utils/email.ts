/**
 * Email regex that checks all valid characters in an email The email can be
 * divided in two: local part & domain part
 *
 * Local part is before the `@` Domain is after the `@`
 *
 * This regex will check:
 *
 * In local Part:
 *
 * - Valid special characters:
 *
 * ```txt
 * -!#$%&'*+=?^_`{|}~.
 * ```
 *
 * - Valid characters: a-z (lowercase), A-Z (uppercase), 0-9
 *
 * In domain part:
 *
 * - Valid characters: a-z (lowercase), A-Z (uppercase), 0-9
 * - Valid special characters: . (only once or twice, with valid characters in the
 *   between)
 *
 * Also will check if there is an `@` in the middle of the local part and domain
 * part
 */
export const EMAIL_REGEX =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

type IsEmailValid = (email: string) => boolean;

/** Check maximum length for email */
const isEmailWithinMaxSize: IsEmailValid = email => email.length <= 320;

/***/
/** Local Part * */
/***/

/** Check if Local part is within minimum size */
const isLocalPartWithinMinSize: IsEmailValid = email => !(email.split('@')[0].length === 0);
/** Check if Local part is within maximum size */
const isLocalPartWithinMaxSize: IsEmailValid = email => !(email.split('@')[0].length > 64);
/** Check if Local part has valid sizes */
const isLocalPartValid: IsEmailValid = email =>
  isLocalPartWithinMinSize(email) && isLocalPartWithinMaxSize(email);

/***/
/** Domain Part * */
/***/

/** Check if domain part is within minimum size */
const isDomainWithinMinSize: IsEmailValid = email => !(email.split('@')[1].length === 0);
/** Check if domain part is within maximum size */
const isDomainWithinMaxSize: IsEmailValid = email => !(email.split('@')[1].length > 255);
/** Check if domain part after first dot is within maximum size */
const isDomainPartWithMaxSize: IsEmailValid = email =>
  !(email.split('@')[1].split('.')[0].length > 63);
/** Check if domain part has valid sizes */
const isDomainValid: IsEmailValid = email =>
  isDomainWithinMinSize(email) && isDomainWithinMaxSize(email) && isDomainPartWithMaxSize(email);

/** Validate email characters */
const isEmailWithInvalidChars: IsEmailValid = email => EMAIL_REGEX.test(email);

/* Completely validate email */
export const isEmailValid: IsEmailValid = email => {
  return (
    /** First, checks if email exists */
    Boolean(email) &&
    /** Then, checks if email has valid characters */
    isEmailWithInvalidChars(email) &&
    /** Then, checks if has email local part is valid */
    isLocalPartValid(email) &&
    /** Then, checks if has email domain part is valid */
    isDomainValid(email) &&
    /** Then, checks if has email allowed maximum size */
    isEmailWithinMaxSize(email)
  );
};
