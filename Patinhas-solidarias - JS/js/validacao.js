function validarNome(nome) {
    if (nome.length < 3) {
        return { valido: false, mensagem: "O nome deve ter no mínimo 3 caracteres" };
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
        return { valido: false, mensagem: "O nome deve conter apenas letras" };
    }
    return { valido: true };
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return { valido: false, mensagem: "Digite um e-mail válido" };
    }
    return { valido: true };
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) {
        return { valido: false, mensagem: "CPF deve conter 11 dígitos" };
    }
    
    if (/^(\d)\1{10}$/.test(cpf)) {
        return { valido: false, mensagem: "CPF inválido" };
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto >= 10 ? 0 : resto;
    
    if (digito1 !== parseInt(cpf.charAt(9))) {
        return { valido: false, mensagem: "CPF inválido" };
    }
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto >= 10 ? 0 : resto;
    
    if (digito2 !== parseInt(cpf.charAt(10))) {
        return { valido: false, mensagem: "CPF inválido" };
    }
    
    return { valido: true };
}

function validarTelefone(telefone) {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length !== 11) {
        return { valido: false, mensagem: "Telefone deve ter 11 dígitos (DDD + número)" };
    }
    return { valido: true };
}

function validarDataNascimento(data) {
    const dataNascimento = new Date(data);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    
    if (idade < 18) {
        return { valido: false, mensagem: "Você deve ter pelo menos 18 anos" };
    }
    
    if (idade > 120) {
        return { valido: false, mensagem: "Data de nascimento inválida" };
    }
    
    return { valido: true };
}

function validarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
        return { valido: false, mensagem: "CEP deve ter 8 dígitos" };
    }
    return { valido: true };
}

function exibirErro(campo, mensagem) {
    const campoErro = document.getElementById(`erro-${campo.id}`);
    
    if (campoErro) {
        campoErro.textContent = mensagem;
        campoErro.style.display = 'block';
    } else {
        const novoErro = document.createElement('span');
        novoErro.id = `erro-${campo.id}`;
        novoErro.className = 'mensagem-erro';
        novoErro.textContent = mensagem;
        novoErro.style.color = 'var(--cor-erro)';
        novoErro.style.fontSize = 'var(--tamanho-fonte-sm)';
        novoErro.style.display = 'block';
        novoErro.style.marginTop = '4px';
        campo.parentNode.appendChild(novoErro);
    }
    
    campo.style.borderColor = 'var(--cor-erro)';
}

function removerErro(campo) {
    const campoErro = document.getElementById(`erro-${campo.id}`);
    if (campoErro) {
        campoErro.style.display = 'none';
    }
    campo.style.borderColor = 'var(--cor-sucesso)';
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    let resultado;
    
    switch(campo.id) {
        case 'nome':
            resultado = validarNome(valor);
            break;
        case 'email':
            resultado = validarEmail(valor);
            break;
        case 'cpf':
            resultado = validarCPF(valor);
            break;
        case 'telefone':
            resultado = validarTelefone(valor);
            break;
        case 'dataNascimento':
            resultado = validarDataNascimento(valor);
            break;
        case 'cep':
            resultado = validarCEP(valor);
            break;
        case 'endereco':
        case 'bairro':
        case 'cidade':
            if (valor.length < 3) {
                resultado = { valido: false, mensagem: "Este campo deve ter no mínimo 3 caracteres" };
            } else {
                resultado = { valido: true };
            }
            break;
        default:
            if (campo.hasAttribute('required') && valor === '') {
                resultado = { valido: false, mensagem: "Este campo é obrigatório" };
            } else {
                resultado = { valido: true };
            }
    }
    
    if (resultado.valido) {
        removerErro(campo);
        return true;
    } else {
        exibirErro(campo, resultado.mensagem);
        return false;
    }
}

function validarFormulario(formulario) {
    let formularioValido = true;
    const campos = formulario.querySelectorAll('input[required], select[required], textarea[required]');
    
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            formularioValido = false;
        }
    });
    
    const interesse = formulario.querySelector('#interesse');
    if (interesse && interesse.value === '') {
        exibirErro(interesse, 'Selecione uma opção');
        formularioValido = false;
    }
    
    const genero = formulario.querySelector('#genero');
    if (genero && genero.value === '') {
        exibirErro(genero, 'Selecione uma opção');
        formularioValido = false;
    }
    
    const estado = formulario.querySelector('#estado');
    if (estado && estado.value === '') {
        exibirErro(estado, 'Selecione um estado');
        formularioValido = false;
    }
    
    const experiencia = formulario.querySelector('input[name="experiencia"]:checked');
    if (!experiencia) {
        const radioGroup = formulario.querySelector('input[name="experiencia"]');
        if (radioGroup) {
            exibirErro(radioGroup, 'Selecione uma opção');
            formularioValido = false;
        }
    }
    
    const preferenciaContato = formulario.querySelector('input[name="preferencia-contato"]:checked');
    if (!preferenciaContato) {
        const radioGroup = formulario.querySelector('input[name="preferencia-contato"]');
        if (radioGroup) {
            exibirErro(radioGroup, 'Selecione uma preferência de contato');
            formularioValido = false;
        }
    }
    
    const termos = formulario.querySelector('#termos');
    if (termos && !termos.checked) {
        exibirErro(termos, 'Você deve aceitar os termos de uso');
        formularioValido = false;
    }
    
    const veracidade = formulario.querySelector('#veracidade');
    if (veracidade && !veracidade.checked) {
        exibirErro(veracidade, 'Você deve confirmar a veracidade das informações');
        formularioValido = false;
    }
    
    return formularioValido;
}