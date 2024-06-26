import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard (name, price, image, id) {
    const card = document.createElement("card");
    card.classList.add("card");

    card.innerHTML = `
    <img class="img_container"
        src="${image}"alt="${name}">
    
    <div class="card_container_info">
        <p class="titulo_producto">${name}</p>
        <div class="card_precio">
            <p>${price}</p>
            <button class="button-delete" data-id="${id}">
                <img  src="./Imagenes/Vector.png" alt="Eliminar">
            </button>
        </div>
    </div>
    `;

    const botonDelete = card.querySelector(".button-delete");
    botonDelete.addEventListener("click", () => servicesProducts.deleteProduct(id));

    return card;
}


    




const render = async () =>{
    try {
        const listProduct = await servicesProducts.productList();
        
        listProduct.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });

    } catch (error) {
        console.log(error)
    }
};



form.addEventListener("submit", (event)=> {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    console.log(name);
    console.log(price);
    console.log(image);

    servicesProducts.createProduct(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
})

render();