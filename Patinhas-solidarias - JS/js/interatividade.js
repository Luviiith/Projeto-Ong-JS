function contadorAnimado() {
    const numeros = document.querySelectorAll('.numero-destaque-valor');
    
    numeros.forEach(numero => {
        const valorFinal = parseInt(numero.textContent);
        const duracao = 2000;
        const incremento = valorFinal / (duracao / 16);
        let valorAtual = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        valorAtual += incremento;
                        if (valorAtual >= valorFinal) {
                            numero.textContent = valorFinal;
                            clearInterval(timer);
                        } else {
                            numero.textContent = Math.floor(valorAtual);
                        }
                    }, 16);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(numero);
    });
}

function adicionarEfeitoCards() {
    const cards = document.querySelectorAll('.card, article');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--sombra-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--sombra-md)';
        });
    });
}

function adicionarModalImagens() {
    const imagens = document.querySelectorAll('section img');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
    `;
    
    const imagemModal = document.createElement('img');
    imagemModal.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    const botaoFechar = document.createElement('span');
    botaoFechar.innerHTML = '×';
    botaoFechar.style.cssText = `
        position: absolute;
        top: 20px;
        right: 35px;
        color: #f1f1f1;
        font-size: 50px;
        font-weight: bold;
        cursor: pointer;
    `;
    
    modal.appendChild(imagemModal);
    modal.appendChild(botaoFechar);
    document.body.appendChild(modal);
    
    imagens.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            imagemModal.src = this.src;
            imagemModal.alt = this.alt;
        });
    });
    
    botaoFechar.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
}

function adicionarFiltroVoluntariado() {
    const areasFiltro = document.getElementById('interesse');
    
    if (areasFiltro) {
        areasFiltro.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('input[name="areas"]');
            const disponibilidade = document.getElementById('disponibilidade');
            const diasDisponiveis = document.querySelectorAll('input[name="dias"]');
            
            if (this.value === 'voluntario' || this.value === 'ambos') {
                checkboxes.forEach(cb => {
                    cb.parentElement.parentElement.style.display = 'block';
                });
                if (disponibilidade) {
                    disponibilidade.parentElement.style.display = 'block';
                }
                diasDisponiveis.forEach(dia => {
                    dia.parentElement.parentElement.style.display = 'block';
                });
            } else {
                checkboxes.forEach(cb => {
                    cb.parentElement.parentElement.style.display = 'none';
                    cb.checked = false;
                });
                if (disponibilidade) {
                    disponibilidade.parentElement.style.display = 'none';
                    disponibilidade.value = '';
                }
                diasDisponiveis.forEach(dia => {
                    dia.parentElement.parentElement.style.display = 'none';
                    dia.checked = false;
                });
            }
        });
    }
}

function adicionarTooltips() {
    const campos = document.querySelectorAll('input, select, textarea');
    
    campos.forEach(campo => {
        if (campo.hasAttribute('placeholder') || campo.hasAttribute('pattern')) {
            campo.addEventListener('focus', function() {
                let mensagem = '';
                
                if (this.id === 'cpf') {
                    mensagem = 'Formato: 000.000.000-00';
                } else if (this.id === 'telefone') {
                    mensagem = 'Formato: (00) 00000-0000';
                } else if (this.id === 'cep') {
                    mensagem = 'Formato: 00000-000';
                } else if (this.id === 'email') {
                    mensagem = 'Digite um e-mail válido';
                } else if (this.hasAttribute('placeholder')) {
                    mensagem = this.getAttribute('placeholder');
                }
                
                if (mensagem) {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip-campo';
                    tooltip.textContent = mensagem;
                    tooltip.style.cssText = `
                        position: absolute;
                        background-color: var(--cor-neutra-900);
                        color: var(--cor-branco);
                        padding: 8px 12px;
                        border-radius: var(--raio-borda-sm);
                        font-size: var(--tamanho-fonte-sm);
                        z-index: 1000;
                        margin-top: 5px;
                    `;
                    
                    this.parentElement.style.position = 'relative';
                    this.parentElement.appendChild(tooltip);
                }
            });
            
            campo.addEventListener('blur', function() {
                const tooltip = this.parentElement.querySelector('.tooltip-campo');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        }
    });
}

function adicionarProgressoFormulario() {
    const formulario = document.querySelector('form');
    
    if (!formulario) return;
    
    const fieldsets = formulario.querySelectorAll('fieldset');
    if (fieldsets.length === 0) return;
    
    const barraProgresso = document.createElement('div');
    barraProgresso.style.cssText = `
        position: sticky;
        top: 70px;
        background-color: var(--cor-neutra-100);
        padding: var(--espacamento-sm);
        border-radius: var(--raio-borda-md);
        margin-bottom: var(--espacamento-md);
        z-index: 100;
    `;
    
    const textoProgresso = document.createElement('div');
    textoProgresso.textContent = 'Progresso do cadastro: 0%';
    textoProgresso.style.cssText = `
        font-weight: 600;
        margin-bottom: var(--espacamento-xs);
        color: var(--cor-neutra-900);
    `;
    
    const barraFundo = document.createElement('div');
    barraFundo.style.cssText = `
        width: 100%;
        height: 10px;
        background-color: var(--cor-neutra-300);
        border-radius: 5px;
        overflow: hidden;
    `;
    
    const barraPreenchida = document.createElement('div');
    barraPreenchida.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, var(--cor-primaria), var(--cor-secundaria));
        border-radius: 5px;
        transition: width 0.3s ease;
    `;
    
    barraFundo.appendChild(barraPreenchida);
    barraProgresso.appendChild(textoProgresso);
    barraProgresso.appendChild(barraFundo);
    
    formulario.insertBefore(barraProgresso, formulario.firstChild);
    
    function atualizarProgresso() {
        const camposObrigatorios = formulario.querySelectorAll('input[required], select[required]');
        let camposPreenchidos = 0;
        
        camposObrigatorios.forEach(campo => {
            if (campo.type === 'checkbox' || campo.type === 'radio') {
                const nome = campo.name;
                const algumMarcado = formulario.querySelector(`input[name="${nome}"]:checked`);
                if (algumMarcado && !campo.closest('fieldset').dataset.contado) {
                    camposPreenchidos++;
                    campo.closest('fieldset').dataset.contado = 'true';
                }
            } else if (campo.value.trim() !== '') {
                camposPreenchidos++;
            }
        });
        
        const progresso = Math.round((camposPreenchidos / camposObrigatorios.length) * 100);
        barraPreenchida.style.width = progresso + '%';
        textoProgresso.textContent = `Progresso do cadastro: ${progresso}%`;
    }
    
    formulario.addEventListener('input', atualizarProgresso);
    formulario.addEventListener('change', atualizarProgresso);
}