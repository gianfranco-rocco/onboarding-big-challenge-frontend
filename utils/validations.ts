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

export const isPhoneNumber = (phoneNumber: string): boolean => {
    const match = String(phoneNumber)
        .toLowerCase()
        .match(
            /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/
        );

    return !!match
}

export const isInt = (value: any): boolean => {
    const match = String(value)
        .match(
            /^[0-9]*$/
        );

    return !!match
}

export const validateEmail = (email: string): string | undefined => !isEmail(email) ? "This doesn't seem to be a valid email address." : undefined

export const validateAlpha = (value: string): string | undefined => !isAlpha(value) ? "This field only accepts alphabetic characters." : undefined

export const validatePhoneNumber = (phoneNumber: string): string | undefined => !isPhoneNumber(phoneNumber) ? "This doesn't seem to be a valid phone number, expected format: (000) 000-0000" : undefined

export const validateInt = (value: string): string | undefined => !isInt(value) ? "This field must be a number." : undefined