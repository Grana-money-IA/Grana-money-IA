document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});
