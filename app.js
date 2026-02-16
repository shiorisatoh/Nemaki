const products = [
  {
    id: "linen-shirt",
    name: "Linen Column Shirt",
    price: 126,
    category: "Tops",
    description:
      "Cut in breathable linen with a softly structured silhouette. Designed for long summer days and easy layering.",
    colors: ["Ivory", "Sand", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "wide-trouser",
    name: "Wide Pleat Trouser",
    price: 148,
    category: "Bottoms",
    description:
      "A full-length trouser with a relaxed drape, crafted in a matte cotton blend with subtle movement.",
    colors: ["Stone", "Black"],
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "cotton-blazer",
    name: "Cotton Field Blazer",
    price: 172,
    category: "Tops",
    description:
      "An unstructured blazer with clean lapels and minimalist finishing. Intended for refined everyday wear.",
    colors: ["Oat", "Midnight"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "everyday-tote",
    name: "Everyday Canvas Tote",
    price: 82,
    category: "Accessories",
    description:
      "A durable canvas tote with internal pocketing and a low-contrast embossed Nemaki mark.",
    colors: ["Ecru", "Olive"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "minimal-scarf",
    name: "Minimal Weave Scarf",
    price: 64,
    category: "Accessories",
    description:
      "Lightweight scarf in brushed cotton. Easy to fold, knot, and layer throughout the season.",
    colors: ["Bone", "Dune"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "soft-knit",
    name: "Soft Knit Tank",
    price: 94,
    category: "Tops",
    description:
      "A close-fit knit tank with clean edges and a balanced neckline for warm-weather layering.",
    colors: ["Almond", "Ink"],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

const formatPrice = (value) => `$${value.toFixed(2)}`;

const cardMarkup = (product) => `
  <article class="product-card">
    <a href="product.html?id=${product.id}">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
    </a>
    <div class="product-meta">
      <div>
        <p>${product.name}</p>
        <p class="price">${formatPrice(product.price)}</p>
      </div>
      <a href="product.html?id=${product.id}">View</a>
    </div>
  </article>
`;

const setupMenu = () => {
  const toggle = document.querySelector(".menu-toggle");
  const overlay = document.getElementById("menu-overlay");
  if (!toggle || !overlay) return;

  const closeMenu = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = overlay.classList.toggle("open");
    overlay.setAttribute("aria-hidden", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeMenu();
  });

  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};

const renderHome = () => {
  const featured = document.getElementById("featured-grid");
  if (!featured) return;
  featured.innerHTML = products.slice(0, 4).map(cardMarkup).join("");
};

const renderShop = () => {
  const grid = document.getElementById("shop-grid");
  const filter = document.getElementById("category-filter");
  if (!grid) return;

  const render = (category = "all") => {
    const visible = category === "all" ? products : products.filter((item) => item.category === category);
    grid.innerHTML = visible.map(cardMarkup).join("");
  };

  render();
  if (filter) {
    filter.addEventListener("change", (event) => {
      render(event.target.value);
    });
  }
};

const renderProduct = () => {
  const detail = document.getElementById("product-detail");
  const related = document.getElementById("related-grid");
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = products.find((item) => item.id === id) || products[0];

  detail.innerHTML = `
    <div class="gallery-main">
      <img id="active-image" src="${product.images[0]}" alt="${product.name}" />
      <div class="gallery-strip">
        ${product.images
          .map(
            (src, index) => `
          <button type="button" data-src="${src}" aria-label="View image ${index + 1}">
            <img src="${src}" alt="${product.name} preview ${index + 1}" />
          </button>
        `
          )
          .join("")}
      </div>
    </div>
    <div class="detail-copy">
      <h1>${product.name}</h1>
      <p class="price">${formatPrice(product.price)}</p>
      <p>${product.description}</p>
      <div class="selectors">
        <label>
          Size
          <select class="selector">
            ${product.sizes.map((size) => `<option>${size}</option>`).join("")}
          </select>
        </label>
        <label>
          Color
          <select class="selector">
            ${product.colors.map((color) => `<option>${color}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="actions">
        <button type="button" id="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `;

  detail.querySelectorAll(".gallery-strip button").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const active = document.getElementById("active-image");
      active.src = thumb.dataset.src;
    });
  });

  const addToCart = document.getElementById("add-to-cart");
  if (addToCart) {
    addToCart.addEventListener("click", () => {
      addToCart.textContent = "Added";
    });
  }

  if (related) {
    const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
    related.innerHTML = relatedProducts.map(cardMarkup).join("");
  }
};

setupMenu();
renderHome();
renderShop();
renderProduct();
