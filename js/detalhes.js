const detalhesDiv = document.getElementById("detalhes");

const params = new URLSearchParams(window.location.search);
const key = params.get("key");

async function carregarDetalhes() {
  try {
    const response = await fetch(`https://openlibrary.org${key}.json`);
    const data = await response.json();

    detalhesDiv.innerHTML = `
      <div class="card p-4">
        <h2>${data.title}</h2>
        <p>
          ${data.description
            ? (typeof data.description === "string"
              ? data.description
              : data.description.value)
            : "Sem descrição disponível."}
        </p>
      </div>
    `;

  } catch (error) {
    detalhesDiv.innerHTML =
      `<div class="alert alert-danger">Erro ao carregar detalhes.</div>`;
  }
}

carregarDetalhes();