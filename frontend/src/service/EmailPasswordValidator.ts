import {useState} from "react";

export default function EmailPasswordValidator() {

    const [, setEmailError] = useState<string>("");
    const [, setPasswordError] = useState<string>("");
    const [, setLoading] = useState<boolean>(true);

    const emailValidation = (userMail: string) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userMail)) {
            setEmailError("Email not valid")
            return false
        }
        setEmailError("");
        return true;
    }
    const validatePasswords = (password: string, repeatPassword: string) => {
        if (password.length < 6) {
            setPasswordError("Password too short")
            return false
        }
        if (password.length > 100) {
            setPasswordError("Password too long")
            return false
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("lowercase letter required")
            return false
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("uppercase letter required")
            return false
        }
        if (!/\d/.test(password)) {
            setPasswordError("number required")
            return false
        }
        if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)) {
            setPasswordError("special character required")
            return false
        }
        if (password !== repeatPassword) {
            setPasswordError("Passwords do not match")
            return false
        }

        setPasswordError("")
        return true
    }

}