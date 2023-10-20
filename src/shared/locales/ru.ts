import { LangType } from './en'

export const ru: LangType = {
  home: {
    home: 'Главная',
    create: 'Создать',
    profile: 'Мой Профиль',
    messenger: 'Мессенджер',
    search: 'Поиск',
    statistics: 'Статистика',
    favorites: 'Избранное',
  },
  resend: {
    title: 'Срок действия ссылки для подтверждения электронной почты истек',
    message:
      'Видимо срок действия верификационной ссылки истек. Не беспокойтесь, мы можем отправить Вам ссылку заново',
    resend_link: 'Переслать верификационную ссылку',
  },
  signup_confirm: {
    congratulations: 'Поздравляем!',
    confirmed: 'Ваша регистрация подтверждена',
    sign_in: 'Войти',
  },
  signin: {
    title: 'Войти',
    email: 'Электронная почта',
    password: 'Пароль',
    forgot_password: 'Забыли пароль',
    sign_in: 'Войти',
    sign_up: 'Зарегистрироваться',
    account_question: 'Вы не зарегистрированы?',
    error_message: 'Неверная почта или пароль. Попробуйте еще раз',
    email_required: 'Введите почту',
    password_required: 'Введите пароль',
  },
  signup: {
    title: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    password_confirmation: 'Подтверждение пароля',
    forgot_password: 'Forgot Password',
    sign_in: 'Войти',
    sign_up: 'Зарегистрироваться',
    account_question: 'Вы зарегистрированы?',
    agreement: 'Я соглашаюсь с ',
    and: 'и',
    terms_service: 'Условиями обслуживания',
    privacy_policy: 'Политикой конфиденциальности',
    username: 'Имя пользователя',
    username_required: 'Введите имя пользователя',
    user_exist_error: 'Пользователь с такой эл. почтой уже существует',
    email_required: 'Введите почту',
    password_required: 'Введите пароль',
    email_invalid: 'Почта недействительна',
    minPasswordLength: 'Минимальное количество знаков 6',
  },

  forgotpassword: {
    title: 'Забыли пароль',
    email: 'Электронная почта',
    message: 'Введите адрес электронной почты и получите дальнейшие инструкции',
    send_link: 'Отправить ссылку',
    back_signin: 'Вернуться к входу',
    checkbox_text: 'Я не робот',
    lg: 'ru',
  },
  email: {
    title: 'Письмо отправлено',
    message: 'Вам отправлена ссылка для подтверждения по адресу: ',
    yes: 'ОК',
  },

  logout: {
    title: 'Выход',
    message: 'Вы действительно хотите выйти из аккаунта ',
    yes: 'Да',
    no: 'Нет',
  },

  password_recovery: {
    title: 'Создать новый пароль',
    message: 'Пароль должен быть от 6 до 20 символов включительно',
  },

  messages: {
    password_validate_message:
      'Пароль должен содержать  a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
    user_max_length: 'Максимальное количество символов 30',
    user_min_length: 'Минимальное количество символов 6',
    password_min_length: 'Минимальное количество символов 6',
    password_max_length: 'Максимальное количество символов 20',
    name_format_message:
      'Имя должно содержать символы, не содержать пробелов, не начинаться с цифр.',
    email_format_message: 'Электронная почта должна соответствовать формату example@example.com.',
    password_match_message: 'Пароли должны совпадать',
  },
}
