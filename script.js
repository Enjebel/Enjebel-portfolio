// Wait until DOM is fully loaded

document.addEventListener('DOMContentLoaded', () => {

  // Navbar hamburger toggle

  const hamburger = document.querySelector('.hamburger');

  const navLinks = document.querySelector('.nav-links');



  if (hamburger && navLinks) {

    hamburger.addEventListener('click', () => {

      navLinks.classList.toggle('open');

    });

    navLinks.querySelectorAll('a').forEach(link => {

      link.addEventListener('click', () => navLinks.classList.remove('open'));

    });

  }

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {

    const revealObserver = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          revealObserver.unobserve(entry.target);

        }

      });

    }, { threshold: 0.18 });

    revealElements.forEach(element => revealObserver.observe(element));

  } else {

    revealElements.forEach(element => element.classList.add('visible'));

  }

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

  if (!filterButtons.length || !projectCards.length) return;



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



const whatsappNumber = '237671950721';
const displayPhone = '671950721';

//contact form

  document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");

    const successMsg = document.getElementById("form-success");

    if (!form || !successMsg) return;



    const submitButton = form.querySelector('button[type="submit"]');

    function showFormMessage(message, type) {

      successMsg.textContent = message;

      successMsg.classList.remove('is-success', 'is-error', 'is-visible');

      void successMsg.offsetWidth;

      successMsg.classList.add(type === 'success' ? 'is-success' : 'is-error', 'is-visible');

    }

    form.addEventListener("submit", function (e) {

      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const message = formData.get('message')?.toString().trim();

      if (!name || !email || !message) {

        showFormMessage('Message failed to prepare. Please complete all fields and try again.', 'error');

        return;

      }

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent = 'Opening WhatsApp...';

      }

      const whatsappMessage = `Hello Enjebel, my name is ${name}. My email is ${email}. ${message}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener');

      if (whatsappWindow) {

        form.reset();

        showFormMessage('WhatsApp opened successfully. Please tap Send there to deliver your message.', 'success');

      } else {

        showFormMessage(`WhatsApp could not open automatically. Please message me directly on WhatsApp: ${displayPhone}.`, 'error');

      }

      if (submitButton) {

        submitButton.disabled = false;

        submitButton.textContent = 'Send Message';

      }

    });

  });





 // === CHATBOT TOGGLE ===

const toggleBtn = document.getElementById('chatbot-toggle');

const chatbotBox = document.getElementById('chatbot-box');



if (toggleBtn && chatbotBox) {

  toggleBtn.addEventListener('click', () => {

    chatbotBox.classList.toggle('hidden');

  });

}



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
  const contactLine = `For anything I cannot answer here, please contact Enjebel directly on WhatsApp: ${displayPhone}.`;



  // Match new Q&A

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {

    return "Hi! I can help you learn about Enjebel's services, skills, projects, availability, CV, and contact options. What would you like to know?";

  }

  if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('quote')) {

    return `Project pricing depends on the scope, pages, features, and timeline. The fastest way to get a quote is to message Enjebel on WhatsApp: ${displayPhone}.`;

  }

  if (q.includes('cv') || q.includes('resume')) {

    return "You can download Enjebel's CV using the Download CV button in the hero section. For direct questions about experience, WhatsApp is best: " + displayPhone + ".";

  }

  if (q.includes('what type of projects') || q.includes('projects have you worked') || q.includes('portfolio')) {

    return "I've worked on responsive websites, backend-supported web apps, business landing pages, portfolio sites, UI concepts, and digital marketing projects.";

  }

  if (q.includes('languages') || q.includes('proficient in')) {

    return "Enjebel works with HTML5, CSS3, JavaScript, Python, SQL basics, React, API integration, Git, GitHub, Figma, Vercel, and Netlify.";

  }

  if (q.includes('skill') || q.includes('tools')) {

    return "Enjebel's skills include frontend development, backend workflows, responsive design, API integration, Git/GitHub, Figma, deployment, SEO basics, digital strategy, and cybersecurity awareness.";

  }

  if (q.includes('problem-solving') || q.includes('how do you solve problems')) {

    return "Enjebel approaches problems by breaking them into smaller parts, checking the user flow, debugging carefully, and testing the final solution.";

  }

  if (q.includes('motivates you to learn') || q.includes('learn new technologies')) {

    return "Enjebel is motivated by building useful digital products, improving technical skill, and keeping up with modern web practices.";

  }

  if (q.includes('quality of your code') || q.includes('ensure code quality')) {

    return "Enjebel focuses on clean structure, responsive layouts, practical testing, readable code, and user-friendly behavior.";

  }



  // Existing Q&A

  if (q.includes('service')) return 'Enjebel offers frontend development, backend development, web/mobile UI, branding, digital marketing strategy, and cybersecurity-aware web support.';

  if (q.includes('tech') || q.includes('technology')) return 'Enjebel uses HTML, CSS, JavaScript, React, Python, backend tools, Figma, Git, GitHub, Vercel, and Netlify.';

  if (q.includes('contact') || q.includes('reach') || q.includes('whatsapp') || q.includes('phone') || q.includes('number')) return `You can use the contact form on this page, or contact Enjebel directly on WhatsApp: ${displayPhone}.`;

  if (q.includes('experience')) return 'Enjebel has 2+ years of experience across frontend development, backend development, digital design, and web-focused brand presentation.';

  if (q.includes('hire') || q.includes('available') || q.includes('freelance') || q.includes('job')) return `Yes, Enjebel is available for freelance and full-time opportunities. Send project details on WhatsApp: ${displayPhone}.`;



  return `I do not have enough information to answer that confidently. ${contactLine}`;

}



// Chat handler

if (chatInput && chatLog) {

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

}
