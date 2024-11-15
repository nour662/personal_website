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

        // Send the data to the server (backend)
        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailParams),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert("Your message has been sent successfully!");
                document.getElementById("contactForm").reset(); // Reset form
            } else {
                alert("There was an error sending your message. Please try again later.");
            }
        })
        .catch(error => {
            alert("There was an error. Please try again later.");
        });
    });
  });