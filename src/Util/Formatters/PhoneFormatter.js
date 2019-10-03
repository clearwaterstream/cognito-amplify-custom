import { StringUtil } from "Util/Helpers";

class PhoneFormatter {
    // https://www.twilio.com/docs/glossary/what-e164
    static formatPhoneE164(phoneText) {
        if(StringUtil.isNullOrEmpty(phoneText)) {
            return phoneText;
        }

        const digits = StringUtil.extractDigits(phoneText);

        if(digits.length == 10) {
            return `+1${digits}`;
        }

        return phoneText;
    }
}

export default PhoneFormatter;