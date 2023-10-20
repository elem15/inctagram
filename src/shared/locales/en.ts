export const en = {
  home: {
    home: 'Home',
    create: 'Create',
    profile: 'My Profile',
    messenger: 'Messenger',
    search: 'Search',
    statistics: 'Statistics',
    favorites: 'Favorites',
  },
  resend: {
    title: 'Email verification link expired',
    message:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    resend_link: 'Resend verification link',
  },
  signup_confirm: {
    congratulations: 'Congratulations!',
    confirmed: 'Your email has been confirmed',
    sign_in: 'Sign In',
  },
  signin: {
    title: 'Sign In',
    email: 'Email',
    password: 'Password',
    forgot_password: 'Forgot Password',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    account_question: 'Don’t have an account?',
    error_message: 'The email or password are incorrect. Try again please',
    email_required: 'Email is required',
    password_required: 'Password is required',
  },
  signup: {
    title: 'Sign Up',
    email: 'Email',
    password: 'Password',
    password_confirmation: 'Password Confirmation',
    forgot_password: 'Forgot Password',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    account_question: 'Do you have an account?',
    agreement: 'I agree to the',
    and: 'and',
    terms_service: 'Terms of Service',
    privacy_policy: 'Privacy Policy',
    username: 'Username',
    username_required: 'UserName is required',
    user_exist_error: 'User with this email is already registered',
    email_required: 'Email is required',
    password_required: 'Password is required',
    email_invalid: 'Email is invalid',
    minPasswordLength: 'Minimum number of characters 6',
  },

  forgotpassword: {
    title: 'Forgot Password',
    email: 'Email',
    message: 'Enter your email address and we will send you further instructions',
    send_link: 'Send Link',
    back_signin: 'Back to Sign In',
    checkbox_text: 'I’m not a robot',
    lg: 'en',
  },

  email: {
    title: 'Email sent',
    message: 'We have sent a link to confirm your email to ',
    yes: 'OK',
  },

  logout: {
    title: 'Log out',
    message: 'Are you really want to log out of your account ',
    yes: 'Yes',
    no: 'No',
  },

  password_recovery: {
    title: 'Create New Password',
    message: 'Your password must be between 6 and 20 characters',
  },

  messages: {
    password_validate_message:
      'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
    user_max_length: 'Maximum number of characters 30',
    user_min_length: 'Minimum number of characters 6',
    password_min_length: 'Minimum number of characters 6',
    password_max_length: 'Maximum number of characters 20',
    name_format_message: 'The name must contain characters, not spaces, not start with numbers.',
    email_format_message: 'The email must match the format example@example.com',
    password_match_message: 'Password must match',
  },
}
export type LangType = typeof en
