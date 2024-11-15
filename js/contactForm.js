emailjs.init("jkvbuK8i5tfMGte-D");

// Form submission event listener
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields
        const firstName = document.getElementById("first_name").value;
        const lastName = document.getElementById("last_name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const subject = document.getElementById("subject_line").value;


        // Prepare email parameters
        const emailParams = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            subject_line: subject,
            message: message,
        };

        // Send email using EmailJS for each service ID
        Promise.all([
            emailjs.send("service_7jyuhhe", "template_9a76yrc", emailParams),
            emailjs.send("service_msrrot2", "template_9a76yrc", emailParams)
        ])
        .then(function(response) {
            alert("Your message has been sent successfully!");
            document.getElementById("contactForm").reset(); // Reset form
        })
        .catch(function(error) {
            alert("There was an error sending your message. Please try again later.");
        });
    });
});
