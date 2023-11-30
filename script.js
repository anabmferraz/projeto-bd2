var buttonNovoAgendamento = document.getElementById('buttonNovoAgendamento');
var buttonCancelarAgendamento = document.getElementById('buttonCancelarAgendamento');
var novoAgendamento = document.getElementById('novoAgendamento');
var formNovoAgendamento = document.getElementById('formNovoAgendamento');

var inputCPFCliente = document.getElementById("CPFCliente");
var inputNomeCliente = document.getElementById("nomeCliente");
var inputNomeProcedimento = document.getElementById('nomeProcedimento');
var inputNomeProfissional = document.getElementById('nomeProfissional');
var inputData = document.getElementById('data');


function mostrarNovoAgendamento(){ //mostrar formulario com o botão de novo agendamento
    novoAgendamento.classList.remove('d-none');
}

function ocultarNovoAgendamento(){ //ocultar o formulario com o botão cancelar
    novoAgendamento.classList.add('d-none');
}

function novoAgendamentoValido(CPFCliente, nomeCliente, nomeProcedimento, nomeProfissional, data){
    //CPF vazio
    //nome cliente vazio
    //nome do procediemento vazio
    //nome do profissional vazio
    //data e hora vazia
    return true;
}

function salvarNovoAgendamento(event){
    event.preventDefault();
    var CPFCliente = inputCPFCliente;
    var nomeCliente = inputNomeCliente;
    var nomeProcedimento = inputNomeProcedimento;
    var nomeProfissional = inputNomeProfissional;
    var data = new Date(inputData.value);

    if(novoAgendamentoValido(CPFCliente, nomeCliente, nomeProcedimento, nomeProfissional, data)){
        console.log('Informações validas!');
    }else{
        console.log("Informações invalidas!");
    }
}

buttonNovoAgendamento.addEventListener('click', mostrarNovoAgendamento);
buttonCancelarAgendamento.addEventListener('click', ocultarNovoAgendamento);
formNovoAgendamento.addEventListener('submit', salvarNovoAgendamento);