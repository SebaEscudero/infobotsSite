(function(){
    emailjs.init("tdGS-ea0-bienpHeq"); // Use your actual EmailJS user ID
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();        
    // Change the button's text and color
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
    emailjs.send("service_vdo9107", "template_e07jzrn", templateParams)
        .then(function(response) {
            var enviarButton = document.getElementById("enviar-button");
            enviarButton.textContent = "Enviado";
            enviarButton.style.backgroundColor = "#25d366";
            enviarButton.style.color = "white";
            // You can display a success message or redirect the user here
        }, function(error) {
            console.error("Email error:", error);
            // You can display an error message here
        });
});
