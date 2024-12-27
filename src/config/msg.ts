export const Messages = {
  VALID_EMAIL: 'Please enter a valid email address',
  CONFIRM_PHRASE: (confirmPhrase: string) => `Please type "${confirmPhrase}" to confirm`,
  STRING_MIN: (field: string, min: number) => `Please enter a valid ${field} with at least ${min} character(s)`,
  STRING_MAX: (field: string, min: number) => `Please enter a valid ${field} with at most ${min} character(s)`,
  VALID_URL: 'Please enter a valid URL',
  INTERNAL_SERVER_ERROR: 'Please try again later. If the issue persists talk to the admin.',
}