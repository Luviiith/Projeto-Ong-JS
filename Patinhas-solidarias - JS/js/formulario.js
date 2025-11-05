function salvarDadosFormulario(formulario) {
    const dados = {};
    const campos = formulario.querySelectorAll('input, select, textarea');
    
    campos.forEach(campo => {
        if (campo.type === 'checkbox') {
            if (campo.name === 'areas' || campo.name === 'dias') {
                if (!dados[campo.name]) {
                    dados[campo.name] = [];
                }
                if (campo.checked) {
                    dados[campo.name].push(campo.value);
                }
            } else {
                dados[campo.id] = campo.checked;
            }
        } else if (campo.type === 'radio') {
            if (campo.checked) {
                dados[campo.name] = campo.value;
            }
        } else {
            dados[campo.id] = campo.value;
        }
    });
    
    localStorage.setItem('dadosVoluntario', JSON.stringify(dados));
    localStorage.setItem('dataEnvio', new Date().toISOString());
    
    return dados;
}

function carregarDadosFormulario(formulario) {
    const dadosSalvos = localStorage.getItem('dadosVoluntario');
    
    if (!dadosSalvos) {
        return false;
    }
    
    const dados = JSON.parse(dadosSalvos);
    
    Object.keys(dados).forEach(key => {
        const campo = formulario.querySelector(`#${key}`);
        
        if (campo) {
            if (campo.type === 'checkbox') {
                campo.checked = dados[key];
            } else if (campo.type === 'radio') {
                const radio = formulario.querySelector(`input[name="${key}"][value="${dados[key]}"]`);
                if (radio) {
                    radio.checked = true;
                }
            } else {
                campo.value = dados[key];
            }
        }
        
        if (key === 'areas' || key === 'dias') {
            dados[key].forEach(valor => {
                const checkbox = formulario.querySelector(`input[name="${key}"][value="${valor}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    });
    
    return true;
}

function limparDadosSalvos() {
    localStorage.removeItem('dadosVoluntario');
    localStorage.removeItem('dataEnvio');
}

function exibirMensagemSucesso() {
    const mensagem = document.createElement('div');
    mensagem.className = 'alert alert-success';
    mensagem.innerHTML = `
        <strong>Cadastro enviado com sucesso!</strong>
        <p>Obrigado por se cadastrar. Entraremos em contato em breve.</p>
    `;
    mensagem.style.position = 'fixed';
    mensagem.style.top = '20px';
    mensagem.style.right = '20px';
    mensagem.style.zIndex = '9999';
    mensagem.style.maxWidth = '400px';
    mensagem.style.animation = 'slideIn 0.5s ease';
    
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            mensagem.remove();
        }, 500);
    }, 5000);
}

function configurarFormulario() {
    const formulario = document.querySelector('form');
    
    if (!formulario) {
        return;
    }
    
    const camposValidacao = formulario.querySelectorAll('input[required], select[required]');
    camposValidacao.forEach(campo => {
        campo.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        campo.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validarCampo(this);
            }
        });
    });
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario(formulario)) {
            const dados = salvarDadosFormulario(formulario);
            
            console.log('Dados do formulário:', dados);
            
            exibirMensagemSucesso();
            
            setTimeout(() => {
                formulario.reset();
                limparDadosSalvos();
                window.location.href = 'index.html';
            }, 3000);
        } else {
            const primeiroErro = formulario.querySelector('.mensagem-erro[style*="display: block"]');
            if (primeiroErro) {
                primeiroErro.parentElement.querySelector('input, select, textarea').focus();
            }
            
            const mensagemErro = document.createElement('div');
            mensagemErro.className = 'alert alert-error';
            mensagemErro.innerHTML = `
                <strong>Erro no formulário!</strong>
                <p>Por favor, corrija os campos destacados em vermelho.</p>
            `;
            mensagemErro.style.position = 'fixed';
            mensagemErro.style.top = '20px';
            mensagemErro.style.right = '20px';
            mensagemErro.style.zIndex = '9999';
            mensagemErro.style.maxWidth = '400px';
            
            document.body.appendChild(mensagemErro);
            
            setTimeout(() => {
                mensagemErro.remove();
            }, 5000);
        }
    });
    
    const botaoLimpar = formulario.querySelector('button[type="reset"]');
    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', function() {
            setTimeout(() => {
                const erros = formulario.querySelectorAll('.mensagem-erro');
                erros.forEach(erro => erro.remove());
                
                const campos = formulario.querySelectorAll('input, select, textarea');
                campos.forEach(campo => {
                    campo.style.borderColor = '';
                });
            }, 10);
        });
    }
    
    if (window.location.search.includes('recuperar=true')) {
        carregarDadosFormulario(formulario);
    }
}