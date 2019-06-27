
export default function main() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    return new Promise((resolve, reject) => {
        client.messages
            .create({
                body: 'you have 5 seconds.',
                from: '+14353834329',
                to: '+14355925998'
            })
            .then(message => resolve(message))
            .done();
    })
}