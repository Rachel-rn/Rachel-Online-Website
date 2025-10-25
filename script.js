const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


const typingText = document.getElementById('typing-text');
const words = ["Science Communicator", "Tech & AI Enthusiast", "Career Growth Mentor"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const currentWord = words[wordIndex];
  if (!deleting) {
    typingText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(type, 1000); 
      return;
    }
  } else {
    typingText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 50 : 150);
}

type();
// Pillar slide-in effect
const pillars = document.querySelectorAll('.pillar');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

pillars.forEach(pillar => observer.observe(pillar));

(function() {
  emailjs.init("PO6clzRJDsX6yMoBp");
})();

function sendEmail(event) {
  event.preventDefault();

  const formMessage = document.getElementById("form-message");
  formMessage.textContent = "Sending message...";
  formMessage.style.color = "#999";

  emailjs.send("service_wwe7zcv", "template_hya1myv", {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value
  })
  .then(() => {
    formMessage.textContent = "✅ Message sent successfully!";
    formMessage.style.color = "green";
    document.querySelector(".contact-form").reset();
  })
  .catch(() => {
    formMessage.textContent = "❌ Failed to send message. Please try again later.";
    formMessage.style.color = "red";
  });
}
