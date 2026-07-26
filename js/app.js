// Current Date
const dateEl = document.getElementById('currentDate');

if(dateEl){
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Dark Mode Toggle
const themeBtn = document.querySelector('.theme-btn');

themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// Simple mobile menu placeholder
const menuBtn = document.querySelector('.menu-btn');

menuBtn?.addEventListener('click', () => {
  alert('मोबाइल मेनू अगले चरण में जोड़ा जाएगा');
});
