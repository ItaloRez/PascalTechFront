describe("Teste com cypress", () => {
  it("Acessar a página principal", () => {
    cy.visit("http://localhost:3000"); // Visita a página principal
  });

  it("Verificar carrinho de compras vazio ao acessar a página", () => {
    cy.visit("http://localhost:3000"); // Visita a página principal
    cy.get(".styles_headerButtons__ZYiV9 > :nth-child(1)").click(); // Clica no botão de carrinho de compras
    cy.get(".css-17ffvgn-MuiTypography-root").should(
      "contain",
      "Carrinho Vazio"
    ); // Verifica se o texto "Carrinho Vazio" está na página
  });

  it("Verificar se inicia deslogado", () => {
    cy.visit("http://localhost:3000"); // Visita a página principal
    cy.get(".styles_headerButtons__ZYiV9 > :nth-child(2)").click(); // Clica no botão de login
    cy.get(".MuiTypography-root").should("contain", "Login"); // Verifica se o texto "Login" está na página
  });

  it(
    "Verifica se adiciona um produto ao carrinho",
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.visit("http://localhost:3000"); // Visita a página principal
      cy.get(".styles_cards__5EoDT > :nth-child(1)").click(); // Clica no primeiro produto
      cy.get(".styles_infosContainer__2DeIF > h2")
        .invoke("text")
        .then((text) => {
          const name = text.replace("<h2>", "").replace("</h2>", ""); // Pega o nome do produto

          cy.get(".styles_infosContainer__2DeIF > button").click(); // Clica no botão de adicionar ao carrinho
          cy.get(".styles_headerButtons__ZYiV9 > :nth-child(1)").click(); // Clica no botão de carrinho de compras
          cy.get(
            ".styles_produto__0XPy5 > :nth-child(1) > :nth-child(1)"
          ).should("contain", name); // Verifica se o nome do produto está na página
        });
    }
  );

  it(
    "Finaliza a compra e verifica se produto adicionado no carrinho está presente",
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.visit("http://localhost:3000"); // Visita a página principal
      cy.get(".styles_cards__5EoDT > :nth-child(1)").click(); // Clica no primeiro produto
      cy.get(".styles_infosContainer__2DeIF > h2")
        .invoke("text")
        .then((text) => {
          const name = text.replace("<h2>", "").replace("</h2>", ""); // Pega o nome do produto

          cy.get(".styles_infosContainer__2DeIF > button").click(); // Clica no botão de adicionar ao carrinho
          cy.get(".styles_headerButtons__ZYiV9 > :nth-child(1)").click(); // Clica no botão de carrinho de compras
          cy.get(".MuiPaper-root > .MuiButton-root").click(); // Clica no botão de finalizar compra
          cy.get(".styles_buyInfo__q1NT5 > :nth-child(1) > h3").should(
            "contain",
            name
          ); // Verifica se o nome do produto está na página
        });
    }
  );

  it("Remover item do carrinho de compra e verificar se ele fica vazio", () => {
    cy.visit("http://localhost:3000"); // Visita a página principal
    cy.get(".styles_cards__5EoDT > :nth-child(1)").click(); // Clica no primeiro produto

    cy.get(".styles_infosContainer__2DeIF > button").click(); // Clica no botão de adicionar ao carrinho
    cy.get(".styles_headerButtons__ZYiV9 > :nth-child(1)").click(); // Clica no botão de carrinho de compras
    cy.get(".MuiIconButton-sizeSmall").click(); // Clica no botão de remover item do carrinho
    cy.get(".css-17ffvgn-MuiTypography-root").should(
      "contain",
      "Carrinho Vazio"
    ); // Verifica se o texto "Carrinho Vazio" está na página
  });

  it("Verificar se o botão de login funciona", () => {
    cy.visit("http://localhost:3000"); // Visita a página principal
    cy.get(".styles_headerButtons__ZYiV9 > :nth-child(2)").click(); // Clica no botão de login
    cy.get(":nth-child(1) > .MuiInputBase-root > #outlined-basic").type(
      "joao@email.com"
    ); // Digita o email
    cy.get(":nth-child(2) > .MuiInputBase-root > #outlined-basic").type(
      "123456"
    ); // Digita a senha
    cy.get(".MuiButtonBase-root").click(); // Clica no botão de login
    cy.wait(2100); // Espera 2.1 segundos
    cy.contains("Funções admin").should("be.visible"); // Verifica se o texto "Funções admin" está na página
  });

  it("Verificar adicionar mais uma unidade do produto no carrinho", () => {
    cy.visit("http://localhost:3000"); // Visita a página principal
    cy.get(".styles_cards__5EoDT > :nth-child(1)").click(); // acessa a página do produto
    cy.get(".styles_infosContainer__2DeIF > button").click(); // adiciona o produto ao carrinho
    cy.get(".styles_headerButtons__ZYiV9 > :nth-child(1)").click(); // acessa o carrinho
    cy.get('[aria-label="add"]').click(); // adiciona mais uma unidade do produto
    cy.contains("2").should("be.visible"); // verifica se a quantidade de produtos é 2
  });

  it("Verifica se ao adicionar mais um produto no carrinho ao finalizar compra ele fica com o preço correto", () => {
    cy.visit("http://localhost:3000"); // Visita a página principal
    cy.get(".styles_cards__5EoDT > :nth-child(1)").click(); // acessa a página do produto
    cy.get(".styles_infosContainer__2DeIF > button").click(); // adiciona o produto ao carrinho
    cy.get(".styles_price__vZC3S > :nth-child(2)")
      .invoke("text")
      .then((text) => {
        const price = text.replace("R$", "").replace(",", ".");
        1;
        const total = +price * 2;

        cy.get(".styles_headerButtons__ZYiV9 > :nth-child(1)").click(); // acessa o carrinho
        cy.get('[aria-label="add"]').click(); // adiciona mais uma unidade do produto
        cy.contains("Finalizar Compra").click(); // finaliza a compra
        cy.contains(total).should("be.visible"); // verifica se o preço total está correto
      });
  });
});

export {};
