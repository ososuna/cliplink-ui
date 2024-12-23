import { map } from 'nanostores';

const uiError = map({ message: "", type: "" });
const setUiError = (error) => {
  if (error.message) {
    error.message = error.message.charAt(0).toUpperCase() + error.message.slice(1);
  }
  uiError.set(error);
};

export { setUiError as s, uiError as u };
