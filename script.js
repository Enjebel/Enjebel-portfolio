// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Navbar hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Carousel logic
  const slides = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlideFunc() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlideFunc();
    resetSlideInterval();
  });

  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 7000);
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  showSlide(0);
  startSlideInterval();

  document.addEventListener("DOMContentLoaded", () => {
  
  // Google Maps initialization
  function initMap() {
    const location = { lat: 40.7128, lng: -74.0060 }; // New York City as example
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: location,
    });
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }

  // Load Google Maps script and initialize map
  function loadGoogleMaps() {
    if (document.getElementById('google-maps-script')) return;
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    window.initMap = initMap;
    document.body.appendChild(script);
  }

  loadGoogleMaps();
});
});


// === COUNTERS ANIMATION ===
const counters = document.querySelectorAll('.counter-box h3');
let countersRun = false;

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const duration = 2000;
  const frameRate = 60;
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let frame = 0;

  const countInterval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.floor(progress * target);

    counter.textContent = current;

    if (frame === totalFrames) {
      counter.textContent = target;
      clearInterval(countInterval);
    }
  }, 1000 / frameRate);
}

function runCounters() {
  counters.forEach(counter => {
    if (!counter.classList.contains('counted')) {
      animateCounter(counter);
      counter.classList.add('counted');
    }
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

window.addEventListener('scroll', () => {
  if (!countersRun && counters.length > 0) {
    counters.forEach(counter => {
      if (isInViewport(counter) && !countersRun) {
        runCounters();
        countersRun = true;
      }
    });
  }
});

// === PORTFOLIO FILTER ===
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Activate selected button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });
});

//contact form
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const successMsg = document.getElementById("form-success");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          successMsg.style.display = "block";

          // Hide message after 4 seconds
          setTimeout(() => {
            successMsg.style.display = "none";
          }, 4000);
        } else {
          alert("Oops! Something went wrong.");
        }
      } catch (error) {
        alert("Error: Unable to send message.");
      }
    });
  });


 // === CHATBOT TOGGLE ===
const toggleBtn = document.getElementById('chatbot-toggle');
const chatbotBox = document.getElementById('chatbot-box');

toggleBtn.addEventListener('click', () => {
  chatbotBox.classList.toggle('hidden');
});

// === CHATBOT LOGIC ===
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');

// Escape HTML to avoid injection
function escapeHTML(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// Generate bot response
function getBotReply(msg) {
  const q = msg.toLowerCase();

  // Match new Q&A
  if (q.includes('what type of projects') || q.includes('projects have you worked')) {
    return "I've worked on various projects, including web development, mobile apps, and software solutions.";
  }
  if (q.includes('languages') || q.includes('proficient in')) {
    return "I'm proficient in languages like JavaScript, Python, and HTML/CSS.";
  }
  if (q.includes('problem-solving') || q.includes('how do you solve problems')) {
    return "I approach problem-solving by breaking down complex issues into smaller, manageable parts, and then debugging and testing solutions.";
  }
  if (q.includes('motivates you to learn') || q.includes('learn new technologies')) {
    return "I'm motivated by the desire to stay up-to-date with industry trends and to continuously improve my skills.";
  }
  if (q.includes('quality of your code') || q.includes('ensure code quality')) {
    return "I ensure code quality by following best practices, testing thoroughly, and reviewing code with peers.";
  }

  // Existing Q&A
  if (q.includes('service')) return 'I offer web/mobile development and UI/UX design services.';
  if (q.includes('tools') || q.includes('tech') || q.includes('technology')) return 'I use HTML, CSS, JavaScript, React, Figma, and Git.';
  if (q.includes('contact') || q.includes('reach')) return 'You can contact me through the contact form or via email.';
  if (q.includes('experience')) return 'I have over 4 years of experience in frontend development.';
  if (q.includes('hire') || q.includes('available') || q.includes('freelance')) return 'Yes, I’m available for freelance and full-time opportunities.';

  return "I'm currently away. Please leave a message via the contact form and I’ll get back to you!";
}

// Chat handler
chatInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    // Append user message
    chatLog.innerHTML += `<p><strong>You:</strong> ${escapeHTML(userMsg)}</p>`;

    // Append bot response
    const reply = getBotReply(userMsg);
    chatLog.innerHTML += `<p><strong>Bot:</strong> ${reply}</p>`;

    // Clear input
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});
