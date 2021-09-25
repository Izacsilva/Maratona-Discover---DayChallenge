const Modal = {
    open(){
        document.querySelector(".modal-overlay")
        .classList
        .add("active")
       
    },
    
    close(){
        document.querySelector(".modal-overlay")
        .classList
        .remove("active")
        
    }
}

const transaction = [
    {
        id: 1,
        description: "Luz",
        amount: -50000,
        date: "10/09/2021",
    },        
    {
        id: 2,
        description: "Job Freelance",
        amount: 500000,
        date: "15/09/2021",
    },        
    {
        id: 3,
        description: "Internet",
        amount: -10000,
        date: "16/09/2021",
    },        
]


const Transaction = { /*Funcionalidade do meu app pelo qual eu trato as transações
    * recebendo os valores positivos e negativos na minha table
    * somando a valores positivos para exibir em entradas
    */
    all: transaction,

    add(transactions){
        Transaction.all.push(transactions)

        console.log(Transaction.all)
    },
    incomes() {
        let income = 0;
            //pegar todas as transações
            //para cada transação,
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if( transaction.amount > 0 ) {
                //somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() { //subitraindo os valores negativos do positivos
        let expense = 0;
            //pegar todas as transações
            //para cada transação,
        Transaction.all.forEach(transaction => {
            //se ela for menor que zero
            if( transaction.amount < 0 ) {
                //somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense;
    
    },

    total() { //para mostrar o resultado do valor total.
        return Transaction.incomes() + Transaction.expenses()

         
    }
}

const DOM = { //Essa função DOM, executa ações na tela do APP, está diretamente
    //ligada a tratar e contruir elementos no front do meu App.
    
    transctionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
        
        const tr = document.createElement("tr");
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        
        DOM.transctionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = 
        `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="remover transações" /></td>
        `
            
        return html
    },
    updateBalance() {
        document.getElementById("incomeDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.incomes()); //Utils é uma função que formata os valores para moeda BRL
        document.getElementById("expenseDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById("totalDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value) {
        
        const signal = Number(value) < 0 ? "-" : "" /* na const "sinal" é feito a escolha do sinal da operação
        *para ser uma entrada "+"(nesse caso sem sinal) ou "-" referênte a um valor negativo.
        *nesse caso, se o valor que essa variável receber for menor que um número 0 (zero)
        "-10,-7,-1" e não "1,2,20" ela vai adicionar a esse valor "-" e o contrário é "" vazio(positivo).
        */

        value = String(value).replace(/\D/g, "") //Essa sequência remove qualquer caracter especial

        value = Number(value) / 100 //divide o número por 100

        value = value.toLocaleString("pt-BR", { /*Funcionalidade do JS para tratar moedas
             *dos seus respequitivos pais "formatar dinheiro"*/
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

Transaction.add( {
    id: 30,
    description: "novoObjeto",
    amount: 00,
    date: "23/10/2021"

}

)

transaction.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
