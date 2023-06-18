export { default as axiosInstance } from './axios';
export { default as resendVerifyEmail } from './resendverifyemail';
export { default as authenticateAppInstance } from './authenticateapp';
export { default as checkIfLoggedIn } from './checkifloggedin';
export { default as googleInstance } from './googleInstance';
export { signUp, logOut, googleAuth, verifyEmail } from './userauth';
export { forgotPassword, resetPassword } from './password';
export { updateUser, updateAvatar } from './updateuser';
export {
  getQuotes,
  getMovies,
  getLike,
  getNotifications,
  markNotifications,
  markNotification,
} from './getdata';
export { createComment, createQuote } from './postdata';
export { default as pusherInstance } from './pusher';
