const livrosDiv = document.getElementById("livros");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");

// Carrega livros automaticamente
window.addEventListener("load", () => {
  buscarLivros("best seller");
});

// Buscar livros
async function buscarLivros(termo) {
  try {
    loading.classList.remove("d-none");
    erro.classList.add("d-none");
    livrosDiv.innerHTML = "";

    const resposta = await fetch(`https://openlibrary.org/search.json?q=${termo}`);
    const dados = await resposta.json();

    mostrarLivros(dados.docs.slice(0, 12));

  } catch (e) {
    erro.textContent = "Erro ao carregar livros.";
    erro.classList.remove("d-none");
  } finally {
    loading.classList.add("d-none");
  }
}

// Mostrar livros
function mostrarLivros(livros) {
  livrosDiv.innerHTML = "";

  livros.forEach(livro => {

    const capa = livro.cover_i
      ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`
      : "https://via.placeholder.com/200x300?text=Sem+Capa";

    const col = document.createElement("div");
    col.className = "col-md-3";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${capa}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${livro.title}</h5>
          <p class="card-text">
            ${livro.author_name ? livro.author_name[0] : "Autor desconhecido"}
          </p>
          <button class="btn btn-primary w-100"
            onclick="verDetalhes('${livro.key}')">
            Ver detalhes
          </button>
        </div>
      </div>
    `;

    livrosDiv.appendChild(col);
  });
}

// Ir para página de detalhes
function verDetalhes(key) {
  window.location.href = `detalhes.html?livro=${key}`;
}

// Pesquisa dinâmica
searchInput.addEventListener("input", () => {
  const valor = searchInput.value.trim();

  if (valor.length > 2) {
    buscarLivros(valor);
  }
});