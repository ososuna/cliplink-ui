export const Messages = {
  VALID_EMAIL: 'Enter a valid email address.',
  PASSWORD_REQUIRED: 'Enter your password to continue.',
  CONFIRM_PHRASE: (confirmPhrase: string) => `Type "${confirmPhrase}" to confirm your action.`,
  STRING_MIN: (field: string, min: number) => `The ${field} must be at least ${min} character(s) long`,
  STRING_MAX: (field: string, max: number) => `The ${field} must be no more than ${max} character(s) long`,
  VALID_URL: 'Enter a valid URL.',
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later. If the problem persists, contact support.',
  APP_DESCRIPTION: 'ClipLink - The ultimate URL shortener for seamless link management. Shorten, customize, and track your links with ease. Boost your branding and analytics with a fast, reliable, and user-friendly solution. Try ClipLink today!',
};
