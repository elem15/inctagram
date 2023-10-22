import { enTextsTermsOfService } from '@/shared/locales/en-texts-terms-of-service'

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

  terms_of_service: {
    button_text: 'Back to Sign Up',
    title: 'Terms of Service',
    text: enTextsTermsOfService,
  },
  privacy_policy: {
    buttons_text: 'Back to Sign Up',
    title: 'Privacy Policy',
    text: `1. Introduction

Welcome to Inctagram, the social media platform that values your privacy and data security. This Privacy Policy outlines our commitment to protecting your personal information and explains how we collect, use, and safeguard your data.

2. Information We Collect

We collect the following types of information:

Personal Information: Information you provide when registering, such as your name, email address, and date of birth.

User-Generated Content: Content you post, including photos, videos, and messages.

Usage Data: Information about how you use Inctagram, including your interactions with other users and content you view.

Device Information: Information about the devices you use to access Inctagram, including device type, operating system, and unique device identifiers.

Location Information: If you enable location services, we may collect your precise or approximate location.

Cookies and Similar Technologies: We use cookies and similar technologies to track your use of Inctagram and collect data about your interactions.

3. How We Use Your Information

We use your information to:

Provide, maintain, and improve Inctagram.
Customize your experience and content you see.
Communicate with you and send you important updates.
Protect the security and integrity of our platform.
Comply with legal and regulatory requirements.
4. Sharing Your Information

We may share your information with:

Other Inctagram users as per your privacy settings.
Third-party service providers who assist us in delivering our services.
Law enforcement and regulatory authorities when required.
5. Data Security

We take data security seriously and employ measures to protect your data. However, no method of transmission or storage can be 100% secure. We cannot guarantee the security of your data.

6. Your Choices

You can manage your privacy settings on Inctagram, including who can see your content and interact with you. You can also opt-out of promotional emails.

7. Children's Privacy

Inctagram is not intended for individuals under the age of 13. We do not knowingly collect or store information from children under this age.

8. Changes to this Privacy Policy

We may update this Privacy Policy from time to time. When we do, we will notify you of the changes through Inctagram's communication channels.

9. Contact Us

If you have any questions or concerns about this Privacy Policy or your data, please contact us at [Your Contact Information].`,
  },
}
export type LangType = typeof en
