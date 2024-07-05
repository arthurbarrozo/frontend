// Função para obter a lista existente do servidor via requisição GET
const getList = async () => {
  let url = "http://127.0.0.1:5000/livros";
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.livros.forEach((item) =>
        insertList(item.titulo, item.autor, item.ano_publicacao)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Chamada da função para carregamento inicial dos dados
getList();

// Função para colocar um item na lista do servidor via requisição POST
const postItem = async (inputTitle, inputAuthor, inputYear) => {
  const formData = new FormData();
  formData.append("titulo", inputTitle);
  formData.append("autor", inputAuthor);
  formData.append("ano_publicacao", inputYear);

  let url = "http://127.0.0.1:5000/livro";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Função para criar um botão close para cada item da lista
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
};

// Função para remover um item da lista de acordo com o click no botão close
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const tituloItem = div.getElementsByTagName("td")[0].innerHTML;
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(tituloItem);
        alert("Removido!");
      }
    };
  }
};

// Função para deletar um item da lista do servidor via requisição DELETE
const deleteItem = (item) => {
  console.log(item);
  let url = "http://127.0.0.1:5000/livro?titulo=" + item;
  fetch(url, {
    method: "delete",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Função para adicionar um novo item com título, autor e ano de publicação
const newItem = () => {
  let inputTitle = document.getElementById("newTitle").value;
  let inputAuthor = document.getElementById("newAuthor").value;
  let inputYear = document.getElementById("newYear").value;

  if (inputTitle === "" || inputAuthor === "" || inputYear === "") {
    alert("Preencha todos os campos!");
  } else {
    insertList(inputTitle, inputAuthor, inputYear);
    postItem(inputTitle, inputAuthor, inputYear);
    alert("Livro adicionado!");
  }
};

// Função para inserir items na lista apresentada
const insertList = (title, author, year) => {
  var item = [title, author, year];
  var table = document.getElementById("myTable");
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newTitle").value = "";
  document.getElementById("newAuthor").value = "";
  document.getElementById("newYear").value = "";

  removeElement();
};
