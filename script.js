/* =========================================================
   C'LOC - SCRIPT.JS
   =========================================================
   TODA A CONFIGURAÇÃO EDITÁVEL DO SITE FICA AQUI.

   Você poderá alterar:
   - WhatsApp
   - Instagram
   - Localização
   - Google Apps Script
   - Nome dos equipamentos
   - Preços
   - Imagens
   - Descrições
   - Status
   - Mensagem de indisponibilidade
   - Mensagem de "Em breve"

   STATUS POSSÍVEIS:
   "disponivel"
   "indisponivel"
   "em-breve"
   ========================================================= */

/* =========================================================
   1. CONFIGURAÇÕES GERAIS
   ========================================================= */

const CONFIG = {
  /*
   * WhatsApp da C'LOC.
   *
   * Número informado:
   * +55 98 8540-5248
   *
   * Para o WhatsApp, usamos somente números.
   */
  whatsapp: "559885405248",

  /*
   * Instagram.
   * Troque quando tiver o endereço oficial.
   */
  instagramUrl: "https://www.instagram.com/cloclocacoes7",

  /*
   * Localização.
   * Coloque aqui o link do Google Maps da empresa.
   */
  locationUrl:
    "https://www.google.com/maps/place/INOVARE+AMBIENTES/@-3.6474758,-45.3783946,19z/data=!4m10!1m2!2m1!1sinovare+ambientes+planejados!3m6!1s0x92ca9d8337f70b87:0x8437b741fe72e6b8!8m2!3d-3.6474757!4d-45.3772684!15sChxpbm92YXJlIGFtYmllbnRlcyBwbGFuZWphZG9zkgENbWlsbHdvcmtfc2hvcOABAA!16s%2Fg%2F11nv2j0vgb?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D",

  /*
   * URL do Google Apps Script.
   *
   * Depois que você configurar o Google Apps Script,
   * cole aqui a URL que termina com /exec.
   */
  googleScriptUrl:
    "https://script.google.com/macros/s/AKfycbycrZ40Ly8XJf3efYtxaUUz63P_ldGddPrGo7k5C47a3pxcrOSWfLiqbygt78E5w5fY/exec",

  /*
   * Mensagem dos botões comuns de WhatsApp.
   *
   * IMPORTANTE:
   * Esta NÃO é a mensagem do orçamento.
   * O orçamento possui uma mensagem própria.
   */
  generalWhatsappMessage:
    "Olá! Gostaria de informações sobre a locação de equipamentos da C'LOC.",
};

/* =========================================================
   2. EQUIPAMENTOS
   =========================================================
   ESTA É A PARTE MAIS FÁCIL DE EDITAR.

   Você possui 10 espaços.

   Atualmente:
   - Equipamentos 01 a 04 = exemplos de equipamentos atuais
   - Equipamentos 05 a 10 = "Em breve"

   Você pode mudar o status de qualquer equipamento.

   ---------------------------------------------------------
   STATUS:

   "disponivel"
      Mostra:
      - Disponível
      - Quantidade
      - Diárias
      - Preço
      - Subtotal

   "indisponivel"
      Mostra:
      - Indisponível
      - Não permite fazer orçamento

   "em-breve"
      Mostra:
      - Imagem EM BREVE
      - Mensagem de lançamento futuro
      - Não permite fazer orçamento
   ========================================================= */

const EQUIPAMENTOS = [
  /* =======================================================
     EQUIPAMENTO 01
     ======================================================= */
  {
    id: 1,

    nome: "MINI CAÇAMBA",

    precoDiaria: 99.9,

    /*
     * Para colocar sua foto:
     * imagem: "assets/equipamento-01.jpg"
     *
     * Se deixar vazio, aparece um placeholder.
     */
    imagem: "assets/mini-caçamba.jpg",

    descricao: "Mais praticidade para sua obra",

    status: "disponivel",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 02
     ======================================================= */
  {
    id: 2,

    nome: "BETONEIRA",

    precoDiaria: 200.0, // Valor exibido antes de selecionar um período.

    // Preços TOTAIS por equipamento para cada período permitido.
    // Para aplicar a mesma lógica a outro equipamento, adicione
    // uma propriedade precosPorPeriodo como esta no cadastro dele.
    precosPorPeriodo: {
      1: 200.0,
      2: 380.0,
      3: 540.0,
      4: 680.0,
      5: 800.0,
      7: 980.0,
      10: 1300.0,
      15: 1800.0,
      20: 2200.0,
      30: 2500.0,
    },

    imagem: "assets/betoneira.jpg",

    descricao: "Mais agilidade para sua construção",

    status: "disponivel",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 03
     ======================================================= */
  {
    id: 3,

    nome: "COMPACTADOR DE SOLO",

    precoDiaria: 220.0,

    imagem: "assets/compactador de solo.jpg",

    descricao: "Máxima compactação para sua obra",

    status: "disponivel",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 04
     ======================================================= */
  {
    id: 4,

    nome: "ANDAIME TUBULAR",

    precoDiaria: 2.0,

    imagem: "assets/andaime.jpg",

    descricao: "Novo equipamento da C'LOC.",

    status: "disponivel",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 05
     ======================================================= */
  {
    id: 5,

    nome: "EM BREVE DIPONÍVEL PARA LOCAÇÃO!",

    precoDiaria: 99.9,

    /*
     * Quando estiver "em-breve", o site usa automaticamente
     * assets/em-breve.svg.
     */
    imagem: "",

    descricao: "Novo equipamento da C'LOC.",

    status: "em-breve",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 06
     ======================================================= */
  {
    id: 6,

    nome: "EM BREVE DIPONÍVEL PARA LOCAÇÃO!",

    precoDiaria: 99.9,

    imagem: "",

    descricao: "Novo equipamento da C'LOC.",

    status: "em-breve",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 07
     ======================================================= */
  {
    id: 7,

    nome: "EM BREVE DIPONÍVEL PARA LOCAÇÃO!",

    precoDiaria: 99.9,

    imagem: "",

    descricao: "Novo equipamento da C'LOC.",

    status: "em-breve",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 08
     ======================================================= */
  {
    id: 8,

    nome: "EM BREVE DIPONÍVEL PARA LOCAÇÃO!",

    precoDiaria: 99.9,

    imagem: "",

    descricao: "Novo equipamento da C'LOC.",

    status: "em-breve",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 09
     ======================================================= */
  {
    id: 9,

    nome: "EM BREVE DIPONÍVEL PARA LOCAÇÃO!",

    precoDiaria: 99.9,

    imagem: "",

    descricao: "Novo equipamento da C'LOC.",

    status: "em-breve",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },

  /* =======================================================
     EQUIPAMENTO 10
     ======================================================= */
  {
    id: 10,

    nome: "EM BREVE DIPONÍVEL PARA LOCAÇÃO!",

    precoDiaria: 99.9,

    imagem: "",

    descricao: "Novo equipamento da C'LOC.",

    status: "em-breve",

    mensagemIndisponivel: "Este equipamento está temporariamente indisponível.",

    mensagemEmBreve: "Este equipamento estará disponível em breve.",
  },
];

/* PREÇOS POR PERÍODO: sem tabela, mantém a diária fixa original. */
function periodosPermitidos(equipamento) {
  return equipamento.precosPorPeriodo
    ? Object.keys(equipamento.precosPorPeriodo)
        .map(Number)
        .sort((a, b) => a - b)
    : null;
}

function precoTotalPorEquipamento(equipamento, diarias) {
  if (equipamento.precosPorPeriodo) {
    return equipamento.precosPorPeriodo[diarias] ?? 0;
  }
  return diarias * equipamento.precoDiaria;
}

function precoDiariaExibido(equipamento, diarias) {
  if (!equipamento.precosPorPeriodo) return equipamento.precoDiaria;
  const periodo = diarias || periodosPermitidos(equipamento)[0];
  return precoTotalPorEquipamento(equipamento, periodo) / periodo;
}

/* =========================================================
   3. ESTADO DO ORÇAMENTO
   ========================================================= */

const estado = {
  itens: {},
};

/* =========================================================
   4. ELEMENTOS DO HTML
   ========================================================= */

const equipmentGrid = document.getElementById("equipmentGrid");

const summaryItems = document.getElementById("summaryItems");

const summaryDays = document.getElementById("summaryDays");

const summaryTotal = document.getElementById("summaryTotal");

const continueQuoteBtn = document.getElementById("continueQuoteBtn");

const customerSection = document.getElementById("cliente");

const customerForm = document.getElementById("customerForm");

const formQuoteItems = document.getElementById("formQuoteItems");

const formQuoteTotal = document.getElementById("formQuoteTotal");

const backToEquipmentBtn = document.getElementById("backToEquipmentBtn");

const instagramLink = document.getElementById("instagramLink");

const locationLink = document.getElementById("locationLink");

const currentYear = document.getElementById("currentYear");

const modal = document.getElementById("messageModal");

const modalTitle = document.getElementById("modalTitle");

const modalMessage = document.getElementById("modalMessage");

const modalClose = document.getElementById("modalClose");

const modalOk = document.getElementById("modalOk");

/* =========================================================
   5. FUNÇÕES AUXILIARES
   ========================================================= */

/**
 * Formata valor para moeda brasileira.
 */
function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Evita inserir HTML diretamente a partir de textos
 * configurados no JavaScript.
 */
function escapeHtml(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Encontra equipamento pelo ID.
 */
function encontrarEquipamento(id) {
  return EQUIPAMENTOS.find((equipamento) => equipamento.id === Number(id));
}

/**
 * Mostra modal.
 */
function mostrarMensagem(titulo, mensagem) {
  modalTitle.textContent = titulo;

  modalMessage.textContent = mensagem;

  modal.classList.remove("hidden");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

/**
 * Fecha modal.
 */
function fecharModal() {
  modal.classList.add("hidden");

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

/* =========================================================
   6. CRIAÇÃO DOS CARDS
   ========================================================= */

function renderizarEquipamentos() {
  equipmentGrid.innerHTML = "";

  EQUIPAMENTOS.forEach((equipamento) => {
    const card = document.createElement("article");

    card.className = "equipment-card";

    card.dataset.id = equipamento.id;

    /*
     * Define imagem.
     *
     * Se for "em-breve", utiliza automaticamente
     * a imagem assets/em-breve.svg.
     */
    let imagemHtml = "";

    if (equipamento.status === "em-breve") {
      imagemHtml = `
          <img
            src="assets/em-breve.svg"
            alt="Equipamento em breve"
            loading="lazy"
          >
        `;
    } else if (equipamento.imagem) {
      imagemHtml = `
          <img
            src="${escapeHtml(equipamento.imagem)}"
            alt="${escapeHtml(equipamento.nome)}"
            loading="lazy"
          >
        `;
    } else {
      imagemHtml = `
          <div class="image-placeholder">
            IMAGEM DO EQUIPAMENTO
          </div>
        `;
    }

    /*
     * Texto do status.
     */
    let statusTexto = "";
    let statusClasse = "";

    if (equipamento.status === "disponivel") {
      statusTexto = "Disponível";
      statusClasse = "status-disponivel";
    } else if (equipamento.status === "indisponivel") {
      statusTexto = "Indisponível";
      statusClasse = "status-indisponivel";
    } else {
      statusTexto = "Em breve";
      statusClasse = "status-em-breve";
    }

    /*
     * Controles só aparecem para equipamentos disponíveis.
     */
    let areaInteracao = "";

    if (equipamento.status === "disponivel") {
      areaInteracao = `

          <div class="equipment-controls">

            <!-- QUANTIDADE -->
            <div class="control">

              <label>
                Quantidade
              </label>

              <div class="number-control">

                <button
                  type="button"
                  class="minus-btn"
                  data-id="${equipamento.id}"
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>

                <input
                  type="number"
                  min="0"
                  max="99"
                  value="0"
                  class="quantity-input"
                  data-id="${equipamento.id}"
                  aria-label="Quantidade"
                >

                <button
                  type="button"
                  class="plus-btn"
                  data-id="${equipamento.id}"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>

              </div>

            </div>


            <!-- DIÁRIAS -->
            <div class="control">

              <label>
                Diárias
              </label>

              ${
                equipamento.precosPorPeriodo
                  ? `
                <select class="days-input" data-id="${equipamento.id}" aria-label="Período de locação">
                  <option value="0">Selecione os dias</option>
                  ${periodosPermitidos(equipamento)
                    .map(
                      (dias) => `
                    <option value="${dias}">${dias} dia${dias === 1 ? "" : "s"}</option>
                  `,
                    )
                    .join("")}
                </select>
              `
                  : `
              <div class="number-control">

                <button
                  type="button"
                  class="minus-day-btn"
                  data-id="${equipamento.id}"
                  aria-label="Diminuir diárias"
                >
                  −
                </button>

                <input
                  type="number"
                  min="0"
                  max="365"
                  value="0"
                  class="days-input"
                  data-id="${equipamento.id}"
                  aria-label="Quantidade de diárias"
                >

                <button
                  type="button"
                  class="plus-day-btn"
                  data-id="${equipamento.id}"
                  aria-label="Aumentar diárias"
                >
                  +
                </button>

              </div>
              `
              }

            </div>

          </div>


          <div class="equipment-subtotal">

            <span>
              Subtotal
            </span>

            <strong
              class="equipment-subtotal-value"
              data-id="${equipamento.id}"
            >
              R$ 0,00
            </strong>

          </div>
        `;
    } else if (equipamento.status === "indisponivel") {
      areaInteracao = `

          <div class="status-message indisponivel">

            ${escapeHtml(equipamento.mensagemIndisponivel)}

          </div>

        `;
    } else {
      areaInteracao = `

          <div class="status-message em-breve">

            ${escapeHtml(equipamento.mensagemEmBreve)}

          </div>

        `;
    }

    /*
     * Preço:
     *
     * Para equipamentos "em breve" ou "indisponíveis",
     * o preço não precisa aparecer.
     *
     * Mesmo assim, o preço continua configurável no JS.
     */
    let precoHtml = "";

    if (equipamento.status === "disponivel") {
      precoHtml = `
          <p class="equipment-price">

            <span class="equipment-daily-value" data-id="${equipamento.id}">${moeda(precoDiariaExibido(equipamento, 0))}</span>

            <small>
              / diária
            </small>

          </p>
        `;
    } else {
      precoHtml = `
          <p class="equipment-price">
            Consulte disponibilidade
          </p>
        `;
    }

    /*
     * Montagem do card.
     */
    card.innerHTML = `

        <div class="equipment-image">

          ${imagemHtml}

          <span class="equipment-number">
            ${String(equipamento.id).padStart(2, "0")}
          </span>

          <span
            class="equipment-status ${statusClasse}"
          >
            ${statusTexto}
          </span>

        </div>


        <div class="equipment-body">

          <h3 class="equipment-title">
            ${escapeHtml(equipamento.nome)}
          </h3>

          ${precoHtml}

          <p class="equipment-description">
            ${escapeHtml(equipamento.descricao)}
          </p>

          ${areaInteracao}

        </div>
      `;

    equipmentGrid.appendChild(card);
  });

  adicionarEventosDosEquipamentos();
}

/* =========================================================
   7. ESTADO DOS EQUIPAMENTOS
   ========================================================= */

function garantirItemNoEstado(id) {
  if (!estado.itens[id]) {
    estado.itens[id] = {
      quantidade: 0,

      diarias: 0,
    };
  }

  return estado.itens[id];
}

/* =========================================================
   8. ALTERAR QUANTIDADE
   ========================================================= */

function alterarQuantidade(id, delta) {
  const equipamento = encontrarEquipamento(id);

  /*
   * Segurança:
   * só equipamento disponível pode entrar no orçamento.
   */
  if (!equipamento || equipamento.status !== "disponivel") {
    return;
  }

  const item = garantirItemNoEstado(id);

  item.quantidade = Math.max(0, Math.min(99, item.quantidade + delta));

  sincronizarCard(id);

  atualizarOrcamento();
}

/* =========================================================
   9. ALTERAR DIÁRIAS
   ========================================================= */

function alterarDiarias(id, delta) {
  const equipamento = encontrarEquipamento(id);

  if (!equipamento || equipamento.status !== "disponivel") {
    return;
  }

  const item = garantirItemNoEstado(id);

  item.diarias = Math.max(0, Math.min(365, item.diarias + delta));

  sincronizarCard(id);

  atualizarOrcamento();
}

/* =========================================================
   10. SINCRONIZAR CARD
   ========================================================= */

function sincronizarCard(id) {
  const item = garantirItemNoEstado(id);

  const quantityInput = document.querySelector(
    `.quantity-input[data-id="${id}"]`,
  );

  const daysInput = document.querySelector(`.days-input[data-id="${id}"]`);

  const card = document.querySelector(`.equipment-card[data-id="${id}"]`);

  const subtotalElement = document.querySelector(
    `.equipment-subtotal-value[data-id="${id}"]`,
  );

  if (!quantityInput || !daysInput || !subtotalElement || !card) {
    return;
  }

  quantityInput.value = item.quantidade;

  daysInput.value = item.diarias;

  const equipamento = encontrarEquipamento(id);

  const subtotal =
    item.quantidade * precoTotalPorEquipamento(equipamento, item.diarias);

  subtotalElement.textContent = moeda(subtotal);

  const precoNoCard = card.querySelector(".equipment-daily-value");
  if (precoNoCard) {
    precoNoCard.textContent = moeda(
      precoDiariaExibido(equipamento, item.diarias),
    );
  }

  if (item.quantidade > 0 && item.diarias > 0) {
    card.classList.add("selected");
  } else {
    card.classList.remove("selected");
  }
}

/* =========================================================
   11. EVENTOS DOS CONTROLES
   ========================================================= */

function adicionarEventosDosEquipamentos() {
  /* Botão + quantidade */
  document.querySelectorAll(".plus-btn").forEach((button) => {
    button.addEventListener("click", () => {
      alterarQuantidade(button.dataset.id, 1);
    });
  });

  /* Botão - quantidade */
  document.querySelectorAll(".minus-btn").forEach((button) => {
    button.addEventListener("click", () => {
      alterarQuantidade(button.dataset.id, -1);
    });
  });

  /* Botão + diária */
  document.querySelectorAll(".plus-day-btn").forEach((button) => {
    button.addEventListener("click", () => {
      alterarDiarias(button.dataset.id, 1);
    });
  });

  /* Botão - diária */
  document.querySelectorAll(".minus-day-btn").forEach((button) => {
    button.addEventListener("click", () => {
      alterarDiarias(button.dataset.id, -1);
    });
  });

  /* Input de quantidade */
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("input", () => {
      const id = Number(input.dataset.id);

      const item = garantirItemNoEstado(id);

      item.quantidade = Math.max(0, Math.min(99, Number(input.value) || 0));

      sincronizarCard(id);

      atualizarOrcamento();
    });
  });

  /* Input de diárias */
  document.querySelectorAll(".days-input").forEach((input) => {
    input.addEventListener(
      input.tagName === "SELECT" ? "change" : "input",
      () => {
        const id = Number(input.dataset.id);

        const item = garantirItemNoEstado(id);

        const equipamento = encontrarEquipamento(id);
        const dias = Number(input.value) || 0;
        item.diarias = equipamento.precosPorPeriodo
          ? periodosPermitidos(equipamento).includes(dias)
            ? dias
            : 0
          : Math.max(0, Math.min(365, dias));

        sincronizarCard(id);

        atualizarOrcamento();
      },
    );
  });
}

/* =========================================================
   12. CALCULAR ORÇAMENTO
   =========================================================
   Fórmula:

   QUANTIDADE × DIÁRIAS × PREÇO DA DIÁRIA

   Exemplo:

   2 equipamentos
   × 5 diárias
   × R$ 99,90

   = R$ 999,00
   ========================================================= */

function calcularOrcamento() {
  let total = 0;

  let quantidadeTotal = 0;

  let maiorQuantidadeDeDiarias = 0;

  const itensSelecionados = [];

  EQUIPAMENTOS.forEach((equipamento) => {
    /*
     * Equipamentos indisponíveis ou em breve
     * nunca entram no orçamento.
     */
    if (equipamento.status !== "disponivel") {
      return;
    }

    const item = estado.itens[equipamento.id];

    if (!item) {
      return;
    }

    if (item.quantidade <= 0 || item.diarias <= 0) {
      return;
    }

    const subtotal =
      item.quantidade * precoTotalPorEquipamento(equipamento, item.diarias);

    total += subtotal;

    quantidadeTotal += item.quantidade;

    maiorQuantidadeDeDiarias = Math.max(maiorQuantidadeDeDiarias, item.diarias);

    itensSelecionados.push({
      id: equipamento.id,

      nome: equipamento.nome,

      quantidade: item.quantidade,

      diarias: item.diarias,

      precoDiaria: precoDiariaExibido(equipamento, item.diarias),

      subtotal: subtotal,
    });
  });

  return {
    itens: itensSelecionados,

    total: total,

    quantidadeTotal: quantidadeTotal,

    maiorQuantidadeDeDiarias: maiorQuantidadeDeDiarias,
  };
}

/* =========================================================
   13. ATUALIZAR RESUMO
   ========================================================= */

function atualizarOrcamento() {
  const orcamento = calcularOrcamento();

  summaryItems.textContent = `${orcamento.quantidadeTotal} equipamento${
    orcamento.quantidadeTotal === 1 ? "" : "s"
  }`;

  summaryDays.textContent = `${orcamento.maiorQuantidadeDeDiarias} diária${
    orcamento.maiorQuantidadeDeDiarias === 1 ? "" : "s"
  }`;

  summaryTotal.textContent = moeda(orcamento.total);

  atualizarResumoDoFormulario();
}

/* =========================================================
   14. RESUMO DO FORMULÁRIO
   ========================================================= */

function atualizarResumoDoFormulario() {
  const orcamento = calcularOrcamento();

  if (orcamento.itens.length === 0) {
    formQuoteItems.innerHTML = `
      <p style="color:#777;">
        Nenhum equipamento selecionado.
      </p>
    `;
  } else {
    formQuoteItems.innerHTML = orcamento.itens
      .map(
        (item) => `

          <div class="form-quote-item">

            <span>

              ${escapeHtml(item.nome)}

              × ${item.quantidade}

              — ${item.diarias}
              diária(s)

            </span>

            <strong>
              ${moeda(item.subtotal)}
            </strong>

          </div>

        `,
      )
      .join("");
  }

  formQuoteTotal.textContent = moeda(orcamento.total);
}

/* =========================================================
   15. VALIDAR ORÇAMENTO
   ========================================================= */

function validarOrcamento() {
  const orcamento = calcularOrcamento();

  if (orcamento.itens.length === 0) {
    mostrarMensagem(
      "Selecione um equipamento",
      "Escolha pelo menos um equipamento disponível e informe a quantidade e as diárias.",
    );

    return false;
  }

  return true;
}

/* =========================================================
   16. CONTINUAR ORÇAMENTO
   ========================================================= */

continueQuoteBtn.addEventListener("click", () => {
  if (!validarOrcamento()) {
    return;
  }

  atualizarResumoDoFormulario();

  customerSection.classList.remove("hidden");

  setTimeout(() => {
    customerSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 50);
});

/* =========================================================
   17. VOLTAR
   ========================================================= */

backToEquipmentBtn.addEventListener("click", () => {
  document.getElementById("equipamentos").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

/* =========================================================
   18. WHATSAPP GERAL
   ========================================================= */

function criarLinkWhatsappGeral() {
  const numero = CONFIG.whatsapp.replace(/\D/g, "");

  const mensagem = encodeURIComponent(CONFIG.generalWhatsappMessage);

  return `https://wa.me/${numero}?text=${mensagem}`;
}

/* =========================================================
   19. MENSAGEM DO ORÇAMENTO
   ========================================================= */

function criarMensagemDoOrcamento(cliente, orcamento) {
  const linhas = [];

  linhas.push("📋 *NOVA SOLICITAÇÃO DE ORÇAMENTO - C'LOC*");

  linhas.push("");

  linhas.push("*DADOS DO CLIENTE*");

  linhas.push(`Nome: ${cliente.nome}`);

  linhas.push(`Telefone: ${cliente.telefone}`);

  linhas.push(`Endereço da obra: ${cliente.endereco}`);

  linhas.push(`Cidade: ${cliente.cidade}`);

  linhas.push("");

  linhas.push("*EQUIPAMENTOS SOLICITADOS*");

  orcamento.itens.forEach((item) => {
    linhas.push(
      `• ${item.nome} | Qtd: ${item.quantidade} | Diárias: ${item.diarias} | ${moeda(item.subtotal)}`,
    );
  });

  linhas.push("");

  linhas.push(`*TOTAL ESTIMADO: ${moeda(orcamento.total)}*`);

  linhas.push("");

  linhas.push(
    "⚠️ O valor é uma estimativa. Dependendo da quantidade de equipamentos e do período de locação, o valor poderá ser negociado.",
  );

  linhas.push("");

  linhas.push("Solicitação enviada pelo site da C'LOC.");

  return linhas.join("\n");
}

/* =========================================================
   20. GOOGLE SHEETS
   ========================================================= */

async function enviarParaGoogleSheets(cliente, orcamento) {
  /*
   * Se a URL ainda não foi configurada,
   * não bloqueia o envio do WhatsApp.
   */
  if (!CONFIG.googleScriptUrl) {
    console.warn("Google Apps Script ainda não configurado.");

    return {
      sucesso: false,
      motivo: "URL do Google Apps Script não configurada.",
    };
  }

  const payload = {
    acao: "novaSolicitacao",

    dataHora: new Date().toISOString(),

    cliente: cliente,

    equipamentos: orcamento.itens,

    totalEstimado: orcamento.total,

    observacao:
      "Valor sujeito a negociação conforme quantidade de equipamentos e período de locação.",
  };

  try {
    await fetch(CONFIG.googleScriptUrl, {
      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },

      body: JSON.stringify(payload),
    });

    return {
      sucesso: true,
    };
  } catch (erro) {
    console.error("Erro no Google Sheets:", erro);

    return {
      sucesso: false,
      motivo: erro.message,
    };
  }
}

/* =========================================================
   21. ENVIO DO FORMULÁRIO
   ========================================================= */

customerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validarOrcamento()) {
    return;
  }

  const orcamento = calcularOrcamento();

  const formData = new FormData(customerForm);

  const cliente = {
    nome: String(formData.get("nome") || "").trim(),

    telefone: String(formData.get("telefone") || "").trim(),

    endereco: String(formData.get("endereco") || "").trim(),

    cidade: String(formData.get("cidade") || "").trim(),
  };

  /*
   * Validação dos campos.
   */
  if (
    !cliente.nome ||
    !cliente.telefone ||
    !cliente.endereco ||
    !cliente.cidade
  ) {
    mostrarMensagem(
      "Preencha os dados",
      "Informe todos os campos obrigatórios para continuar.",
    );

    return;
  }

  /*
   * Envia os dados para o Google Sheets em segundo plano.
   * Não usamos await aqui: o cliente não precisa esperar a resposta
   * da planilha para abrir o WhatsApp.
   */
  enviarParaGoogleSheets(cliente, orcamento).catch((erro) => {
    console.error("Erro ao enviar solicitação para a planilha:", erro);
  });

  /*
   * Cria mensagem específica.
   */
  const mensagem = criarMensagemDoOrcamento(cliente, orcamento);

  /*
   * Número da C'LOC.
   */
  const numero = CONFIG.whatsapp.replace(/\D/g, "");

  /*
   * Link ESPECÍFICO do orçamento.
   */
  const linkWhatsapp = `https://wa.me/${numero}?text=${encodeURIComponent(
    mensagem,
  )}`;

  /*
   * Abre WhatsApp Web ou aplicativo.
   */
  window.open(linkWhatsapp, "_blank", "noopener");
});

/* =========================================================
   22. LINKS DO RODAPÉ
   ========================================================= */

function configurarLinks() {
  /* WhatsApp */

  document.querySelectorAll("[data-whatsapp-general]").forEach((link) => {
    link.href = criarLinkWhatsappGeral();
  });

  /* Instagram */

  instagramLink.href = CONFIG.instagramUrl;

  /* Localização */

  locationLink.href = CONFIG.locationUrl;
}

/* =========================================================
   23. MODAL
   ========================================================= */

modalClose.addEventListener("click", fecharModal);

modalOk.addEventListener("click", fecharModal);

document
  .querySelector(".modal-backdrop")
  .addEventListener("click", fecharModal);

/* =========================================================
   24. INICIALIZAÇÃO
   ========================================================= */

function iniciarSite() {
  currentYear.textContent = new Date().getFullYear();

  renderizarEquipamentos();

  configurarLinks();

  atualizarOrcamento();
}

iniciarSite();
