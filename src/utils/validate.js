export const checkValidData = (email, password) => {
    if (!email.trim()) return "Email is required";
    if (!password.trim()) return "Password is required";

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
        email
    );
    if (!isEmailValid) return "Email ID is not valid";

    const isPasswordValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isPasswordValid) return "Password is not valid";

    return null;
}