class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="card text-center mb-4"> 
      <div class="card-body">
        <strong>Producto</strong>: ${product.name}
        <strong>Precio</strong>: ${product.price}
        <strong>año</strong>: ${product.year}
        <a href="#" class="btn btn-danger" name="delete">remover</a> 
      </div>
    </div>
    `;
    productList.appendChild(element);
    this.resetForm();
  }
  resetForm() {
    document.getElementById("product-form").reset();
  }
  removeProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Haz eliminado un producto", "danger");
    }
  }
  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2 message`;
    div.appendChild(document.createTextNode(message));
    // mostrando en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
}

// DOM event

document.getElementById("product-form").addEventListener("submit", (e) => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;

  const product1 = new Product(name, price, year);
  const UI1 = new UI();
  UI1.addProduct(product1);
  if (name === "" || price === "" || year === "") {
    return UI1.showMessage("Debes ingresar algun valor", "danger");
  }
  UI1.showMessage("Haz agregado un elemento al carrito", "success");
  e.preventDefault();
});

document.getElementById("product-list").addEventListener("click", (e) => {
  const UI1 = new UI();
  UI1.removeProduct(e.target);
});
