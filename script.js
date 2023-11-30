var buttonNovoAgendamento = document.getElementById('buttonNovoAgendamento');
var buttonCancelarAgendamento = document.getElementById('buttonCancelarAgendamento');
var novoAgendamento = document.getElementById('novoAgendamento');
var formNovoAgendamento = document.getElementById('formNovoAgendamento');

var inputCPFCliente = document.getElementById('CPFCliente');
var inputNomeCliente = document.getElementById('nomeCliente');
var inputnomeProcedimento = document.getElementById('nomeProcedimento');
var inputnomeProfissional = document.getElementById('nomeProfissional');
var inputData = document.getElementById('data');

var divMensagemErro = document.getElementById('mensagemErro');
var tabelaAgenda = document.getElementById('tabelaAgenda');

var listaAgenda = [];
var eventoExemplo = {
    cpf: 'Exemplo de CPF',
    nomeCliente: 'Exemplo de nome do cliente',
    nomeProcedimento: 'Exemplo de nome do procedimento',
    nomeProfissional: 'Exemplo de nome do profisional',
    data: new Date(),
}
listaAgenda.push(eventoExemplo);

function removerAgendamento(event){
    var posicao = event.target.getAttribute('data-agendamento');
    listaAgenda.splice(posicao, 1);
    atualizarListaAgenda();
}

function atualizarListaAgenda(){
    console.log('Chamado atualizar tabela eventos!');
    if(listaAgenda.length === 0){
        tabelaAgenda.innerHTML = '<tr><td colspan="3">Nenhum agendamento</td><tr>'
        return;
    }
    tabelaAgenda.innerHTML = '';
    for(var i=0; i<listaAgenda.length; i++){
        var agenda = listaAgenda[i];

        var linha = document.createElement('tr');
        var celulaCPF = document.createElement('td');
        var celulaNomeCliente = document.createElement('td');
        var celulaNomeProcedimento = document.createElement('td');
        var celulaNomeProfissioanl = document.createElement('td');
        var celulaData = document.createElement('td');
        var celulaAcoes = document.createElement('td');

        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-agendamento', i);
        botaoExcluir.innerText = 'Remover';
        celulaAcoes.appendChild(botaoExcluir);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        botaoExcluir.addEventListener('click', removerAgendamento);

        celulaCPF.innerText = agenda.cpf;
        celulaNomeCliente.innerText = agenda.nomeCliente;
        celulaNomeProcedimento.innerText = agenda.nomeProcedimento;
        celulaNomeProfissioanl.innerText = agenda.nomeProfissional;
        celulaData.innerText = agenda.data;

        linha.appendChild(celulaData);
        linha.appendChild(celulaCPF);
        linha.appendChild(celulaNomeCliente);
        linha.appendChild(celulaNomeProcedimento);
        linha.appendChild(celulaNomeProfissioanl);
        linha.appendChild(celulaAcoes);
        tabelaAgenda.appendChild(linha);
    }
}

function limparNovoAgendamento(){
    inputCPFCliente.value = '';
    inputNomeCliente.value = '';
    inputnomeProcedimento.value = '';
    inputnomeProfissional.value = '';
    inputData.value = '';

    inputCPFCliente.classList.remove('is-invalid');
    inputNomeCliente.classList.remove('is-invalid');
    inputnomeProcedimento.classList.remove('is-invalid');
    inputnomeProfissional.classList.remove('is-invalid');
    inputData.classList.remove('is-invalid');
    
    divMensagemErro.innerHTML = '';
    divMensagemErro.classList.add('d-none');
}

function mostrarNovoAgendamento(){ //mostrar formulario com o botão de novo agendamento
    novoAgendamento.classList.remove('d-none');
}

function ocultarNovoAgendamento(){ //ocultar o formulario com o botão cancelar
    novoAgendamento.classList.add('d-none');
    limparNovoAgendamento();
}

function novoAgendamentoValido(CPFCliente, nomeCliente, nomeProcedimento, nomeProfissional, data){ //verificar se uma das infos está vazia ou 
    var validacaoOk = true;
    var erro = '';

    var timestampAgendamento = Date.parse(data);
    var timestampAtual = (new Date()).getTime();

    if(CPFCliente.trim().length === 0){//se o campo não for preenchido
        erro = 'O CPF do cliente é obrigatório!'
        inputCPFCliente.classList.add('is-invalid'); //dispara um alerta
        validacaoOk = false;
    }

    if(nomeCliente.trim().length === 0){
        if(erro.length > 0){
            erro += '<br>'
        }
        erro += 'O nome do cliente é obrigatório!'
        inputNomeCliente.classList.add('is-invalid');
        validacaoOk = false;
    }

    if(nomeProcedimento.trim().length === 0){
        if(erro.length > 0){
            erro += '<br>'
        }
        erro += 'O nome do procedimento é obrigatório!'
        inputnomeProcedimento.classList.add('is-invalid');
        validacaoOk = false;
    }

    if(nomeProfissional.trim().length === 0){
        if(erro.length > 0){
            erro += '<br>'
        }
        erro += 'O nome do profissional é obrigatório!'
        inputnomeProfissional.classList.add('is-invalid');
        validacaoOk = false;
    }

    if(isNaN(timestampAgendamento) || timestampAgendamento < timestampAtual){
        if(erro.length > 0){
            erro += '<br>'
        }
        erro += 'A data do agendamento é obrigatória e deve estar no futuro!'
        inputData.classList.add('is-invalid');
        validacaoOk = false;
    }

    if(!validacaoOk){
        divMensagemErro.innerHTML = erro;
        divMensagemErro.classList.remove('d-none');
    }else{
        divMensagemErro.classList.add('d-none');
    }

    return validacaoOk;
}

function salvarNovoAgendamento(event){
    event.preventDefault();
    var CPFCliente = inputCPFCliente.value;
    var nomeCliente = inputNomeCliente.value;
    var nomeProcedimento = inputnomeProcedimento.value;
    var nomeProfissional = inputnomeProfissional.value;
    var data = inputData.value;
    if(novoAgendamentoValido(CPFCliente, nomeCliente, nomeProcedimento, nomeProfissional, data)){
        console.log('Agendamento válido');
        listaAgenda.push({
            cpf: CPFCliente,
            nomeCliente: nomeCliente,
            nomeProcedimento: nomeProcedimento,
            nomeProfissional: nomeProfissional,
            data: new Date(data),
        });
        atualizarListaAgenda();
        ocultarNovoAgendamento();
    }else{
        console.log('Agendamento inválido');
    }
}

buttonNovoAgendamento.addEventListener('click', mostrarNovoAgendamento);
buttonCancelarAgendamento.addEventListener('click', ocultarNovoAgendamento);
formNovoAgendamento.addEventListener('submit', salvarNovoAgendamento);
window.addEventListener('load', atualizarListaAgenda);
