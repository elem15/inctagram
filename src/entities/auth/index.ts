export {
  authApi,
  useRegistrationMutation,
  useRegistrationConfirmationMutation,
  useLoginMutation,
  useSendCaptchaMutation,
  useCreateNewPasswordMutation,
  useValidCodeMutation,
  useGoogleLoginMutation,
  useResendRegistrationLinkMutation,
  useLogOutMutation,
} from './api/authApi'

export {
  addUser,
  clearLocalUserData,
  setUser,
  setLoginUser,
  selectAuthUser,
  default as authReducer,
} from './model/authSlice'
