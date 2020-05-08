// Aguarda Submit
document.querySelector("#cepForm").addEventListener("submit", getCepInfo);

function getCepInfo(e) {
  // Pega valor do cep do input
  const cep = document.querySelector(".cep").value;

  // Faz a request
  fetch(`//viacep.com.br/ws/${cep}/json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Exibe informação do CEP
      let infoCep = "";
      if (data.erro) {
        exibeIcone("remove");
        infoCep += `
      <div class="alert alert-info alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      Cep inexistente.
    </div>
      `;
      } else {
        exibeIcone("check");
        infoCep += `
      <div class="alert alert-secondary alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="alert-heading">Endereço</h4>
      <hr>
      <p class="m-0"><strong>CEP: </strong>${data.cep}</p>
      <p class="m-0"><strong>Logradouro: </strong>${data.logradouro}</p>
      <p class="m-0"><strong>Complemento: </strong>${data.complemento}</p>
      <p class="m-0"><strong>Bairro: </strong>${data.bairro}</p>
      <p class="m-0"><strong>Cidade: </strong>${data.localidade}</p>
      <p class="m-0"><strong>UF: </strong>${data.uf}</p>
      </div>
      `;
      }

      // Insere a template no DOM
      document.querySelector("#infoCep").innerHTML = infoCep;
    });

  e.preventDefault();
}

// Máscara para validar entrada do CEP
$(document).ready(function () {
  $("#Cep").mask("00000-000");
});

// Exibe/remove ícones da linha de input
function exibeIcone(icone) {
  // Limpa icones
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // Exibe ícone adequado
  document.querySelector(`.icon-${icone}`).style.display = "inline-flex";
}

// Limpa entrada e ícones
$("#infoCep").on("close.bs.alert", function () {
  document.querySelector(".cep").value = "";
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  document.querySelector(".cep").focus();
});
