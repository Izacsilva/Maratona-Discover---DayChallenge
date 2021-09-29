const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },

  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Transaction = {
  /*Funcionalidade do meu app pelo qual eu trato as transações
   * recebendo os valores positivos e negativos na minha table
   * somando a valores positivos para exibir em entradas
   */
  all: [
    {
      description: "Luz",
      amount: -50000,
      date: "10/09/2021",
    },
    {
      description: "Job Freelance",
      amount: 500000,
      date: "15/09/2021",
    },
    {
      description: "Internet",
      amount: -10000,
      date: "16/09/2021",
    },
  ],

  add(transactions) {
    Transaction.all.push(transactions);

    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },

  incomes() {
    let income = 0;
    //pegar todas as transações
    //para cada transação,
    Transaction.all.forEach((transaction) => {
      //se ela for maior que zero
      if (transaction.amount > 0) {
        //somar a uma variavel e retornar a variavel
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    //subitraindo os valores negativos do positivos
    let expense = 0;
    //pegar todas as transações
    //para cada transação,
    Transaction.all.forEach((transaction) => {
      //se ela for menor que zero
      if (transaction.amount < 0) {
        //somar a uma variavel e retornar a variavel
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    //para mostrar o resultado do valor total.
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  //Essa função DOM, executa ações na tela do APP, está diretamente
  //ligada a tratar e contruir elementos no front do meu App.

  transctionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transctionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="remover transações" /></td>
        `;

    return html;
  },
  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    ); //Utils é uma função que formata os valores para moeda BRL
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
  clearTransactions() {
    //limpa a tbody(o corpo da tabela))
    DOM.transctionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100;

    return value
    
  },

  formatDate(date) {
    const splittedDate = date.split("-");

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal =
      Number(value) < 0
        ? "-"
        : ""; /* na const "sinal" é feito a escolha do sinal da operação
        *para ser uma entrada "+"(nesse caso sem sinal) ou "-" referênte a um valor negativo.
        *nesse caso, se o valor que essa variável receber for menor que um número 0 (zero)
        "-10,-7,-1" e não "1,2,20" ela vai adicionar a esse valor "-" e o contrário é "" vazio(positivo).
        */

    value = String(value).replace(/\D/g, ""); //Essa sequência remove qualquer caracter especial

    value = Number(value) / 100; //divide o número por 100

    value = value.toLocaleString("pt-BR", {
      /*Funcionalidade do JS para tratar moedas
       *dos seus respequitivos pais "formatar dinheiro"*/
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  },
};

const Form = {
  /* O objeto "Form" irá receber e manipular os dados da nossa aplicação
  e entregar para o Objeto Transaction, que por sua vez usará o Objeto
  DOM que funcionalidades para escrever essas informações em elementos na nossa tela
  */

  //seleção dos campos de formulários

  description: document.querySelector("input#description"), //propriedade de seleção.
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  /*Abaixo estão as funcionalidades do nosso objeto que irão manipular os dados do formulário*/

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (description.trim() === "" || amount.trim() === "" || date.trim === "") {
      throw new Error("Por favor, preenha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    // Limpa os campos
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    /*
    Ao clicar em salvar, a aplicação irar executar ações
    para tratar os dados fornecido pelo usuário,
    essas ações são executadas passo a passo a baixo chamando funções
    do nosso objeto "Form"
  */
    try {
      Form.validateFields(); //Verificar se todas as informações foram preenchidas
      const transaction = Form.formatValues(); //pegar uma transação formatada
      Transaction.add(transaction); // adicionar as transações
      Form.clearFields(); //apagar os dados do formulário
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
    //formatar os dados para salvar

    /*Etapas da Função:
     
     *formatar os dados para salvar
     *salvar
     *
     *fechar modal
     *Atualizar a aplicação
     */
  },
};
const App = {
  init() {
    Transaction.all.forEach(function (transaction) {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
