function configurarMenuMobile() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    if (nav && navUl) {
        nav.insertBefore(menuToggle, navUl);
        
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('active');
            this.classList.toggle('active');
            
            if (navUl.classList.contains('active')) {
                this.setAttribute('aria-label', 'Fechar menu');
            } else {
                this.setAttribute('aria-label', 'Abrir menu');
            }
        });
        
        const links = navUl.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navUl.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-label', 'Abrir menu');
                }
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }
}

function destacarPaginaAtual() {
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav ul li a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === paginaAtual) {
            link.style.backgroundColor = 'var(--cor-primaria)';
            link.style.color = 'var(--cor-branco)';
        }
    });
}

function adicionarAnimacaoScroll() {
    const elementos = document.querySelectorAll('section, article');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => {
        observer.observe(elemento);
    });
}

function configurarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function adicionarBotaoVoltarTopo() {
    const botao = document.createElement('button');
    botao.innerHTML = '↑';
    botao.className = 'botao-topo';
    botao.setAttribute('aria-label', 'Voltar ao topo');
    botao.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--cor-primaria);
        color: var(--cor-branco);
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--sombra-lg);
    `;
    
    document.body.appendChild(botao);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            botao.style.opacity = '1';
            botao.style.visibility = 'visible';
        } else {
            botao.style.opacity = '0';
            botao.style.visibility = 'hidden';
        }
    });
    
    botao.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    botao.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    botao.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}