document.addEventListener('DOMContentLoaded', function() {
    configurarMenuMobile();
    destacarPaginaAtual();
    configurarScrollSuave();
    adicionarBotaoVoltarTopo();
    adicionarAnimacaoScroll();
    
    contadorAnimado();
    adicionarEfeitoCards();
    adicionarModalImagens();
    
    configurarMascaras();
    configurarFormulario();
    adicionarFiltroVoluntariado();
    adicionarTooltips();
    adicionarProgressoFormulario();
    
    constestyle = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    console.log('Sistema JavaScript da Patinhas Solidárias inicializado com sucesso!');
});