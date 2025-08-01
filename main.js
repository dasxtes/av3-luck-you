const numeroSenha = document.querySelector('.parametro-senha_texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const botoes = document.querySelectorAll('.parametro-senha_botao'); // Corrigir a seleção para '.parametro-senha_botao'

// Adicionar os eventos de clique corretamente
botoes[0].addEventListener('click', diminuiTamanho); // Botão de diminuição
botoes[1].addEventListener('click', aumentaTamanho); // Botão de aumento

// Selecionando os checkboxes de características da senha
const checkboxMaiusculo = document.querySelector('[name="maiusculo"]');
const checkboxMinusculo = document.querySelector('[name="minusculo"]');
const checkboxNumero = document.querySelector('[name="numero"]');
const checkboxSimbolo = document.querySelector('[name="simbolo"]');

// Função para gerar uma senha aleatória
function gerarSenha() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
    const senha = [];
    const tamanho = parseInt(numeroSenha.textContent);

    // Seleciona as opções de características
    const maiusculo = checkboxMaiusculo.checked;
    const minusculo = checkboxMinusculo.checked;
    const numero = checkboxNumero.checked;
    const simbolo = checkboxSimbolo.checked;

    let caracteresPermitidos = '';

    // Adiciona os caracteres permitidos com base nas opções selecionadas
    if (maiusculo) caracteresPermitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (minusculo) caracteresPermitidos += 'abcdefghijklmnopqrstuvwxyz';
    if (numero) caracteresPermitidos += '0123456789';
    if (simbolo) caracteresPermitidos += '!@#$%^&*()_-+=<>?';

    // Se não houver caracteres permitidos selecionados
    if (caracteresPermitidos === '') {
        alert("Selecione pelo menos uma característica para a senha.");
        return;
    }

    // Gera a senha aleatória
    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteresPermitidos.length);
        senha.push(caracteresPermitidos[indice]);
    }

    // Exibe a senha gerada no campo de entrada
    document.getElementById('campo_senha').value = senha.join('');
}

// Função para atualizar o número de caracteres
function diminuiTamanho() {
    if (tamanhoSenha > 6) { // Garantir que o tamanho não vá abaixo de 6
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();  // Atualiza a senha após alteração no número de caracteres
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) { // Garantir que o tamanho não ultrapasse 20
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();  // Atualiza a senha após alteração no número de caracteres
}

// Adicionar eventos de mudança nos checkboxes
checkboxMaiusculo.addEventListener('change', gerarSenha);
checkboxMinusculo.addEventListener('change', gerarSenha);
checkboxNumero.addEventListener('change', gerarSenha);
checkboxSimbolo.addEventListener('change', gerarSenha);

// Gera uma senha inicial quando a página carrega
window.onload = gerarSenha;

console.log(botoes); // Para verificar se os botões estão sendo selecionados corretamente
