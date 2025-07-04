function envio(formEntries) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(formEntries),
  };

  // Retorna a promise do fetch para encadear depois!
  return fetch("https://email-proxy-psi.vercel.app/api/lead", options).then(
    (res) => {
      if (!res.ok) {
        // Se resposta nao OK, lanca erro para cair no catch
        return res.json().then((err) => {
          throw err;
        });
      }
      return res.json();
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData);

    // Chama envio() e trata o resultado
    envio(formEntries)
      .then((res) => {
        // So redireciona se sucesso!
        window.location.href = "agradecimento.html";
      })
      .catch((err) => {
        // Mostra erro e NAO redireciona
        console.error("&#10060; Erro no envio:", err);
        alert(
          "Ocorreu um erro ao enviar o formul�rio. Tente novamente.\n\nDetalhes: " +
            (err?.error || JSON.stringify(err))
        );
      });
  });
});
