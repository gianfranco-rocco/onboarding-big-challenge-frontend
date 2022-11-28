export const isEmail = (email: string): boolean => {
    const match = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    return !!match;
};

export const isAlpha = (value: string): boolean => {
    const match = String(value)
        .toLowerCase()
        .match(
            /^[a-zA-Z ]*$/
        );

    return !!match
}

export const validateEmail = (email: string): string | undefined => {
    return !isEmail(email) ? "This doesn't seem to be a valid email address." : undefined
}

export const validateAlpha = (value: string): string | undefined => {
    return !isAlpha(value) ? "This field only accepts alphabetic characters." : undefined
}