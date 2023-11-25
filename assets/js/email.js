(function(){
    emailjs.init("tdGS-ea0-bienpHeq");
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();        
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    const templateParams = {
        to_email: "seba.escuderoleiva@gmail.com", 
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send("service_vdo9107", "template_e07jzrn", templateParams)
        .then(function(response) {
            var enviarButton = document.getElementById("enviar-button");
            enviarButton.textContent = "Enviado";
            enviarButton.style.backgroundColor = "#25d366";
            enviarButton.style.color = "white";
        }, function(error) {
            console.error("Email error:", error);
        });
});
