// Sistema de carrito dinámico con WhatsApp y navegación activa
class ShoppingCart {
  constructor() {
    this.cart = this.loadCart()
    this.whatsappNumber = "573213554763" // CAMBIA ESTE NÚMERO POR TU NÚMERO DE WHATSAPP
    this.initTheme()
    this.init()
  }

  init() {
    this.bindEvents()
    this.updateCartUI()
    this.updateCartCount()
    this.initScrollActiveLink() // Inicializar la lógica de navegación activa
    this.initSwiper() // Inicializar Swiper
  }

  bindEvents() {
    // Botones agregar al carrito
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart") || e.target.closest(".add-to-cart")) {
        const button = e.target.classList.contains("add-to-cart") ? e.target : e.target.closest(".add-to-cart")
        this.addToCart(button)
      }
    })

    // Abrir/cerrar carrito
    const cartShop = document.getElementById("cart-shop")
    const cartClose = document.getElementById("cart-close")
    const cart = document.getElementById("cart")

    if (cartShop) {
      cartShop.addEventListener("click", () => {
        cart.classList.add("show-cart")
      })
    }

    if (cartClose) {
      cartClose.addEventListener("click", () => {
        cart.classList.remove("show-cart")
      })
    }

    // Eventos del carrito (delegación de eventos)
    const cartContainer = document.getElementById("cart-container")
    if (cartContainer) {
      cartContainer.addEventListener("click", (e) => {
        const cartCard = e.target.closest(".cart__card")
        if (!cartCard) return

        const productId = cartCard.dataset.id

        if (e.target.classList.contains("bx-plus")) {
          this.increaseQuantity(productId)
        } else if (e.target.classList.contains("bx-minus")) {
          this.decreaseQuantity(productId)
        } else if (e.target.classList.contains("bx-trash-alt")) {
          this.removeFromCart(productId)
        }
      })
    }

    // Checkout
    const checkoutBtn = document.getElementById("checkout-btn")
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        this.checkout()
      })
    }

    // WhatsApp Button
    const whatsappBtn = document.getElementById("whatsapp-btn")
    if (whatsappBtn) {
      whatsappBtn.addEventListener("click", () => {
        this.openWhatsAppModal()
      })
    }

    // Modal events
    this.bindModalEvents()

    // Navegación móvil (toggle)
    const navToggle = document.getElementById("nav-toggle")
    const navClose = document.getElementById("nav-close")
    const navMenu = document.getElementById("nav-menu")

    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu")
      })
    }

    if (navClose) {
      navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu")
      })
    }

    // Cerrar menú móvil al hacer click en un enlace
    const navLinks = document.querySelectorAll(".nav__link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show-menu")
      })
    })
  }

  bindModalEvents() {
    const modalOverlay = document.getElementById("modal-overlay")
    const modalClose = document.getElementById("modal-close")
    const customerForm = document.getElementById("customer-form")

    // Cerrar modal
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        this.closeModal()
      })
    }

    // Cerrar modal al hacer click fuera
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          this.closeModal()
        }
      })
    }

    // Submit form
    if (customerForm) {
      customerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.sendToWhatsApp()
      })
    }
  }

  openWhatsAppModal() {
    if (this.cart.length === 0) {
      const Swal = window.Swal
      if (Swal) {
        Swal.fire({
          title: "Carrito vacío",
          text: "Agrega productos al carrito antes de enviar por WhatsApp",
          icon: "warning",
        })
      }
      return
    }

    const modalOverlay = document.getElementById("modal-overlay")
    if (modalOverlay) {
      modalOverlay.classList.add("show-modal")
      document.body.style.overflow = "hidden"
    }
  }

  closeModal() {
    const modalOverlay = document.getElementById("modal-overlay")
    if (modalOverlay) {
      modalOverlay.classList.remove("show-modal")
      document.body.style.overflow = "auto"
    }
  }

  sendToWhatsApp() {
    // Obtener datos del formulario
    const customerName = document.getElementById("customer-name").value
    const customerEmail = document.getElementById("customer-email").value
    const customerPhone = document.getElementById("customer-phone").value
    const customerCity = document.getElementById("customer-city").value
    const customerMessage = document.getElementById("customer-message").value

    // Validar campos requeridos
    if (!customerName || !customerEmail || !customerCity) {
      const Swal = window.Swal
      if (Swal) {
        Swal.fire({
          title: "Campos requeridos",
          text: "Por favor completa todos los campos obligatorios",
          icon: "error",
        })
      }
      return
    }

    // Generar mensaje de WhatsApp
    const message = this.generateWhatsAppMessage({
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      city: customerCity,
      message: customerMessage,
    })

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Cerrar modal
    this.closeModal()

    // Mostrar confirmación
    const Swal = window.Swal
    if (Swal) {
      Swal.fire({
        title: "¡Enviado!",
        text: "Te hemos redirigido a WhatsApp. Envía el mensaje para completar tu pedido.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      })
    }

    // Limpiar formulario
    document.getElementById("customer-form").reset()
  }

  generateWhatsAppMessage(customerData) {
    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)

    let message = `🛍️ *NUEVO PEDIDO DE RELOJES* 🛍️\n\n`

    // Datos del cliente
    message += `👤 *DATOS DEL CLIENTE:*\n`
    message += `• Nombre: ${customerData.name}\n`
    message += `• Email: ${customerData.email}\n`
    message += `• Ciudad: ${customerData.city}\n`
    if (customerData.phone) {
      message += `• Teléfono: ${customerData.phone}\n`
    }
    message += `\n`

    // Productos del carrito
    message += `🛒 *PRODUCTOS SELECCIONADOS:*\n`
    this.cart.forEach((item, index) => {
      message += `\n${index + 1}. *${item.name}*\n`
      message += `   💰 Precio: $${item.price.toLocaleString()}\n`
      message += `   📦 Cantidad: ${item.quantity}\n`
      message += `   💵 Subtotal: $${(item.price * item.quantity).toLocaleString()}\n`
    })

    // Resumen del pedido
    message += `\n📊 *RESUMEN DEL PEDIDO:*\n`
    message += `• Total de productos: ${totalItems}\n`
    message += `• *TOTAL A PAGAR: $${total.toLocaleString()}*\n\n`

    // Mensaje adicional del cliente
    if (customerData.message) {
      message += `💬 *MENSAJE ADICIONAL:*\n${customerData.message}\n\n`
    }

    // Llamada a la acción
    message += `📞 *¡Hola! Estoy interesado(a) en estos productos. ¿Podrías ayudarme con información sobre envío y formas de pago?*\n\n`
    message += `🚚 Por favor, proporciona información sobre:\n`
    message += `• Costos de envío a ${customerData.city}\n`
    message += `• Tiempo de entrega\n`
    message += `• Formas de pago disponibles\n`
    message += `• Disponibilidad de los productos\n\n`
    message += `¡Gracias! 😊`

    return message
  }

  addToCart(button) {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number.parseFloat(button.dataset.price),
      image: button.dataset.image,
      quantity: 1,
    }

    // Verificar si el producto ya existe
    const existingProduct = this.cart.find((item) => item.id === product.id)

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      this.cart.push(product)
    }

    this.saveCart()
    this.updateCartUI()
    this.updateCartCount()
    this.showAddedMessage(product.name)
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId)
    this.saveCart()
    this.updateCartUI()
    this.updateCartCount()
  }

  increaseQuantity(productId) {
    const product = this.cart.find((item) => item.id === productId)
    if (product) {
      product.quantity += 1
      this.saveCart()
      this.updateCartUI()
      this.updateCartCount()
    }
  }

  decreaseQuantity(productId) {
    const product = this.cart.find((item) => item.id === productId)
    if (product && product.quantity > 1) {
      product.quantity -= 1
      this.saveCart()
      this.updateCartUI()
      this.updateCartCount()
    }
  }

  updateCartUI() {
    const cartContainer = document.getElementById("cart-container")
    if (!cartContainer) return

    if (this.cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart__empty">
          <i class='bx bx-shopping-bag cart__empty-icon'></i>
          <p class="cart__empty-text">Tu carrito está vacío</p>
        </div>
      `
    } else {
      cartContainer.innerHTML = this.cart
        .map(
          (item) => `
          <article class="cart__card" data-id="${item.id}">
            <div class="cart__box">
              <img src="${item.image}" alt="${item.name}" class="cart__img">
            </div>
            
            <div class="cart__details">
              <h3 class="cart__title">${item.name}</h3>
              <span class="cart__price">$${item.price.toLocaleString()}</span>
              
              <div class="cart__amount">
                <div class="cart__amount-content">
                  <span class="cart__amount-box">
                    <i class='bx bx-minus'></i>
                  </span>
                  
                  <span class="cart__amount-number">${item.quantity}</span>
                  
                  <span class="cart__amount-box">
                    <i class='bx bx-plus'></i>
                  </span>
                </div>
                
                <i class='bx bx-trash-alt cart__amount-trash'></i>
              </div>
            </div>
          </article>
        `,
        )
        .join("")
    }

    this.updateCartTotals()
  }

  updateCartTotals() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const cartItemsCount = document.getElementById("cart-items-count")
    const cartTotal = document.getElementById("cart-total")

    if (cartItemsCount) {
      cartItemsCount.textContent = `${totalItems} ${totalItems === 1 ? "item" : "items"}`
    }

    if (cartTotal) {
      cartTotal.textContent = `$${totalPrice.toLocaleString()}`
    }
  }

  updateCartCount() {
    const cartCount = document.getElementById("cart-count")
    if (cartCount) {
      const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
      cartCount.textContent = totalItems
      cartCount.style.display = totalItems > 0 ? "block" : "none"
    }
  }

  showAddedMessage(productName) {
    const Swal = window.Swal
    if (Swal) {
      Swal.fire({
        title: "¡Agregado al carrito!",
        text: `${productName} ha sido agregado al carrito`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      })
    }
  }

  checkout() {
    if (this.cart.length === 0) {
      const Swal = window.Swal
      if (Swal) {
        Swal.fire({
          title: "Carrito vacío",
          text: "Agrega productos al carrito antes de proceder",
          icon: "warning",
        })
      }
      return
    }

    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const Swal = window.Swal
    if (Swal) {
      Swal.fire({
        title: "¡Gracias por tu compra!",
        text: `Total: $${total.toLocaleString()}`,
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => {
        this.clearCart()
      })
    }
  }

  clearCart() {
    this.cart = []
    this.saveCart()
    this.updateCartUI()
    this.updateCartCount()

    // Cerrar carrito
    const cart = document.getElementById("cart")
    if (cart) {
      cart.classList.remove("show-cart")
    }
  }

  saveCart() {
    localStorage.setItem("shopping-cart", JSON.stringify(this.cart))
  }

  loadCart() {
    const saved = localStorage.getItem("shopping-cart")
    return saved ? JSON.parse(saved) : []
  }

  initTheme() {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem("selected-theme")
    const savedIcon = localStorage.getItem("selected-icon")

    if (savedTheme) {
      document.body.classList[savedTheme === "dark" ? "add" : "remove"]("dark-theme")
      const themeButton = document.getElementById("theme-button")
      if (themeButton) {
        themeButton.classList = savedIcon === "bx-moon" ? "bx bx-moon change-theme" : "bx bx-sun change-theme"
      }
    }

    // Event listener para el botón de tema
    const themeButton = document.getElementById("theme-button")
    if (themeButton) {
      themeButton.addEventListener("click", () => {
        this.toggleTheme()
      })
    }
  }

  toggleTheme() {
    const darkTheme = "dark-theme"
    const iconTheme = "bx-sun"

    // Obtener tema e ícono actual
    const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light")
    const getCurrentIcon = () =>
      document.getElementById("theme-button").classList.contains(iconTheme) ? "bx-moon" : "bx-sun"

    // Toggle del tema
    document.body.classList.toggle(darkTheme)
    const themeButton = document.getElementById("theme-button")
    themeButton.classList.toggle(iconTheme)

    // Guardar tema en localStorage
    localStorage.setItem("selected-theme", getCurrentTheme())
    localStorage.setItem("selected-icon", getCurrentIcon())
  }

  initScrollActiveLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollActive = () => {
      const scrollY = window.pageYOffset

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58 // Ajuste para el header fijo
        const sectionId = current.getAttribute("id")
        const navLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]")

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add("active-link")
          } else {
            navLink.classList.remove("active-link")
          }
        }
      })
    }

    window.addEventListener("scroll", scrollActive)
    // Llamar una vez al cargar para establecer el enlace activo inicial
    scrollActive()
  }

  initSwiper() {
    console.log("Initializing Swiper...")
    const Swiper = window.Swiper // Declara la variable Swiper aquí
    if (typeof Swiper === "undefined") {
      console.error("Swiper library not loaded. Cannot initialize Swiper.")
      return
    }
    console.log("Swiper library found, initializing new Swiper instance.")

    new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 5000, // 5 segundos
        disableOnInteraction: false, // No deshabilitar autoplay al interactuar
        pauseOnMouseEnter: true, // Pausar autoplay al pasar el ratón por encima (opcional, pero útil)
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "fade", // Efecto de transición suave
      fadeEffect: {
        crossFade: true,
      },
      speed: 800, // Velocidad de transición de 0.8 segundos
      // Opciones adicionales para mayor robustez y manejo de imágenes:
      preloadImages: false, // No precargar todas las imágenes al inicio, cargarlas a medida que se necesitan
      updateOnImagesReady: true, // Actualizar Swiper cuando las imágenes estén listas (importante para dimensiones correctas)
      observer: true, // Observar cambios en el DOM del Swiper (si se añaden/eliminan slides dinámicamente)
      observeParents: true, // Observar cambios en los padres del Swiper (si el contenedor cambia de tamaño)
    })
    console.log("Swiper initialized successfully.")
  }
}

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new ShoppingCart()
})