const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
});

// Close the mobile menu when a link inside it is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.innerHTML = '&#9776;';
  });
});

// Dark / light mode toggle — light by default, remembers the visitor's choice
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;
try {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') rootEl.setAttribute('data-theme', 'dark');
} catch (e) {}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = rootEl.getAttribute('data-theme') === 'dark';
    if (isDark) {
      rootEl.removeAttribute('data-theme');
    } else {
      rootEl.setAttribute('data-theme', 'dark');
    }
    try { localStorage.setItem('theme', isDark ? 'light' : 'dark'); } catch (e) {}
  });
}


const typingText = document.getElementById('typing-text');
if (typingText) {
  const words = ["Science Communicator", "Health Content Creator", "Medical Writer"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
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
  };

  type();
}

// Equalize the fanned pillar card heights so they always align uniformly,
// regardless of how much text each card has. Only applies on desktop/tablet
// where the cards are fanned — on mobile they stack naturally instead.
function equalizePillarHeights() {
  const pillars = document.querySelectorAll('.pillar');
  if (!pillars.length) return;

  const isFanned = window.matchMedia('(min-width: 901px)').matches;
  if (!isFanned) {
    pillars.forEach(p => { p.style.height = ''; });
    return;
  }

  pillars.forEach(p => { p.style.height = 'auto'; });
  let tallest = 0;
  pillars.forEach(p => {
    if (p.offsetHeight > tallest) tallest = p.offsetHeight;
  });
  pillars.forEach(p => { p.style.height = tallest + 'px'; });
}

window.addEventListener('load', equalizePillarHeights);
window.addEventListener('resize', equalizePillarHeights);

// Archive page category filter (only runs if the dropdown exists on this page)
const categoryFilter = document.getElementById('categoryFilter');
if (categoryFilter) {
  const archiveCards = document.querySelectorAll('.archive-card');
  const archiveEmpty = document.getElementById('archiveEmpty');

  categoryFilter.addEventListener('change', () => {
    const selected = categoryFilter.value;
    let visibleCount = 0;

    archiveCards.forEach(card => {
      const matches = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    });

    if (archiveEmpty) {
      archiveEmpty.classList.toggle('show', visibleCount === 0);
    }
  });
}

(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("PO6clzRJDsX6yMoBp");
  }
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