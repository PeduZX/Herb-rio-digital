const form = document.getElementById("formCadastro");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomePopular = document.getElementById('nome_popular').value;
    const nomeCientifico = document.getElementById('nome_cientifico').value;
    const familiaBotanica = document.getElementById('familia_botanica').value;
    const origem = document.getElementById('origem').value;
    const usosMedicinais = document.getElementById('usos_medicinais').value;
    const principioAtivos = document.getElementById('principios_ativos').value;
    const parteUtilizada = document.getElementById('parte_utilizada').value;
    const modoPreparo = document.getElementById('modo_preparo').value;
    const contraindicacoes = document.getElementById('contraindicacoes').value;
    const imagem = document.getElementById('imagem').value;

    const resp = await fetch("http://localhost:3000/plantas/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomePopular, nomeCientifico, familiaBotanica, origem, usosMedicinais, principioAtivos, parteUtilizada, modoPreparo, contraindicacoes, imagem }),
    });

    const data = await resp.json();
    alert("Planta cadastrada: " + nomePopular);
    
  });
}

async function deletarPlantas(id) {
  try {
    const response = await fetch(`http://localhost:3000/plantas/deletar/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro ao deletar planta:", error);
  }
  alert("Usuario deletado com sucesso!")
}



// --- LISTAR PLANTAS ---
async function carregarPlantas() {
  const lista = document.getElementById("main");
  if (!lista) return; // impede erro se não existir o elemento

  const resp = await fetch("http://localhost:3000/plantas/listar");
  const plantas = await resp.json();


  lista.innerHTML = "";

  (plantas.data || plantas).forEach((p) => {
    const div = document.createElement("div");
    const btnDel = document.createElement("button");
    div.innerHTML = `
      <div class="card1">
        <img src="${p.imagem}" alt="${p.nome_popular}">
        <p id="p-nome">Nome Popular: ${p.nome_popular}</p>
        <p id="p-nome-cientifico">Nome Científico: ${p.nome_cientifico}</p>
        <p id="p-familia">Família Botânica: ${p.familia_botanica}</p>
        <p id="p-origem">Origem / Distribuição: ${p.origem}</p>
        <p id="p-usos">Usos Medicinais: ${p.usos_medicinais}</p>
        <p id="p-principios">Princípios Ativos: ${p.principios_ativos}</p>
        <p id="p-parte">Parte Utilizada: ${p.parte_utilizada}</p>
        <p id="p-modo">Modo de Preparo: ${p.modo_preparo}</p>
        <p id="p-contraindicacoes">Contraindicações: ${p.contraindicacoes}</p>
        <button id= "btn-delete" onclick="deletarPlantas(${p.id})">DELETAR</button>
      </div>`;
    lista.appendChild(div);
  });
}


carregarPlantas();
