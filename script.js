// ============ HEADER SCROLL STATE ============
const header = document.getElementById('header');
const scrollProgress = document.getElementById('scrollProgress');

function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 20);

    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? y / docHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ MOBILE NAV ============
const mobileToggle = document.getElementById('mobileToggle');
const headerNav = document.getElementById('headerNav');

mobileToggle?.addEventListener('click', () => {
    const isOpen = headerNav.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
});

headerNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        headerNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
    });
});

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const wrapper = item.querySelector('.faq-answer-wrapper');
    const inner = item.querySelector('.faq-answer-inner');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(other => {
            other.classList.remove('active');
            other.querySelector('.faq-answer-wrapper').style.maxHeight = '0px';
        });

        if (!isActive) {
            item.classList.add('active');
            wrapper.style.maxHeight = inner.scrollHeight + 'px';
        }
    });
});

// ============ WHATSAPP CONTACT FORM ============
document.getElementById('whatsappContactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('whatsappName').value.trim();
    const email = document.getElementById('whatsappEmail').value.trim();
    const project = document.getElementById('whatsappProject').value;
    const message = document.getElementById('whatsappMessage').value.trim();
    const status = document.getElementById('whatsappFormStatus');

    if (!name || !email || !project) {
        status.innerHTML = '<div class="alert-error">Please fill in your name, email, and project type.</div>';
        setTimeout(() => status.innerHTML = '', 3000);
        return;
    }

    status.innerHTML = '<div class="alert-success">Redirecting to WhatsApp...</div>';

    const text = `*New Client Inquiry*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Project:* ${encodeURIComponent(project)}%0A*Message:* ${encodeURIComponent(message || 'N/A')}`;

    setTimeout(() => {
        window.open(`https://wa.me/923365416775?text=${text}`, '_blank');
        this.reset();
        setTimeout(() => status.innerHTML = '', 4000);
    }, 400);
});