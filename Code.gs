/**
 * C'LOC - GOOGLE APPS SCRIPT
 *
 * Abas:
 * SOLICITAÇÕES
 * APROVADOS
 *
 * A solicitação recebida pelo site entra em SOLICITAÇÕES.
 * Ao aprovar uma linha, ela é copiada para APROVADOS e
 * continua em SOLICITAÇÕES como histórico.
 */

const NOME_ABA_SOLICITACOES = "SOLICITAÇÕES";
const NOME_ABA_APROVADOS = "APROVADOS";

const CABECALHOS = [
  "ID",
  "DATA/HORA",
  "NOME",
  "TELEFONE",
  "ENDEREÇO DA OBRA",
  "CIDADE",
  "EQUIPAMENTOS",
  "TOTAL ESTIMADO",
  "OBSERVAÇÃO",
  "STATUS",
  "DATA APROVAÇÃO"
];


/* Cria menu administrativo ao abrir a planilha. */
function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("C'LOC")
    .addItem("Configurar abas", "configurarAbas")
    .addItem(
      "Aprovar solicitação selecionada",
      "aprovarSolicitacaoSelecionada"
    )
    .addToUi();
}


/* Cria as duas abas e seus cabeçalhos. */
function configurarAbas() {

  const planilha =
    SpreadsheetApp.getActiveSpreadsheet();

  let solicitacoes =
    planilha.getSheetByName(
      NOME_ABA_SOLICITACOES
    );

  let aprovados =
    planilha.getSheetByName(
      NOME_ABA_APROVADOS
    );


  if (!solicitacoes) {
    solicitacoes =
      planilha.insertSheet(
        NOME_ABA_SOLICITACOES
      );
  }


  if (!aprovados) {
    aprovados =
      planilha.insertSheet(
        NOME_ABA_APROVADOS
      );
  }


  configurarCabecalho(solicitacoes);
  configurarCabecalho(aprovados);


  SpreadsheetApp.getUi().alert(
    "C'LOC",
    "As abas SOLICITAÇÕES e APROVADOS foram configuradas.",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}


/* Cria cabeçalho se a aba estiver vazia. */
function configurarCabecalho(aba) {

  if (aba.getLastRow() === 0) {

    aba
      .getRange(
        1,
        1,
        1,
        CABECALHOS.length
      )
      .setValues([CABECALHOS]);

    aba.setFrozenRows(1);
  }
}


/* Recebe a solicitação enviada pelo site. */
function doPost(e) {

  try {

    const dados =
      JSON.parse(
        e.postData.contents
      );


    if (
      dados.acao !==
      "novaSolicitacao"
    ) {

      return respostaJson({
        sucesso: false,
        mensagem:
          "Ação não reconhecida."
      });
    }


    registrarSolicitacao(dados);


    return respostaJson({
      sucesso: true,
      mensagem:
        "Solicitação registrada."
    });


  } catch (erro) {

    console.error(erro);


    return respostaJson({
      sucesso: false,
      mensagem:
        erro.message
    });
  }
}


/* Grava uma nova solicitação na aba SOLICITAÇÕES. */
function registrarSolicitacao(dados) {

  const planilha =
    SpreadsheetApp.getActiveSpreadsheet();


  let aba =
    planilha.getSheetByName(
      NOME_ABA_SOLICITACOES
    );


  if (!aba) {

    aba =
      planilha.insertSheet(
        NOME_ABA_SOLICITACOES
      );

    configurarCabecalho(aba);
  }


  const id =
    "CLOC-" +
    Utilities
      .getUuid()
      .substring(0, 8)
      .toUpperCase();


  const dataHora =
    new Date();


  const cliente =
    dados.cliente || {};


  const equipamentos =
    dados.equipamentos || [];


  const equipamentosTexto =
    equipamentos
      .map(
        item =>
          `${item.nome} | Qtd: ${item.quantidade} | Diárias: ${item.diarias} | Subtotal: ${formatarMoeda(item.subtotal)}`
      )
      .join("\n");


  const linha = [

    id,

    dataHora,

    cliente.nome || "",

    cliente.telefone || "",

    cliente.endereco || "",

    cliente.cidade || "",

    equipamentosTexto,

    Number(
      dados.totalEstimado || 0
    ),

    dados.observacao || "",

    "PENDENTE",

    ""
  ];


  aba.appendRow(linha);


  const ultimaLinha =
    aba.getLastRow();


  aba
    .getRange(
      ultimaLinha,
      8
    )
    .setNumberFormat(
      'R$ #,##0.00'
    );


  aba
    .getRange(
      ultimaLinha,
      7
    )
    .setWrap(true);
}


/* Aprova uma solicitação selecionada na planilha. */
function aprovarSolicitacaoSelecionada() {

  const planilha =
    SpreadsheetApp.getActiveSpreadsheet();


  const abaOrigem =
    planilha.getActiveSheet();


  if (
    abaOrigem.getName() !==
    NOME_ABA_SOLICITACOES
  ) {

    SpreadsheetApp.getUi().alert(
      "Selecione uma linha na aba SOLICITAÇÕES."
    );

    return;
  }


  const linhaSelecionada =
    abaOrigem
      .getActiveRange()
      .getRow();


  if (
    linhaSelecionada <= 1
  ) {

    SpreadsheetApp.getUi().alert(
      "Selecione uma solicitação abaixo do cabeçalho."
    );

    return;
  }


  const valores =
    abaOrigem
      .getRange(
        linhaSelecionada,
        1,
        1,
        CABECALHOS.length
      )
      .getValues()[0];


  if (
    String(valores[9])
      .toUpperCase() ===
    "APROVADO"
  ) {

    SpreadsheetApp.getUi().alert(
      "Esta solicitação já está aprovada."
    );

    return;
  }


  const ui =
    SpreadsheetApp.getUi();


  const confirmacao =
    ui.alert(
      "Aprovar solicitação?",
      `Deseja aprovar a solicitação ${valores[0]}?`,
      ui.ButtonSet.YES_NO
    );


  if (
    confirmacao !==
    ui.Button.YES
  ) {

    return;
  }


  const dataAprovacao =
    new Date();


  /* Mantém o histórico na aba SOLICITAÇÕES. */
  abaOrigem
    .getRange(
      linhaSelecionada,
      10
    )
    .setValue(
      "APROVADO"
    );


  abaOrigem
    .getRange(
      linhaSelecionada,
      11
    )
    .setValue(
      dataAprovacao
    );


  /* Copia para APROVADOS. */
  const abaAprovados =
    planilha.getSheetByName(
      NOME_ABA_APROVADOS
    ) ||
    planilha.insertSheet(
      NOME_ABA_APROVADOS
    );


  configurarCabecalho(
    abaAprovados
  );


  abaAprovados.appendRow(
    valores
  );


  const novaLinha =
    abaAprovados.getLastRow();


  abaAprovados
    .getRange(
      novaLinha,
      10
    )
    .setValue(
      "APROVADO"
    );


  abaAprovados
    .getRange(
      novaLinha,
      11
    )
    .setValue(
      dataAprovacao
    );


  abaAprovados
    .getRange(
      novaLinha,
      8
    )
    .setNumberFormat(
      'R$ #,##0.00'
    );


  ui.alert(
    "Solicitação aprovada",
    "A solicitação foi copiada para APROVADOS e permaneceu em SOLICITAÇÕES como histórico.",
    ui.ButtonSet.OK
  );
}


/* Retorna JSON para o site. */
function respostaJson(objeto) {

  return ContentService
    .createTextOutput(
      JSON.stringify(objeto)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}


/* Formata valores monetários. */
function formatarMoeda(valor) {

  return Number(valor || 0)
    .toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    );
}
