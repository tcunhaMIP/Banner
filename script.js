/*
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get("utm_source"),
    utm_medium: urlParams.get("utm_medium"),
    utm_campaign: urlParams.get("utm_campaign"),
  };
}

function fillUTMs(objeto) {
  document.querySelector("#utm_source").value = objeto.utm_source || "";
  document.querySelector("#utm_medium").value = objeto.utm_medium || "";
  document.querySelector("#utm_campaign").value = objeto.utm_campaign || "";
}
*/

function envio(formEntries) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      token: "72d919236350de7e54850a0cfa83096b573b0016",
    },
    body: JSON.stringify(formEntries),
  };

  fetch("https://cvcrm-proxy.vercel.app/api/lead", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  //fillUTMs(getUTMParams());

  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio e redirecionamento automáticos

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData);

    formEntries.permitir_alteracao = true;
    formEntries.email_gestor = "thiago.cunha@mip.com.br";
    formEntries.idempreendimento = 19;
    formEntries.converter = true;
    formEntries.idsituacao = 1;

    envio(formEntries);

    // Aguarda um pouco antes de redirecionar para garantir o envio
    setTimeout(() => {
      window.location.href = "agradecimento.html";
    }, 500); // ou ajuste esse tempo conforme necessário
  });
});
