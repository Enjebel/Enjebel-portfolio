// Wait until DOM is fully loaded

document.addEventListener('DOMContentLoaded', () => {

  // Navbar hamburger toggle

  const hamburger = document.querySelector('.hamburger');

  const navLinks = document.querySelector('.nav-links');



  if (hamburger && navLinks) {

    hamburger.addEventListener('click', () => {

      navLinks.classList.toggle('open');

    });

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

    return "I've worked on responsive websites, backend-supported web apps, business landing pages, portfolio sites, UI concepts, and digital marketing projects.";

  }

  if (q.includes('languages') || q.includes('proficient in')) {

    return "I'm proficient in HTML, CSS, JavaScript, Python, and backend development workflows.";

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

  if (q.includes('service')) return 'I offer frontend development, backend development, web/mobile UI, and UI/UX design services.';

  if (q.includes('tools') || q.includes('tech') || q.includes('technology')) return 'I use HTML, CSS, JavaScript, React, Python, backend tools, Figma, and Git.';

  if (q.includes('contact') || q.includes('reach')) return 'You can contact me through the contact form or via email.';

  if (q.includes('experience')) return 'I have 2+ years of experience in frontend development, backend development, and digital design.';

  if (q.includes('hire') || q.includes('available') || q.includes('freelance')) return "Yes, I'm available for freelance and full-time opportunities.";



  return "I'm currently away. Please leave a message via the contact form and I'll get back to you!";

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
