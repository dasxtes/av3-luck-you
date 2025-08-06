const numeroSenha = document.querySelector('.parametro-senha_texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const botoes = document.querySelectorAll('.parametro-senha_botao');

// Selecionando os checkboxes
const checkboxMaiusculo = document.querySelector('[name="maiusculo"]');
const checkboxMinusculo = document.querySelector('[name="minusculo"]');
const checkboxNumero = document.querySelector('[name="numero"]');
const checkboxSimbolo = document.querySelector('[name="simbolo"]');

// Adiciona eventos aos botões com base no atributo data-action
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        if (botao.dataset.action === 'diminuir') diminuiTamanho();
        else if (botao.dataset.action === 'aumentar') aumentaTamanho();
    });
});

// Gera a senha
function gerarSenha() {
    const senha = [];
    const tamanho = parseInt(numeroSenha.textContent);

    const maiusculo = checkboxMaiusculo.checked;
    const minusculo = checkboxMinusculo.checked;
    const numero = checkboxNumero.checked;
    const simbolo = checkboxSimbolo.checked;

    let caracteresPermitidos = '';

    if (maiusculo) caracteresPermitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (minusculo) caracteresPermitidos += 'abcdefghijklmnopqrstuvwxyz';
    if (numero) caracteresPermitidos += '0123456789';
    if (simbolo) caracteresPermitidos += '!@#$%^&*()_-+=<>?';

    if (caracteresPermitidos === '') {
        alert("Selecione pelo menos uma característica para a senha.");
        return;
    }

    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteresPermitidos.length);
        senha.push(caracteresPermitidos[indice]);
    }

    document.getElementById('campo_senha').value = senha.join('');
    avaliarForcaSenha();
}

// Atualiza o tamanho da senha
function diminuiTamanho() {
    if (tamanhoSenha > 6) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();
}

// Avalia a força da senha com base nos tipos e tamanho
function avaliarForcaSenha() {
    const forcaDiv = document.querySelector('.forca');
    let nivel = 0;

    const maiusculo = checkboxMaiusculo.checked;
    const minusculo = checkboxMinusculo.checked;
    const numero = checkboxNumero.checked;
    const simbolo = checkboxSimbolo.checked;

    if (maiusculo) nivel++;
    if (minusculo) nivel++;
    if (numero) nivel++;
    if (simbolo) nivel++;

    const tamanho = parseInt(numeroSenha.textContent);
    if (tamanho >= 16) {
        nivel += 2;
    } else if (tamanho >= 12) {
        nivel += 1;
    }

    forcaDiv.className = 'forca';

    if (nivel <= 2) {
        forcaDiv.style.width = '33%';
        forcaDiv.style.backgroundColor = 'red';
    } else if (nivel <= 4) {
        forcaDiv.style.width = '66%';
        forcaDiv.style.backgroundColor = 'orange';
    } else {
        forcaDiv.style.width = '100%';
        forcaDiv.style.backgroundColor = 'green';
    }
}

// Gera nova senha ao alterar checkboxes
checkboxMaiusculo.addEventListener('change', gerarSenha);
checkboxMinusculo.addEventListener('change', gerarSenha);
checkboxNumero.addEventListener('change', gerarSenha);
checkboxSimbolo.addEventListener('change', gerarSenha);

// Gera senha inicial
window.onload = gerarSenha;
