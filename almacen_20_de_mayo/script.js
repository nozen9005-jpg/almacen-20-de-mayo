// EDITA la lista de productos de ejemplo que aparece abajo.
const products = [
  {id:1,name:"Cuaderno de 96 páginas",category:"Útiles escolares y papelería",price:0.60,emoji:"📓",description:"Cuaderno para clases y apuntes.",tag:"Escolares",color:"#dff5e8"},
  {id:2,name:"Bolígrafo azul",category:"Útiles escolares y papelería",price:0.25,emoji:"🖊️",description:"Ideal para escribir todos los días.",tag:"Básico",color:"#e3edff"},
  {id:3,name:"Lápices de colores",category:"Útiles escolares y papelería",price:1.75,emoji:"🖍️",description:"Para tareas, dibujos y manualidades.",tag:"Creatividad",color:"#fff0d8"},
  {id:4,name:"Mochila escolar",category:"Útiles escolares y papelería",price:12.00,emoji:"🎒",description:"Modelo de ejemplo; reemplaza por tu producto.",tag:"Ejemplo",color:"#f7e7f6"},
  {id:5,name:"Peluche pequeño",category:"Juguetes",price:4.50,emoji:"🧸",description:"Una idea de regalo para los pequeños.",tag:"Regalos",color:"#ffeadf"},
  {id:6,name:"Juego de bloques",category:"Juguetes",price:6.00,emoji:"🧱",description:"Juego de construcción de ejemplo.",tag:"Diversión",color:"#e5f5e9"},
  {id:7,name:"Audífonos con cable",category:"Electrónica",price:3.00,emoji:"🎧",description:"Accesorio de audio. Verifica compatibilidad.",tag:"Accesorios",color:"#e8edff"},
  {id:8,name:"Cable de carga USB",category:"Electrónica",price:2.50,emoji:"🔌",description:"Tipo y compatibilidad por confirmar.",tag:"Tecnología",color:"#e3f4f4"},
  {id:9,name:"Cinta decorativa",category:"Sedería y artículos variados",price:1.00,emoji:"🎀",description:"Para decoración y manualidades.",tag:"Manualidades",color:"#ffe6ef"},
  {id:10,name:"Tijera multiuso",category:"Sedería y artículos variados",price:1.50,emoji:"✂️",description:"Artículo de ejemplo para tu catálogo.",tag:"Variedades",color:"#fff1d8"},
  {id:11,name:"Recipiente para cocina",category:"Artículos para el hogar",price:2.00,emoji:"🥣",description:"Accesorio práctico para el hogar.",tag:"Hogar",color:"#e4f3eb"},
  {id:12,name:"Botella reutilizable",category:"Otros productos",price:3.50,emoji:"🧴",description:"Producto de muestra; cambia foto y precio.",tag:"Ejemplo",color:"#e7edff"}
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productCount = document.getElementById("productCount");
const emptyState = document.getElementById("emptyState");
const whatsappNumber = "50767305150";

const categories = [...new Set(products.map(p => p.category))];
categories.forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

function money(value) {
  return "$" + Number(value).toFixed(2);
}
function whatsappLink(product) {
  const message = `Hola, Almacén 20 de Mayo. Quisiera consultar disponibilidad del producto "${product.name}" que aparece a ${money(product.price)}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const selected = categoryFilter.value;
  const filtered = products.filter(p =>
    (selected === "all" || p.category === selected) &&
    `${p.name} ${p.category} ${p.description}`.toLocaleLowerCase("es").includes(query)
  );
  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-art" style="background:${p.color}">
        <span class="product-tag">${p.tag}</span><span class="emoji" aria-hidden="true">${p.emoji}</span>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="product-description">${p.description}</p>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <a class="ask-link" href="${whatsappLink(p)}" target="_blank" rel="noopener" aria-label="Consultar ${p.name} por WhatsApp" title="Consultar por WhatsApp">↗</a>
        </div>
      </div>
    </article>`).join("");
  productCount.textContent = `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;
  emptyState.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
}
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
document.getElementById("clearFilters").addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  renderProducts();
});
document.querySelectorAll(".category-tile").forEach(tile => {
  tile.addEventListener("click", () => {
    categoryFilter.value = categories.includes(tile.dataset.category) ? tile.dataset.category : "all";
    searchInput.value = "";
    renderProducts();
    document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
  });
});
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
