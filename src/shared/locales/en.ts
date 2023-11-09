import { enTextsPrivacyPolicy } from '@/shared/locales/en-texts-privacy-policy'
import { enTextsTermsOfService } from '@/shared/locales/en-texts-terms-of-service'

export const en = {
  lg: 'en',
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
    agreement: 'I agree to the ',
    and: 'and',
    terms_service: 'Terms of Service',
    privacy_policy: 'Privacy Policy',
    username: 'Username',
    username_required: 'Username is required',
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
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
    user_max_length: 'Maximum number of characters 30',
    user_min_length: 'Minimum number of characters 6',
    password_min_length: 'Minimum number of characters 6',
    password_max_length: 'Maximum number of characters 20',
    name_format_message: 'The name must contain characters, not spaces, not start with numbers',
    email_format_message: 'The email must match the format example@example.com',
    password_match_message: 'Password must match',
  },

  terms_of_service: {
    button_text: 'Back to Sign Up',
    title: 'Terms of Service',
    text: enTextsTermsOfService,
  },
  privacy_policy: {
    title: 'Privacy Policy',
    text: enTextsPrivacyPolicy,
  },
  sidebar: {
    home: 'Home',
    create: 'Create',
    my_profile: 'My Profile',
    messenger: 'Messenger',
    search: 'Search',
    statistics: 'Statistics',
    favorites: 'Favorites',
    log_out: 'Log Out',
  },
  add_profile_photo: {
    add_profile_photo_text: 'Add a Profile Photo',
    text_of_button_select_from_comp: 'Select from Computer',
    error_typy_of_photo: 'Error! The format of the uploaded photo must be PNG and JPEG.',
    error_size_photo: 'Error! Photo size must be less than 10 MB!',
    save_button: ' Save',
  },
  delete_photo_of_profile: {
    title_of_modal: 'Delete Photo',
    text: 'Are you sure you want to delete the photo?',
    button_yes: 'Yes',
    button_no: 'No',
  },
}
export type LangType = typeof en
