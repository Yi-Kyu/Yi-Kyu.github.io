document.addEventListener("DOMContentLoaded", () => {
    console.log("Script de máquinas cargado correctamente")
  
    // Base de datos de máquinas completadas
    const maquinasDB = [
      {
        id: 1,
        nombre: "Lame",
        plataforma: "hackthebox",
        dificultad: "facil",
        os: "Linux",
        ip: "10.10.10.3",
        fecha: "2023-01-15",
        categorias: ["smb", "privesc"],
        enlace: "https://app.hackthebox.com/machines/Lame",
      },
      {
        id: 2,
        nombre: "Blue",
        plataforma: "hackthebox",
        dificultad: "facil",
        os: "Windows",
        ip: "10.10.10.40",
        fecha: "2023-01-20",
        categorias: ["eternalblue", "ms17-010"],
        enlace: "https://app.hackthebox.com/machines/Blue",
      },
      {
        id: 3,
        nombre: "Legacy",
        plataforma: "hackthebox",
        dificultad: "facil",
        os: "Windows",
        ip: "10.10.10.4",
        fecha: "2023-01-25",
        categorias: ["smb", "ms08-067"],
        enlace: "https://app.hackthebox.com/machines/Legacy",
      },
      {
        id: 4,
        nombre: "RootMe",
        plataforma: "tryhackme",
        dificultad: "facil",
        os: "Linux",
        ip: "10.10.10.108",
        fecha: "2023-02-05",
        categorias: ["web", "privesc", "php"],
        enlace: "https://tryhackme.com/room/rootme",
      },
      {
        id: 5,
        nombre: "Vulnversity",
        plataforma: "tryhackme",
        dificultad: "facil",
        os: "Linux",
        ip: "10.10.10.109",
        fecha: "2023-02-10",
        categorias: ["web", "privesc", "upload"],
        enlace: "https://tryhackme.com/room/vulnversity",
      },
      {
        id: 6,
        nombre: "Metasploitable 2",
        plataforma: "vulnhub",
        dificultad: "facil",
        os: "Linux",
        ip: "192.168.1.100",
        fecha: "2023-02-15",
        categorias: ["metasploit", "multiple"],
        enlace: "https://www.vulnhub.com/entry/metasploitable-2,29/",
      },
      {
        id: 7,
        nombre: "Nibbles",
        plataforma: "hackthebox",
        dificultad: "facil",
        os: "Linux",
        ip: "10.10.10.75",
        fecha: "2023-02-20",
        categorias: ["web", "privesc", "cms"],
        enlace: "https://app.hackthebox.com/machines/Nibbles",
      },
      {
        id: 8,
        nombre: "Beep",
        plataforma: "hackthebox",
        dificultad: "facil",
        os: "Linux",
        ip: "10.10.10.7",
        fecha: "2023-02-25",
        categorias: ["web", "elastix", "lfi"],
        enlace: "https://app.hackthebox.com/machines/Beep",
      },
      {
        id: 9,
        nombre: "Devel",
        plataforma: "hackthebox",
        dificultad: "facil",
        os: "Windows",
        ip: "10.10.10.5",
        fecha: "2023-03-05",
        categorias: ["ftp", "iis", "privesc"],
        enlace: "https://app.hackthebox.com/machines/Devel",
      },
      {
        id: 10,
        nombre: "Popcorn",
        plataforma: "hackthebox",
        dificultad: "media",
        os: "Linux",
        ip: "10.10.10.6",
        fecha: "2023-03-10",
        categorias: ["web", "upload", "privesc"],
        enlace: "https://app.hackthebox.com/machines/Popcorn",
      },
      {
        id: 11,
        nombre: "Brainfuck",
        plataforma: "hackthebox",
        dificultad: "insane",
        os: "Linux",
        ip: "10.10.10.17",
        fecha: "2023-03-15",
        categorias: ["crypto", "web", "wordpress"],
        enlace: "https://app.hackthebox.com/machines/Brainfuck",
      },
      {
        id: 12,
        nombre: "Shocker",
        plataforma: "hackthebox",
        dificultad: "facil",
        os: "Linux",
        ip: "10.10.10.56",
        fecha: "2023-03-20",
        categorias: ["shellshock", "web", "cgi"],
        enlace: "https://app.hackthebox.com/machines/Shocker",
      },
    ]
  
    // Elementos del DOM
    const maquinasGrid = document.getElementById("maquinas-grid")
    const contadorTotal = document.getElementById("contador-total")
    const filtroPlataforma = document.getElementById("filtro-plataforma")
    const filtroDificultad = document.getElementById("filtro-dificultad")
    const filtroCategoria = document.getElementById("filtro-categoria")
    const busquedaMaquina = document.getElementById("busqueda-maquina")
    const paginaAnterior = document.getElementById("pagina-anterior")
    const paginaSiguiente = document.getElementById("pagina-siguiente")
    const paginaActual = document.getElementById("pagina-actual")
  
    // Verificar que los elementos existen
    if (!maquinasGrid) {
      console.error("Error: No se encontró el elemento #maquinas-grid")
      return
    }
  
    // Variables para la paginación
    let maquinasFiltradas = [...maquinasDB]
    let paginaActualNum = 1
    // Reducir el número de máquinas por página para que la sección sea más pequeña
    const maquinasPorPagina = 8 // Cambiado de 9 a 8
  
    // Inicializar la visualización
    actualizarContador(maquinasDB.length)
    renderizarMaquinas(maquinasFiltradas, paginaActualNum)
    actualizarPaginacion()
  
    // Event listeners para los filtros
    if (filtroPlataforma) filtroPlataforma.addEventListener("change", aplicarFiltros)
    if (filtroDificultad) filtroDificultad.addEventListener("change", aplicarFiltros)
    if (filtroCategoria) filtroCategoria.addEventListener("change", aplicarFiltros)
    if (busquedaMaquina) busquedaMaquina.addEventListener("input", aplicarFiltros)
  
    // Event listeners para la paginación
    if (paginaAnterior) paginaAnterior.addEventListener("click", irPaginaAnterior)
    if (paginaSiguiente) paginaSiguiente.addEventListener("click", irPaginaSiguiente)
  
    // Función para aplicar los filtros
    function aplicarFiltros() {
      console.log("Aplicando filtros...")
  
      const plataforma = filtroPlataforma ? filtroPlataforma.value : "todas"
      const dificultad = filtroDificultad ? filtroDificultad.value : "todas"
      const categoria = filtroCategoria ? filtroCategoria.value : "todas"
      const busqueda = busquedaMaquina ? busquedaMaquina.value.toLowerCase().trim() : ""
  
      // Filtrar las máquinas según los criterios seleccionados
      maquinasFiltradas = maquinasDB.filter((maquina) => {
        // Filtro de plataforma
        if (plataforma !== "todas" && maquina.plataforma !== plataforma) {
          return false
        }
  
        // Filtro de dificultad
        if (dificultad !== "todas" && maquina.dificultad !== dificultad) {
          return false
        }
  
        // Filtro de categoría
        if (categoria !== "todas" && !maquina.categorias.includes(categoria)) {
          return false
        }
  
        // Filtro de búsqueda
        if (busqueda && !maquina.nombre.toLowerCase().includes(busqueda)) {
          return false
        }
  
        return true
      })
  
      console.log(`Filtradas ${maquinasFiltradas.length} máquinas`)
  
      // Actualizar la visualización
      paginaActualNum = 1 // Resetear a la primera página al filtrar
      actualizarContador(maquinasFiltradas.length)
      renderizarMaquinas(maquinasFiltradas, paginaActualNum)
      actualizarPaginacion()
    }
  
    // Función para renderizar las máquinas en el grid
    function renderizarMaquinas(maquinas, pagina) {
      console.log(`Renderizando máquinas, página ${pagina}`)
  
      // Limpiar el grid
      maquinasGrid.innerHTML = ""
  
      // Calcular el rango de máquinas a mostrar
      const inicio = (pagina - 1) * maquinasPorPagina
      const fin = Math.min(inicio + maquinasPorPagina, maquinas.length)
      const maquinasPagina = maquinas.slice(inicio, fin)
  
      console.log(`Mostrando máquinas ${inicio + 1} a ${fin} de ${maquinas.length}`)
  
      // Si no hay máquinas, mostrar mensaje
      if (maquinasPagina.length === 0) {
        maquinasGrid.innerHTML = `
          <div class="no-maquinas">
            <p>No se encontraron máquinas que coincidan con los filtros seleccionados.</p>
          </div>
        `
        return
      }
  
      // Renderizar cada máquina
      maquinasPagina.forEach((maquina) => {
        const maquinaCard = document.createElement("div")
        maquinaCard.className = "maquina-card"
        maquinaCard.setAttribute("data-id", maquina.id)
  
        // Crear el HTML para la tarjeta de la máquina
        maquinaCard.innerHTML = `
          <div class="maquina-header">
            <h3 class="maquina-nombre">${maquina.nombre}</h3>
            <span class="maquina-plataforma plataforma-${maquina.plataforma}">${formatearPlataforma(maquina.plataforma)}</span>
          </div>
          <div class="maquina-body">
            <div class="maquina-info">
              <div class="maquina-info-item">
                <span class="maquina-info-label">Sistema:</span>
                <span class="maquina-info-valor">${maquina.os}</span>
              </div>
              <div class="maquina-info-item">
                <span class="maquina-info-label">IP:</span>
                <span class="maquina-info-valor">${maquina.ip}</span>
              </div>
              <div class="maquina-info-item">
                <span class="maquina-info-label">Dificultad:</span>
                <div class="maquina-dificultad">
                  <div class="dificultad-barra dificultad-${maquina.dificultad}">
                    <div class="dificultad-nivel"></div>
                    <div class="dificultad-nivel"></div>
                    <div class="dificultad-nivel"></div>
                    <div class="dificultad-nivel"></div>
                  </div>
                  <span>${formatearDificultad(maquina.dificultad)}</span>
                </div>
              </div>
            </div>
            <div class="maquina-categorias">
              ${maquina.categorias.map((cat) => `<span class="maquina-categoria">${cat}</span>`).join("")}
            </div>
          </div>
          <div class="maquina-footer">
            <span class="maquina-fecha">${formatearFecha(maquina.fecha)}</span>
            <a href="${maquina.enlace}" class="maquina-enlace" target="_blank">Ver detalles <i class="fas fa-external-link-alt"></i></a>
          </div>
        `
  
        // Añadir la tarjeta al grid
        maquinasGrid.appendChild(maquinaCard)
      })
    }
  
    // Función para actualizar el contador de máquinas
    function actualizarContador(cantidad) {
      if (contadorTotal) {
        contadorTotal.textContent = cantidad
      }
    }
  
    // Función para actualizar la paginación
    function actualizarPaginacion() {
      const totalPaginas = Math.ceil(maquinasFiltradas.length / maquinasPorPagina)
  
      // Actualizar texto de página actual
      if (paginaActual) {
        paginaActual.textContent = `Página ${paginaActualNum} de ${totalPaginas || 1}`
      }
  
      // Habilitar/deshabilitar botones de paginación
      if (paginaAnterior) {
        paginaAnterior.disabled = paginaActualNum <= 1
      }
  
      if (paginaSiguiente) {
        paginaSiguiente.disabled = paginaActualNum >= totalPaginas
      }
    }
  
    // Función para ir a la página anterior
    function irPaginaAnterior() {
      if (paginaActualNum > 1) {
        paginaActualNum--
        renderizarMaquinas(maquinasFiltradas, paginaActualNum)
        actualizarPaginacion()
        // Scroll al inicio de la sección
        const seccion = document.getElementById("maquinas-completadas")
        if (seccion) {
          seccion.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  
    // Función para ir a la página siguiente
    function irPaginaSiguiente() {
      const totalPaginas = Math.ceil(maquinasFiltradas.length / maquinasPorPagina)
      if (paginaActualNum < totalPaginas) {
        paginaActualNum++
        renderizarMaquinas(maquinasFiltradas, paginaActualNum)
        actualizarPaginacion()
        // Scroll al inicio de la sección
        const seccion = document.getElementById("maquinas-completadas")
        if (seccion) {
          seccion.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  
    // Función para formatear el nombre de la plataforma
    function formatearPlataforma(plataforma) {
      const plataformas = {
        hackthebox: "HTB",
        tryhackme: "THM",
        vulnhub: "VulnHub",
        offsec: "OffSec",
      }
      return plataformas[plataforma] || plataforma
    }
  
    // Función para formatear la dificultad
    function formatearDificultad(dificultad) {
      const dificultades = {
        facil: "Fácil",
        media: "Media",
        dificil: "Difícil",
        insane: "Insane",
      }
      return dificultades[dificultad] || dificultad
    }
  
    // Función para formatear la fecha
    function formatearFecha(fecha) {
      try {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(fecha).toLocaleDateString("es-ES", options)
      } catch (error) {
        console.error("Error al formatear fecha:", error)
        return fecha
      }
    }
  
    // Efecto de glitch aleatorio en las tarjetas (opcional)
    setInterval(() => {
      const tarjetas = document.querySelectorAll(".maquina-card")
      if (tarjetas.length > 0) {
        const tarjetaAleatoria = tarjetas[Math.floor(Math.random() * tarjetas.length)]
        tarjetaAleatoria.classList.add("glitch-effect")
        setTimeout(() => {
          tarjetaAleatoria.classList.remove("glitch-effect")
        }, 200)
      }
    }, 3000)
  
    console.log("Inicialización de la sección de máquinas completada")
  })
  
  
