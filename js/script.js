const resultado = document.getElementById("resultado");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");

async function buscarLivros() {
  const termo = document.getElementById("searchInput").value.trim();

  if (!termo) {
    alert("Digite algo para buscar.");
    return;
  }

  resultado.innerHTML = "";
  erro.classList.add("d-none");
  loading.classList.remove("d-none");

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${termo}`);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();

    if (data.docs.length === 0) {
      erro.textContent = "Nenhum livro encontrado.";
      erro.classList.remove("d-none");
      return;
    }

    mostrarLivros(data.docs.slice(0, 20));

  } catch (error) {
    erro.textContent = "Erro ao buscar livros.";
    erro.classList.remove("d-none");
  } finally {
    loading.classList.add("d-none");
  }
}

function mostrarLivros(livros) {
  livros.forEach(livro => {

    const capa = livro.cover_i
      ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
      : "https://via.placeholder.com/150x250?text=Sem+Capa";

    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${capa}" class="card-img-top capa">
        <div class="card-body">
          <h6>${livro.title}</h6>
          <p>
            <strong>Autor:</strong> ${livro.author_name ? livro.author_name[0] : "Desconhecido"}<br>
            <strong>Ano:</strong> ${livro.first_publish_year || "N/A"}
          </p>
          <a href="detalhes.html?key=${livro.key}" class="btn btn-warning btn-sm">Ver Detalhes</a>
        </div>
      </div>
    `;

    resultado.appendChild(col);
  });
}