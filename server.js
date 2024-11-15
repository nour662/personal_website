const express = require('express');
const emailjs = require('emailjs-com');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const EMAILJS_API_KEY = process.env.EMAILJS_API_KEY;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

// POST endpoint to send the email
app.post('/send-email', (req, res) => {
    const emailParams = req.body;

    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        { publicKey: EMAILJS_API_KEY }
    )
    .then(response => {
        res.json({ status: 'success', message: 'Email sent successfully' });
    })
    .catch(error => {
        res.status(500).json({ status: 'error', message: 'Failed to send email' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
