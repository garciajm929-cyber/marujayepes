document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');

        // Simple fade in effect
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.right = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid var(--border)';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth Scroll (Optional as CSS does this, but good for older browsers or complex needs)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Project Carousel Logic
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentProjectIndex = 0;

    function showProject(index) {
        // Hide all projects
        projectCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'none'; // Ensure display is none for non-active
        });

        // Show current project
        projectCards[index].classList.add('active');
        projectCards[index].style.display = 'block'; // Ensure display is block for active
    }

    if (prevBtn && nextBtn && projectCards.length > 0) {
        // Initialize first project
        showProject(currentProjectIndex);

        prevBtn.addEventListener('click', () => {
            currentProjectIndex--;
            if (currentProjectIndex < 0) {
                currentProjectIndex = projectCards.length - 1;
            }
            showProject(currentProjectIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentProjectIndex++;
            if (currentProjectIndex >= projectCards.length) {
                currentProjectIndex = 0;
            }
            showProject(currentProjectIndex);
        });
    }
});
