document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top immediately
  window.scrollTo(0, 0)

  const header = document.querySelector("header")
  const hamburgerMenu = document.querySelector(".hamburger-menu")
  const menuPanel = document.querySelector(".menu-panel")

  let lastScrollTop = 0
  let headerTimeout
  let isHeaderVisible = true

  // Function to check if menu is open
  const isMenuOpen = () => {
    return menuPanel && menuPanel.classList.contains("active")
  }

  // Función para ocultar el header después de un tiempo
  const hideHeaderAfterDelay = () => {
    clearTimeout(headerTimeout)
    headerTimeout = setTimeout(() => {
      // Only hide if we've scrolled down enough AND menu is not open
      if (window.scrollY > 200 && !isMenuOpen()) {
        header.classList.add("hidden")
        header.classList.remove("visible")

        // Also hide hamburger menu only if menu is not open
        if (!isMenuOpen()) {
          hamburgerMenu.classList.add("hidden")
          hamburgerMenu.classList.remove("visible")
        }

        isHeaderVisible = false
      }
    }, 3000) // Hide after 3 seconds of inactivity
  }

  // Detectar dirección del scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    // If menu is open, don't change header visibility based on scroll
    if (isMenuOpen()) {
      return
    }

    // Si estamos en la parte superior de la página, siempre mostrar el header y el menú
    if (scrollTop < 100) {
      header.classList.remove("hidden")
      header.classList.add("visible")

      hamburgerMenu.classList.remove("hidden")
      hamburgerMenu.classList.add("visible")

      isHeaderVisible = true
      return
    }

    // Detectar dirección del scroll
    if (scrollTop > lastScrollTop && isHeaderVisible && scrollTop > 200) {
      // Scroll hacia abajo - ocultar header y menú hamburguesa
      header.classList.add("hidden")
      header.classList.remove("visible")

      hamburgerMenu.classList.add("hidden")
      hamburgerMenu.classList.remove("visible")

      isHeaderVisible = false
      clearTimeout(headerTimeout)
    } else if (scrollTop < lastScrollTop && !isHeaderVisible) {
      // Scroll hacia arriba - mostrar header y menú hamburguesa
      header.classList.remove("hidden")
      header.classList.add("visible")

      hamburgerMenu.classList.remove("hidden")
      hamburgerMenu.classList.add("visible")

      isHeaderVisible = true
      hideHeaderAfterDelay()
    }

    lastScrollTop = scrollTop
  })

  // Mostrar header y menú hamburguesa cuando el mouse se acerca a la parte superior
  document.addEventListener("mousemove", (e) => {
    // Don't show header based on mouse position if menu is open
    if (e.clientY < 50 && !isHeaderVisible && !isMenuOpen()) {
      header.classList.remove("hidden")
      header.classList.add("visible")

      hamburgerMenu.classList.remove("hidden")
      hamburgerMenu.classList.add("visible")

      isHeaderVisible = true
      hideHeaderAfterDelay()
    }
  })

  // Inicializar el header y menú hamburguesa como visible
  header.classList.add("visible")
  hamburgerMenu.classList.add("visible")

  // Si hacemos scroll inmediatamente, considerar ocultar el header y el menú
  if (window.scrollY > 200 && !isMenuOpen()) {
    hideHeaderAfterDelay()
  }

  // Ensure page starts at the top on load with a slight delay
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, 100)
})