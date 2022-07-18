const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serverPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const testPhoneNumber = process.env.TWILIO_TEST_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken)

module.exports = {
    //TODO remove hardcoded phone number
    sendTextMessage: (phoneNumber, textBody) => {
        return client.messages.create({
            body: textBody,
            from: serverPhoneNumber,
            to: testPhoneNumber
        })
    }
}