(function(){
    emailjs.init("tdGS-ea0-bienpHeq"); // Use your actual EmailJS user ID
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get("contact-name");
    const email = formData.get("contact-email");
    const message = formData.get("contact-message");

    // Prepare email parameters
    const templateParams = {
        to_email: "seba.escuderoleiva@gmail.com", // Your email address
        from_name: name,
        from_email: email,
        message: message
    };

    // Send email using EmailJS
    emailjs.send("service_b8qzbxp", "template_e07jzrn", templateParams)
        .then(function(response) {
            console.log("Email sent:", response, message);
            // You can display a success message or redirect the user here
        }, function(error) {
            console.error("Email error:", error);
            // You can display an error message here
        });
});