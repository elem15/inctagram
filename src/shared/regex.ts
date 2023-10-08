// export const PasswordValidation = /^(?=(?:\S*\d){2})(?=(?:\S*[A-Za-z]){2})(?=\S*[^A-Za-z0-9])\S{8,}/
export const PasswordValidation = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W])(?!=.*[^a-яA-Яё]).*$/

export const EmailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const NameValidation = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/
