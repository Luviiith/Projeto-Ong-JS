function aplicarMascaraCPF(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return valor;
}

function aplicarMascaraTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    return valor;
}

function aplicarMascaraCEP(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    return valor;
}

function configurarMascaras() {
    const campoCPF = document.getElementById('cpf');
    if (campoCPF) {
        campoCPF.addEventListener('input', function(e) {
            e.target.value = aplicarMascaraCPF(e.target.value);
        });
    }
    
    const campoTelefone = document.getElementById('telefone');
    if (campoTelefone) {
        campoTelefone.addEventListener('input', function(e) {
            e.target.value = aplicarMascaraTelefone(e.target.value);
        });
    }
    
    const campoCEP = document.getElementById('cep');
    if (campoCEP) {
        campoCEP.addEventListener('input', function(e) {
            e.target.value = aplicarMascaraCEP(e.target.value);
        });
    }
}