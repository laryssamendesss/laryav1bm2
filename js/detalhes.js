const detalhesDiv = document.getElementById("detalhes");
const loading = document.getElementById("loading");

const params = new URLSearchParams(window.location.search);
const livroKey = params.get("livro");

if (!livroKey) {
  loading.innerHTML = "<p>Livro não encontrado.</p>";
} else {
  carregarDetalhes();
}

async function carregarDetalhes() {
  try {

    const resposta = await fetch(`https://openlibrary.org${livroKey}.json`);

    if (!resposta.ok) {
      throw new Error("Erro na requisição");
    }

    const livro = await resposta.json();

    let descricao = "Descrição não disponível.";

    if (livro.description) {
      descricao = typeof livro.description === "string"
        ? livro.description
        : livro.description.value;
    }

    // Montar URL da capa
    let capa = "https://via.placeholder.com/300x450?text=Sem+Capa";

    if (livro.covers && livro.covers.length > 0) {
      capa = `https://covers.openlibrary.org/b/id/${livro.covers[0]}-L.jpg`;
    }

    detalhesDiv.innerHTML = `
      <div class="col-lg-4 text-center mb-4">
        <img src="${capa}" 
             class="img-fluid rounded shadow"
             style="max-height: 450px;">
      </div>

      <div class="col-lg-8">
        <div class="card shadow p-4">
          <h2 class="mb-3">${livro.title}</h2>

          <p><strong>Descrição:</strong></p>
          <p>${descricao}</p>
        </div>
      </div>
    `;

    loading.classList.add("d-none");
    detalhesDiv.classList.remove("d-none");

  } catch (erro) {
    loading.innerHTML = "<p>Erro ao carregar detalhes.</p>";
  }
}