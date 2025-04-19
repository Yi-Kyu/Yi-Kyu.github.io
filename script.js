document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top with a slight delay to ensure all elements are rendered
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, 50)

  // Prevent any automatic hash navigation on initial load
  if (window.location.hash) {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      })
    }, 100)
  }

    // Hamburger Menu Functionality
    const hamburgerMenu = document.querySelector(".hamburger-menu")
    const menuPanel = document.querySelector(".menu-panel")
    const menuOverlay = document.querySelector(".menu-overlay")
    const menuLinks = document.querySelectorAll(".menu-link")
  
    // Toggle menu when hamburger icon is clicked
    if (hamburgerMenu) {
      hamburgerMenu.addEventListener("click", toggleMenu)
    }
  
    // Close menu when clicking on overlay
    if (menuOverlay) {
      menuOverlay.addEventListener("click", closeMenu)
    }
  
    // Handle menu link clicks
    if (menuLinks) {
      menuLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault()
  
          // Get the target section id from href or data-target attribute
          const targetId = this.getAttribute("href") || this.getAttribute("data-target")
  
          // Close the menu
          closeMenu()
  
          // Scroll to the section after a small delay to allow menu to close
          setTimeout(() => {
            const targetSection = document.getElementById(targetId.replace("#", ""))
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: "smooth" })
            }
          }, 300)
        })
      })
    }
  
    // Close menu when ESC key is pressed
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuPanel.classList.contains("active")) {
        closeMenu()
      }
    })
  
    // Toggle menu function
    function toggleMenu() {
      menuPanel.classList.toggle("active")
      menuOverlay.classList.toggle("active")
      hamburgerMenu.classList.toggle("active")
  
      // Toggle body scroll
      if (menuPanel.classList.contains("active")) {
        document.body.style.overflow = "hidden"
        hamburgerMenu.classList.remove("hidden")
        hamburgerMenu.classList.add("visible")

      // Also make header visible when menu is opened
      const header = document.querySelector("header")
      if (header) {
        header.classList.remove("hidden")
        header.classList.add("visible")
      }
      } else {
        document.body.style.overflow = ""
        
      // When menu is closed, check scroll position to determine if header/hamburger should be hidden
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      if (scrollTop > 200) {
        // If we're scrolled down, hide header and hamburger after closing menu
        setTimeout(() => {
          const header = document.querySelector("header")
          if (header) {
            header.classList.add("hidden")
            header.classList.remove("visible")
          }
          hamburgerMenu.classList.add("hidden")
          hamburgerMenu.classList.remove("visible")
        }, 300) // Small delay to allow menu closing animation to complete
      }
      }
  
      // Add animation delay to menu items
      const menuItems = document.querySelectorAll(".menu-item")
      menuItems.forEach((item, index) => {
        item.style.animationDelay = `${0.1 + index * 0.05}s`
      })
    }
  
    // Close menu function
    function closeMenu() {
      menuPanel.classList.remove("active")
      menuOverlay.classList.remove("active")
      hamburgerMenu.classList.remove("active")
      document.body.style.overflow = ""
      
    // When menu is closed, check scroll position to determine if header/hamburger should be hidden
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    if (scrollTop > 200) {
      // If we're scrolled down, hide header and hamburger after closing menu
      setTimeout(() => {
        const header = document.querySelector("header")
        if (header) {
          header.classList.add("hidden")
          header.classList.remove("visible")
        }
        hamburgerMenu.classList.add("hidden")
        hamburgerMenu.classList.remove("visible")
      }, 300) // Small delay to allow menu closing animation to complete
    }
  }

  // Crear y configurar el canvas de fondo
  const canvas = document.createElement("canvas")
  canvas.id = "background-canvas"
  document.body.insertBefore(canvas, document.body.firstChild)

  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Función para dibujar el fondo estilo darknet
  function drawBackground() {
    // Limpiar canvas
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar ruido de fondo
    for (let i = 0; i < (canvas.width * canvas.height) / 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 1.5
      const opacity = Math.random() * 0.07
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fillRect(x, y, size, size)
    }

    // Dibujar líneas de cuadrícula
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
    ctx.lineWidth = 1

    // Líneas horizontales
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Líneas verticales
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Efectos glitch
    for (let i = 0; i < 15; i++) {
      const y = Math.random() * canvas.height
      const h = Math.random() * 5 + 1
      const opacity = Math.random() * 0.2 + 0.1

      ctx.fillStyle = Math.random() > 0.8 ? `rgba(255, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`

      ctx.fillRect(0, y, canvas.width, h)
    }

    // Acentos rojos
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 100 + 50

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, "rgba(255, 0, 0, 0.2)")
      gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.05)")
      gradient.addColorStop(1, "rgba(255, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // Efecto viñeta
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height) / 1.5,
    )

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.7)")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // Dibujar fondo inicial
  drawBackground()

  // Redimensionar canvas cuando cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawBackground()
  })

  // Añadir efecto glitch al título
  const headerTitle = document.querySelector("header h1")
  if (headerTitle) {
    const titleText = headerTitle.textContent
    headerTitle.setAttribute("data-text", titleText)
  }

  // Animación al hacer scroll
  const sections = document.querySelectorAll(".animate-on-scroll")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Efecto para el botón de enviar
  const btnEnviar = document.querySelector(".btn-enviar")

  if (btnEnviar) {
    const spans = []
    const spanCount = Math.floor(btnEnviar.offsetWidth / 2)
    const spanWidth = btnEnviar.offsetWidth / spanCount

    for (let i = 0; i < spanCount; i++) {
      const span = document.createElement("span")
      span.style.left = `${i * spanWidth}px`
      spans.push(span)
      btnEnviar.appendChild(span)
      const randomDelay = Math.random() * 1 + 0
      span.style.transitionDelay = randomDelay + "s"
    }
  }

  // Navegación suave - Modificado para no interferir con la carga inicial
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Añadir un pequeño retraso para evitar conflictos con otros eventos
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }, 10)
      }
    })
  })

  // ===== REPRODUCTOR DE MÚSICA =====

  // Elementos del DOM
  const dropZone = document.getElementById("drop-zone")
  const fileInput = document.getElementById("file-input")
  const agregarTemaBtn = document.getElementById("agregar-tema")
  const verColaBtn = document.getElementById("ver-cola")
  const aleatorioBtn = document.getElementById("aleatorio")
  const repetirBtn = document.getElementById("repetir")
  const colaBtn = document.getElementById("cola")

  // Botón de minimizar
  const btnMinimizar = document.getElementById("btn-minimizar-reproductor")
  const reproductorContainer = document.querySelector(".reproductor-container")
  const mainElement = document.querySelector("main")

  // Botones de control
  const reproducirBtn = document.getElementById("reproducir")
  const anteriorBtn = document.getElementById("anterior")
  const siguienteBtn = document.getElementById("siguiente")

  // Elementos de información
  const tituloCancion = document.getElementById("titulo-cancion")
  const artistaCancion = document.getElementById("artista-cancion")
  const tiempoActual = document.getElementById("tiempo-actual")
  const duracion = document.getElementById("duracion")
  const barraProgreso = document.getElementById("barra-progreso")
  const progresoActual = document.getElementById("progreso-actual")

  // Elementos para la barra de progreso circular
  const progresoCircular = document.getElementById("progreso-circular")

  // Elementos de control de volumen
  const btnVolumen = document.getElementById("btn-volumen")
  const barraVolumen = document.getElementById("barra-volumen")
  const nivelVolumen = document.getElementById("nivel-volumen")

  // Elemento del visualizador
  const visualizadorCanvas = document.getElementById("visualizador")
  let canvasCtx = null
  if (visualizadorCanvas) {
    canvasCtx = visualizadorCanvas.getContext("2d")
  }

  // Variables para el visualizador
  let audioContext = null
  let analyser = null
  let source = null
  let dataArray = null
  let animationId = null

  // Crear elemento de audio
  const audioPlayer = new Audio()

  // Estado del reproductor
  const canciones = []
  let indiceActual = 0
  let isReproduciendo = false
  let isAleatorio = false
  let isRepetir = false
  let volumenActual = 0.7 // Volumen inicial (70%)
  let cancionesOrdenadas = [] // Lista original ordenada
  let cancionesAleatorias = [] // Lista aleatorizada

  // Variables para YouTube
  let youtubePlayer = null
  let isYouTubeVideo = false
  let youtubeVideoId = null
  let youtubeInterval = null

  // Función para minimizar/maximizar el reproductor
  function toggleMinimizarReproductor(e) {
    // Detener la propagación del evento para evitar conflictos
    e.stopPropagation()

    if (reproductorContainer) {
      reproductorContainer.classList.toggle("minimizado")

      if (reproductorContainer.classList.contains("minimizado")) {
        mainElement.classList.add("reproductor-minimizado")

        // Añadir evento de clic al contenedor minimizado para expandirlo
        reproductorContainer.addEventListener("click", expandirReproductor)

        // Si hay una canción reproduciéndose, asegurarse de que el visualizador siga funcionando
        if (isReproduciendo && audioContext) {
          // Reiniciar el visualizador si es necesario
          if (!animationId) {
            dibujarVisualizador()
          }
        }
      } else {
        mainElement.classList.remove("reproductor-minimizado")

        // Eliminar evento de clic cuando está expandido
        reproductorContainer.removeEventListener("click", expandirReproductor)
      }
    }
  }

  // Función para expandir el reproductor (solo cuando está minimizado)
  function expandirReproductor(e) {
    // Verificar si el clic fue en un botón de control (para no expandir en ese caso)
    if (
      e.target.closest(".btn-control") ||
      e.target.closest(".btn-reproducir") ||
      e.target.closest(".btn-volumen") ||
      e.target.closest(".visualizador-container") ||
      e.target.closest(".btn-reproducir-container") ||
      e.target.closest(".progreso-circular")
    ) {
      return // No hacer nada si se hizo clic en un botón, en el visualizador o en la barra de progreso circular
    }

    // Expandir el reproductor
    if (reproductorContainer && reproductorContainer.classList.contains("minimizado")) {
      reproductorContainer.classList.remove("minimizado")
      mainElement.classList.remove("reproductor-minimizado")

      // Eliminar el evento de clic
      reproductorContainer.removeEventListener("click", expandirReproductor)
    }
  }

  // Inicializar reproductor
  function inicializarReproductor() {
    // Establecer volumen inicial
    audioPlayer.volume = volumenActual
    actualizarBarraVolumen()
    actualizarIconoVolumen()

    // Eventos del reproductor de audio
    audioPlayer.addEventListener("timeupdate", actualizarProgreso)
    audioPlayer.addEventListener("ended", siguienteCancion)
    audioPlayer.addEventListener("canplay", () => {
      duracion.textContent = formatearTiempo(audioPlayer.duration)
    })

    // Inicializar el visualizador cuando se reproduce
    audioPlayer.addEventListener("play", inicializarVisualizador)

    // Eventos de los botones
    reproducirBtn.addEventListener("click", toggleReproduccion)
    anteriorBtn.addEventListener("click", cancionAnterior)
    siguienteBtn.addEventListener("click", siguienteCancion)

    // Eventos de la barra de progreso
    barraProgreso.addEventListener("click", cambiarPosicionCancion)

    // Eventos de los botones de control
    aleatorioBtn.addEventListener("click", toggleAleatorio)
    repetirBtn.addEventListener("click", toggleRepetir)
    colaBtn.addEventListener("click", mostrarCola)
    verColaBtn.addEventListener("click", mostrarCola)

    // Eventos para agregar canciones
    agregarTemaBtn.addEventListener("click", () => {
      fileInput.click()
    })

    fileInput.addEventListener("change", (e) => {
      procesarArchivos(e.target.files)
    })

    // Configurar Drag & Drop
    configurarDragDrop()

    // Configurar control de volumen
    configurarControlVolumen()

    // Evento para el botón de minimizar
    if (btnMinimizar) {
      btnMinimizar.addEventListener("click", toggleMinimizarReproductor)
    }

    // Cargar la API de YouTube
    cargarYouTubeAPI()
  }

  // Función para cargar la API de YouTube
  function cargarYouTubeAPI() {
    // Crear el elemento script para la API de YouTube
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    // Crear un contenedor oculto para el reproductor de YouTube
    const youtubeContainer = document.createElement("div")
    youtubeContainer.id = "youtube-player-container"
    youtubeContainer.style.position = "absolute"
    youtubeContainer.style.top = "-9999px"
    youtubeContainer.style.left = "-9999px"
    youtubeContainer.style.width = "1px"
    youtubeContainer.style.height = "1px"
    document.body.appendChild(youtubeContainer)
  }

  // Variable global para la API de YouTube
  let YT

  // Función que será llamada cuando la API de YouTube esté lista
  function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player("youtube-player-container", {
      height: "1",
      width: "1",
      playerVars: {
        playsinline: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: onYouTubePlayerReady,
        onStateChange: onYouTubePlayerStateChange,
      },
    })
  }

  // Asignar la función al objeto window para que sea accesible globalmente
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady

  // Función llamada cuando el reproductor de YouTube está listo
  function onYouTubePlayerReady(event) {
    // Configurar el volumen inicial
    event.target.setVolume(volumenActual * 100)
  }

  // Función llamada cuando cambia el estado del reproductor de YouTube
  function onYouTubePlayerStateChange(event) {
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      siguienteCancion()
    }

    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      // Actualizar la interfaz para mostrar que está reproduciendo
      const iconoReproducir = reproducirBtn.querySelector("i")
      iconoReproducir.classList.remove("fa-play")
      iconoReproducir.classList.add("fa-pause")

      if (reproductorContainer) {
        reproductorContainer.classList.add("reproduciendo")
      }

      // Iniciar el intervalo para actualizar el progreso
      if (youtubeInterval) clearInterval(youtubeInterval)
      youtubeInterval = setInterval(actualizarProgresoYouTube, 1000)

      // Iniciar el visualizador con datos simulados
      if (!animationId) {
        inicializarVisualizadorSimulado()
      }
    }

    // YT.PlayerState.PAUSED = 2
    if (event.data === 2) {
      // Actualizar la interfaz para mostrar que está pausado
      const iconoReproducir = reproducirBtn.querySelector("i")
      iconoReproducir.classList.remove("fa-pause")
      iconoReproducir.classList.add("fa-play")

      if (reproductorContainer) {
        reproductorContainer.classList.remove("reproduciendo")
      }

      // Detener el intervalo de actualización de progreso
      if (youtubeInterval) {
        clearInterval(youtubeInterval)
        youtubeInterval = null
      }

      // Pausar la animación del visualizador
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    }
  }

  // Función para actualizar el progreso del video de YouTube
  function actualizarProgresoYouTube() {
    if (!youtubePlayer || !isYouTubeVideo) return

    const currentTime = youtubePlayer.getCurrentTime() || 0
    const duration = youtubePlayer.getDuration() || 0

    if (duration > 0) {
      const porcentaje = (currentTime / duration) * 100
      progresoActual.style.width = `${porcentaje}%`
      tiempoActual.textContent = formatearTiempo(currentTime)
      duracion.textContent = formatearTiempo(duration)

      // Actualizar también la barra de progreso circular
      if (progresoCircular) {
        progresoCircular.style.background = `conic-gradient(var(--primary-color) ${porcentaje * 3.6}deg, rgba(255, 0, 0, 0.2) 0deg)`
      }
    }
  }

  // Función para inicializar un visualizador simulado para YouTube
  function inicializarVisualizadorSimulado() {
    if (!canvasCtx) return

    // Crear un array simulado para los datos de frecuencia
    if (!dataArray) {
      dataArray = new Uint8Array(128)
    }

    // Iniciar la animación
    dibujarVisualizadorSimulado()
  }

  // Función para dibujar el visualizador simulado
  function dibujarVisualizadorSimulado() {
    if (!canvasCtx || !isYouTubeVideo) return

    animationId = requestAnimationFrame(dibujarVisualizadorSimulado)

    // Generar datos simulados basados en una onda sinusoidal
    const time = Date.now() / 1000
    for (let i = 0; i < dataArray.length; i++) {
      // Usar funciones sinusoidales para crear un patrón que parezca música
      const value = Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5
      const value2 = Math.sin(time * 3 + i * 0.2) * 0.5 + 0.5
      const value3 = Math.sin(time * 1.5 + i * 0.15) * 0.5 + 0.5

      // Combinar las ondas y escalar a 0-255
      dataArray[i] = Math.floor(((value + value2 + value3) / 3) * 255)
    }

    // Usar la misma función de dibujo que para el audio normal
    dibujarVisualizador()
  }

  // Función para cargar y reproducir un video de YouTube
  function cargarVideoYouTube(videoId, titulo, artista) {
    if (!youtubePlayer) {
      mostrarNotificacion("Error: El reproductor de YouTube no está listo")
      return
    }

    // Detener cualquier reproducción actual
    if (isReproduciendo) {
      if (isYouTubeVideo) {
        youtubePlayer.stopVideo()
        if (youtubeInterval) {
          clearInterval(youtubeInterval)
          youtubeInterval = null
        }
      } else {
        audioPlayer.pause()
      }
    }

    // Actualizar el estado
    isYouTubeVideo = true
    youtubeVideoId = videoId
    isReproduciendo = true

    // Actualizar información de la canción
    tituloCancion.textContent = titulo || "Video de YouTube"
    artistaCancion.textContent = artista || "YouTube"

    // Cargar y reproducir el video
    youtubePlayer.loadVideoById(videoId)

    // Actualizar la interfaz
    const iconoReproducir = reproducirBtn.querySelector("i")
    iconoReproducir.classList.remove("fa-play")
    iconoReproducir.classList.add("fa-pause")

    if (reproductorContainer) {
      reproductorContainer.classList.add("reproduciendo")
    }
  }

  // Inicializar el visualizador
  function inicializarVisualizador() {
    // Si es un video de YouTube, usar el visualizador simulado
    if (isYouTubeVideo) {
      inicializarVisualizadorSimulado()
      return
    }

    try {
      if (!audioContext) {
        // Crear contexto de audio con manejo de errores
        audioContext = new (window.AudioContext || window.webkitAudioContext)()

        if (!audioContext) {
          console.error("No se pudo crear el contexto de audio")
          return
        }

        analyser = audioContext.createAnalyser()
        analyser.fftSize = 1024 // Valor más bajo para mejor rendimiento

        try {
          source = audioContext.createMediaElementSource(audioPlayer)
          source.connect(analyser)
          analyser.connect(audioContext.destination)

          // Crear array para los datos de frecuencia
          dataArray = new Uint8Array(analyser.frequencyBinCount)
        } catch (error) {
          console.error("Error al configurar el analizador de audio:", error)
          return
        }
      }

      // Iniciar la animación
      if (!animationId) {
        dibujarVisualizador()
      }
    } catch (error) {
      console.error("Error al inicializar el visualizador:", error)
    }
  }

  // Dibujar el visualizador con estilo darknet
  function dibujarVisualizador() {
    if (!canvasCtx) return

    animationId = requestAnimationFrame(dibujarVisualizador)

    // Si es un video de YouTube, los datos ya están simulados
    // Si no, obtener los datos del analizador de audio
    if (!isYouTubeVideo && analyser) {
      analyser.getByteFrequencyData(dataArray)
    }

    // Limpiar el canvas
    canvasCtx.fillStyle = "rgba(10, 10, 10, 0.2)"
    canvasCtx.fillRect(0, 0, visualizadorCanvas.width, visualizadorCanvas.height)

    // Verificar si el reproductor está minimizado para ajustar la visualización
    const isMinimizado = reproductorContainer.classList.contains("minimizado")

    if (isMinimizado) {
      // Dibujar un visualizador circular más simple para el modo minimizado
      const centerX = visualizadorCanvas.width / 2
      const centerY = visualizadorCanvas.height / 2
      const radius = Math.min(centerX, centerY) - 2

      // Dibujar círculos concéntricos que responden a la música
      for (let i = 0; i < 3; i++) {
        const freqIndex = Math.floor(dataArray.length / (i + 1))
        const value = dataArray[freqIndex] / 255
        const currentRadius = radius * (0.4 + value * 0.6) * (1 - i * 0.2)

        canvasCtx.beginPath()
        canvasCtx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
        canvasCtx.fillStyle = `rgba(255, 0, 0, ${0.3 + value * 0.7})`
        canvasCtx.fill()
      }
    } else {
      // Visualizador mejorado para el modo expandido
      const width = visualizadorCanvas.width
      const height = visualizadorCanvas.height

      // Fondo con un gradiente sutil
      const bgGradient = canvasCtx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2)
      bgGradient.addColorStop(0, "rgba(10, 10, 15, 0.2)")
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)")
      canvasCtx.fillStyle = bgGradient
      canvasCtx.fillRect(0, 0, width, height)

      // Parámetros para barras más limpias
      const barCount = 64 // Reducir el número de barras para mayor claridad
      const barSpacing = 2
      const barWidth = width / barCount - barSpacing

      // Suavizar los valores para transiciones más fluidas
      const smoothingFactor = 0.3
      const smoothedArray = new Uint8Array(dataArray.length)

      // Aplicar suavizado a los datos de frecuencia
      for (let i = 0; i < dataArray.length; i++) {
        if (window.lastDataArray && window.lastDataArray[i]) {
          smoothedArray[i] = Math.floor(
            dataArray[i] * (1 - smoothingFactor) + window.lastDataArray[i] * smoothingFactor,
          )
        } else {
          smoothedArray[i] = dataArray[i]
        }
      }

      // Guardar los datos actuales para el próximo frame
      if (!window.lastDataArray) {
        window.lastDataArray = new Uint8Array(dataArray.length)
      }
      window.lastDataArray.set(smoothedArray)

      // Dibujar las barras con efecto espejo
      for (let i = 0; i < barCount; i++) {
        // Mapear el índice de la barra a un rango de frecuencias
        // Usar una escala logarítmica para mejor representación de frecuencias
        const freqIndex = Math.floor(Math.pow(i / barCount, 1.5) * (dataArray.length / 2))

        // Obtener el valor y normalizarlo
        const value = smoothedArray[freqIndex] / 255

        // Altura de la barra con una curva para mejor visualización
        const barHeight = height * 0.5 * Math.pow(value, 1.2)

        // Posición X de la barra
        const x = i * (barWidth + barSpacing)

        // Posición Y (desde el centro)
        const y = height / 2 - barHeight / 2

        // Crear degradado para cada barra
        const gradient = canvasCtx.createLinearGradient(0, y, 0, y + barHeight)

        // Colores más suaves y armoniosos en rojo
        gradient.addColorStop(0, `rgba(255, 50, 50, ${0.7 + value * 0.3})`)
        gradient.addColorStop(0.5, `rgba(255, 0, 0, ${0.8})`)
        gradient.addColorStop(1, `rgba(180, 0, 0, ${0.7})`)

        // Dibujar barra con bordes redondeados
        canvasCtx.beginPath()
        canvasCtx.moveTo(x, y + barHeight)
        canvasCtx.lineTo(x, y)
        canvasCtx.lineTo(x + barWidth, y)
        canvasCtx.lineTo(x + barWidth, y + barHeight)
        canvasCtx.closePath()
        canvasCtx.fillStyle = gradient
        canvasCtx.fill()

        // Añadir brillo en la parte superior de barras altas
        if (value > 0.7) {
          canvasCtx.fillStyle = "rgba(255, 255, 255, 0.8)"
          canvasCtx.fillRect(x, y, barWidth, 2)
        }

        // Dibujar reflejo en la parte inferior (efecto espejo)
        const reflectionGradient = canvasCtx.createLinearGradient(0, y + barHeight, 0, y + barHeight + barHeight * 0.6)
        reflectionGradient.addColorStop(0, `rgba(255, 0, 0, ${0.5 * value})`)
        reflectionGradient.addColorStop(1, "rgba(255, 0, 0, 0)")

        canvasCtx.beginPath()
        canvasCtx.moveTo(x, y + barHeight)
        canvasCtx.lineTo(x + barWidth, y + barHeight)
        canvasCtx.lineTo(x + barWidth, y + barHeight + barHeight * 0.6)
        canvasCtx.lineTo(x, y + barHeight + barHeight * 0.6)
        canvasCtx.closePath()
        canvasCtx.fillStyle = reflectionGradient
        canvasCtx.fill()
      }

      // Añadir línea central sutil
      canvasCtx.beginPath()
      canvasCtx.moveTo(0, height / 2)
      canvasCtx.lineTo(width, height / 2)
      canvasCtx.strokeStyle = "rgba(255, 0, 0, 0.1)"
      canvasCtx.stroke()
    }
  }

  // Actualizar la barra de progreso circular
  function actualizarProgresoCircular() {
    if (!progresoCircular) return

    if (audioPlayer.duration) {
      const porcentaje = (audioPlayer.currentTime / audioPlayer.duration) * 100
      progresoCircular.style.background = `conic-gradient(var(--primary-color) ${porcentaje * 3.6}deg, rgba(255, 0, 0, 0.2) 0deg)`
    }
  }

  // Configurar control de volumen
  function configurarControlVolumen() {
    // Evento para el botón de volumen (silenciar/activar)
    btnVolumen.addEventListener("click", toggleSilencio)

    // Evento para la barra de volumen (clic)
    barraVolumen.addEventListener("click", cambiarVolumenPorClic)

    // Eventos para el scroll en la barra de volumen
    barraVolumen.addEventListener("wheel", cambiarVolumenPorScroll)
  }

  // Silenciar/Activar sonido
  function toggleSilencio() {
    if (audioPlayer.volume > 0) {
      // Guardar el volumen actual antes de silenciar
      volumenActual = audioPlayer.volume
      audioPlayer.volume = 0

      // Si hay un video de YouTube reproduciéndose, silenciarlo también
      if (isYouTubeVideo && youtubePlayer) {
        youtubePlayer.mute()
      }
    } else {
      // Restaurar el volumen anterior
      audioPlayer.volume = volumenActual > 0 ? volumenActual : 0.7

      // Si hay un video de YouTube reproduciéndose, restaurar su volumen
      if (isYouTubeVideo && youtubePlayer) {
        youtubePlayer.unMute()
        youtubePlayer.setVolume(volumenActual * 100)
      }
    }

    actualizarBarraVolumen()
    actualizarIconoVolumen()
  }

  // Cambiar volumen por clic en la barra
  function cambiarVolumenPorClic(e) {
    const rect = barraVolumen.getBoundingClientRect()
    const ancho = rect.width
    const clickX = e.clientX - rect.left

    // Calcular nuevo volumen (0-1)
    volumenActual = Math.max(0, Math.min(1, clickX / ancho))

    // Aplicar el nuevo volumen
    audioPlayer.volume = volumenActual

    // Si hay un video de YouTube reproduciéndose, actualizar su volumen
    if (isYouTubeVideo && youtubePlayer) {
      youtubePlayer.setVolume(volumenActual * 100)
    }

    actualizarBarraVolumen()
    actualizarIconoVolumen()
  }

  // Cambiar volumen por scroll
  function cambiarVolumenPorScroll(e) {
    e.preventDefault()

    // Determinar dirección del scroll
    const delta = Math.sign(e.deltaY) * -0.05

    // Calcular nuevo volumen
    volumenActual = Math.max(0, Math.min(1, audioPlayer.volume + delta))

    // Aplicar el nuevo volumen
    audioPlayer.volume = volumenActual

    // Si hay un video de YouTube reproduciéndose, actualizar su volumen
    if (isYouTubeVideo && youtubePlayer) {
      youtubePlayer.setVolume(volumenActual * 100)
    }

    actualizarBarraVolumen()
    actualizarIconoVolumen()
  }

  // Actualizar la barra de volumen visual
  function actualizarBarraVolumen() {
    nivelVolumen.style.width = `${audioPlayer.volume * 100}%`
  }

  // Actualizar el icono de volumen según el nivel
  function actualizarIconoVolumen() {
    const iconoVolumen = btnVolumen.querySelector("i")
    iconoVolumen.className = ""

    if (audioPlayer.volume === 0) {
      iconoVolumen.className = "fas fa-volume-mute"
    } else if (audioPlayer.volume < 0.3) {
      iconoVolumen.className = "fas fa-volume-off"
    } else if (audioPlayer.volume < 0.7) {
      iconoVolumen.className = "fas fa-volume-down"
    } else {
      iconoVolumen.className = "fas fa-volume-up"
    }
  }

  // Formatear tiempo en formato mm:ss
  function formatearTiempo(segundos) {
    if (isNaN(segundos)) return "0:00"

    const minutos = Math.floor(segundos / 60)
    segundos = Math.floor(segundos % 60)
    return `${minutos}:${segundos.toString().padStart(2, "0")}`
  }

  // Actualizar la barra de progreso
  function actualizarProgreso() {
    // Si es un video de YouTube, usar la función específica
    if (isYouTubeVideo) return

    const porcentaje = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progresoActual.style.width = `${porcentaje}%`
    tiempoActual.textContent = formatearTiempo(audioPlayer.currentTime)

    // Actualizar también la barra de progreso circular
    actualizarProgresoCircular()
  }

  // Cambiar posición de la canción al hacer clic en la barra de progreso
  function cambiarPosicionCancion(e) {
    const ancho = this.clientWidth
    const clickX = e.offsetX

    if (isYouTubeVideo && youtubePlayer) {
      const duracionVideo = youtubePlayer.getDuration()
      const nuevaPosicion = (clickX / ancho) * duracionVideo
      youtubePlayer.seekTo(nuevaPosicion, true)
    } else {
      const duracionCancion = audioPlayer.duration
      audioPlayer.currentTime = (clickX / ancho) * duracionCancion
    }
  }

  // Reproducir/Pausar
  function toggleReproduccion() {
    if (canciones.length === 0 && !isYouTubeVideo) return

    const iconoReproducir = reproducirBtn.querySelector("i")

    if (isReproduciendo) {
      if (isYouTubeVideo && youtubePlayer) {
        youtubePlayer.pauseVideo()
      } else {
        audioPlayer.pause()
      }

      iconoReproducir.classList.remove("fa-pause")
      iconoReproducir.classList.add("fa-play")

      // Quitar clase de reproduciendo
      if (reproductorContainer) {
        reproductorContainer.classList.remove("reproduciendo")
      }

      // Pausar la animación del visualizador
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    } else {
      if (isYouTubeVideo && youtubePlayer) {
        youtubePlayer.playVideo()
      } else {
        audioPlayer.play()
      }

      iconoReproducir.classList.remove("fa-play")
      iconoReproducir.classList.add("fa-pause")

      // Añadir clase de reproduciendo
      if (reproductorContainer) {
        reproductorContainer.classList.add("reproduciendo")
      }

      // Reanudar la animación del visualizador
      if (!animationId) {
        if (isYouTubeVideo) {
          inicializarVisualizadorSimulado()
        } else if (audioContext) {
          dibujarVisualizador()
        }
      }
    }

    isReproduciendo = !isReproduciendo
  }

  // Cargar y reproducir canción
  function cargarCancion(indice) {
    // Si hay un video de YouTube reproduciéndose, detenerlo
    if (isYouTubeVideo && youtubePlayer) {
      youtubePlayer.stopVideo()
      if (youtubeInterval) {
        clearInterval(youtubeInterval)
        youtubeInterval = null
      }
      isYouTubeVideo = false
    }

    if (canciones.length === 0) return

    indiceActual = indice

    // Asegurarse de que el índice esté dentro del rango
    if (indiceActual < 0) indiceActual = canciones.length - 1
    if (indiceActual >= canciones.length) indiceActual = 0

    const cancion = canciones[indiceActual]

    // Actualizar información de la canción
    tituloCancion.textContent = cancion.nombre
    artistaCancion.textContent = cancion.artista || "Archivo local"

    // Cargar y reproducir
    audioPlayer.src = cancion.url
    audioPlayer.load()

    if (isReproduciendo) {
      audioPlayer.play()
      const iconoReproducir = reproducirBtn.querySelector("i")
      iconoReproducir.classList.remove("fa-play")
      iconoReproducir.classList.add("fa-pause")

      // Asegurar que la clase de reproduciendo esté aplicada
      if (reproductorContainer) {
        reproductorContainer.classList.add("reproduciendo")
      }
    }
  }

  // Canción anterior
  function cancionAnterior() {
    if (isYouTubeVideo) {
      // Reiniciar el video actual
      if (youtubePlayer) {
        youtubePlayer.seekTo(0, true)
      }
      return
    }

    if (canciones.length === 0) return

    cargarCancion(indiceActual - 1)
  }

  // Siguiente canción
  function siguienteCancion() {
    if (isYouTubeVideo) {
      // Si está en modo repetir, volver a reproducir el mismo video
      if (isRepetir && youtubePlayer) {
        youtubePlayer.seekTo(0, true)
        return
      }

      // Si no hay más canciones, detener la reproducción
      if (canciones.length === 0) {
        isYouTubeVideo = false
        isReproduciendo = false

        // Actualizar la interfaz
        const iconoReproducir = reproducirBtn.querySelector("i")
        iconoReproducir.classList.remove("fa-pause")
        iconoReproducir.classList.add("fa-play")

        if (reproductorContainer) {
          reproductorContainer.classList.remove("reproduciendo")
        }

        // Detener el intervalo de actualización
        if (youtubeInterval) {
          clearInterval(youtubeInterval)
          youtubeInterval = null
        }

        // Pausar la animación del visualizador
        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }

        return
      }

      // Si hay canciones en la cola, reproducir la siguiente
      isYouTubeVideo = false
      cargarCancion(0)
      return
    }

    if (canciones.length === 0) return

    // Si está en modo repetir, volver a reproducir la misma canción
    if (isRepetir) {
      audioPlayer.currentTime = 0
      audioPlayer.play()
      return
    }

    // Si está en modo aleatorio, elegir una canción aleatoria
    if (isAleatorio) {
      // Simplemente pasar a la siguiente canción en la lista aleatorizada
      cargarCancion(indiceActual + 1)
    } else {
      cargarCancion(indiceActual + 1)
    }
  }

  // Activar/Desactivar modo aleatorio
  function toggleAleatorio() {
    isAleatorio = !isAleatorio
    aleatorioBtn.classList.toggle("active", isAleatorio)

    // Si se activa el modo aleatorio
    if (isAleatorio) {
      // Guardar la lista ordenada actual si aún no se ha guardado
      if (cancionesOrdenadas.length === 0) {
        cancionesOrdenadas = [...canciones]
      }

      // Crear una copia de la lista actual para aleatorizar
      cancionesAleatorias = [...canciones]

      // Algoritmo Fisher-Yates para mezclar el array
      for (let i = cancionesAleatorias.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[cancionesAleatorias[i], cancionesAleatorias[j]] = [cancionesAleatorias[j], cancionesAleatorias[i]]
      }

      // Encontrar la posición de la canción actual en la lista aleatorizada
      const cancionActual = canciones[indiceActual]
      indiceActual = cancionesAleatorias.findIndex((c) => c === cancionActual)

      // Reemplazar la lista de canciones con la versión aleatorizada
      canciones.length = 0
      cancionesAleatorias.forEach((c) => canciones.push(c))

      // Mostrar mensaje de confirmación
      console.log("Modo aleatorio activado - Lista aleatorizada")

      // Opcional: Mostrar notificación visual al usuario
      mostrarNotificacion("Reproducción aleatoria activada")
    } else {
      // Si se desactiva el modo aleatorio, restaurar la lista ordenada original
      if (cancionesOrdenadas.length > 0) {
        // Encontrar la posición de la canción actual en la lista ordenada
        const cancionActual = canciones[indiceActual]

        // Restaurar la lista ordenada
        canciones.length = 0
        cancionesOrdenadas.forEach((c) => canciones.push(c))

        // Actualizar el índice actual
        indiceActual = canciones.findIndex((c) => c === cancionActual)

        console.log("Modo aleatorio desactivado - Lista restaurada")

        // Opcional: Mostrar notificación visual al usuario
        mostrarNotificacion("Reproducción normal restaurada")
      }
    }
  }

  // Añadir esta función para mostrar notificaciones temporales
  function mostrarNotificacion(mensaje) {
    // Verificar si ya existe una notificación
    let notificacion = document.querySelector(".reproductor-notificacion")

    // Si no existe, crearla
    if (!notificacion) {
      notificacion = document.createElement("div")
      notificacion.className = "reproductor-notificacion"
      reproductorContainer.appendChild(notificacion)

      // Añadir estilos inline para la notificación
      notificacion.style.position = "absolute"
      notificacion.style.bottom = "10px"
      notificacion.style.left = "50%"
      notificacion.style.transform = "translateX(-50%)"
      notificacion.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
      notificacion.style.color = "white"
      notificacion.style.padding = "8px 16px"
      notificacion.style.borderRadius = "20px"
      notificacion.style.fontSize = "0.9em"
      notificacion.style.zIndex = "100"
      notificacion.style.opacity = "0"
      notificacion.style.transition = "opacity 0.3s ease"
    }

    // Actualizar el mensaje y mostrar la notificación
    notificacion.textContent = mensaje
    notificacion.style.opacity = "1"

    // Ocultar después de 2 segundos
    setTimeout(() => {
      notificacion.style.opacity = "0"
    }, 2000)
  }

  // Activar/Desactivar modo repetir
  function toggleRepetir() {
    isRepetir = !isRepetir
    repetirBtn.classList.toggle("active", isRepetir)
  }

  // Mostrar cola de reproducción
  function mostrarCola() {
    if (canciones.length === 0 && !isYouTubeVideo) {
      alert("No hay canciones en la cola")
      return
    }

    let mensaje = "Cola de reproducción:\n\n"

    if (isYouTubeVideo) {
      mensaje += "▶️ YouTube: " + tituloCancion.textContent + "\n"
    }

    canciones.forEach((cancion, indice) => {
      const estaActiva = !isYouTubeVideo && indice === indiceActual ? "▶️ " : ""
      mensaje += `${estaActiva}${indice + 1}. ${cancion.nombre}\n`
    })

    alert(mensaje)
  }

  // Procesar archivos de audio
  function procesarArchivos(files) {
    if (!files || files.length === 0) return

    const archivosAudio = Array.from(files).filter(
      (file) =>
        file.type.startsWith("audio/") ||
        file.name.endsWith(".mp3") ||
        file.name.endsWith(".wav") ||
        file.name.endsWith(".ogg") ||
        file.name.endsWith(".m4a"),
    )

    if (archivosAudio.length === 0) {
      alert("No se encontraron archivos de audio válidos")
      return
    }

    // Crear objetos de canción y añadirlos a la lista
    archivosAudio.forEach((file) => {
      const cancion = {
        nombre: file.name.replace(/\.[^/.]+$/, ""), // Quitar extensión
        artista: "Archivo local",
        url: URL.createObjectURL(file),
        file: file,
      }

      canciones.push(cancion)
    })

    // Actualizar también la lista ordenada
    cancionesOrdenadas = [...canciones]

    // Si es la primera canción, cargarla automáticamente
    if (canciones.length === archivosAudio.length) {
      cargarCancion(0)
    }

    // Notificar al usuario
    alert(`Se agregaron ${archivosAudio.length} canciones a la cola`)
  }

  // Configurar Drag & Drop
  function configurarDragDrop() {
    if (!dropZone) return // Prevenir comportamiento por defecto
    ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropZone.addEventListener(eventName, preventDefaults, false)
    })

    function preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Resaltar la zona de drop cuando se arrastra un archivo sobre ella
    ;["dragenter", "dragover"].forEach((eventName) => {
      dropZone.addEventListener(eventName, highlight, false)
    })
    ;["dragleave", "drop"].forEach((eventName) => {
      dropZone.addEventListener(eventName, unhighlight, false)
    })

    function highlight() {
      dropZone.classList.add("drag-over")
    }

    function unhighlight() {
      dropZone.classList.remove("drag-over")
    }

    // Manejar el drop
    dropZone.addEventListener("drop", handleDrop, false)

    function handleDrop(e) {
      const dt = e.dataTransfer
      const files = dt.files

      procesarArchivos(files)
    }
  }

  // Inicializar el reproductor
  if (dropZone && fileInput && reproducirBtn) {
    inicializarReproductor()
  }

  // ===== NUEVAS FUNCIONALIDADES =====

  // Filtros de la galería
  const filtrosBtns = document.querySelectorAll(".filtro-btn")
  const galeriaItems = document.querySelectorAll(".galeria-item")

  if (filtrosBtns.length > 0 && galeriaItems.length > 0) {
    filtrosBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Quitar clase active de todos los botones
        filtrosBtns.forEach((b) => b.classList.remove("active"))
        // Añadir clase active al botón clickeado
        btn.classList.add("active")

        const filtro = btn.getAttribute("data-filter")

        // Filtrar los elementos de la galería
        galeriaItems.forEach((item) => {
          if (filtro === "todos") {
            item.style.display = "block"
          } else {
            const categorias = item.getAttribute("data-categoria").split(" ")
            if (categorias.includes(filtro)) {
              item.style.display = "block"
            } else {
              item.style.display = "none"
            }
          }
        })
      })
    })
  }

  // Modal de la galería
  const galeriaModal = document.getElementById("galeria-modal")
  const modalImg = document.getElementById("modal-img")
  const modalTitulo = document.getElementById("modal-titulo")
  const modalDescripcion = document.getElementById("modal-descripcion")
  const modalCerrar = document.querySelector(".modal-cerrar")
  const modalPrev = document.querySelector(".modal-prev")
  const modalNext = document.querySelector(".modal-next")

  if (galeriaItems.length > 0 && galeriaModal) {
    let currentIndex = 0

    // Abrir modal al hacer clic en un elemento de la galería
    galeriaItems.forEach((item, index) => {
      const infoBtn = item.querySelector(".galeria-info a")
      if (infoBtn) {
        infoBtn.addEventListener("click", (e) => {
          e.preventDefault()
          currentIndex = index
          openModal(item)
        })
      }
    })

    // Función para abrir el modal
    function openModal(item) {
      const img = item.querySelector("img")
      const titulo = item.querySelector("h3")
      const descripcion = item.querySelector("p")

      if (img && modalImg) modalImg.src = img.src
      if (titulo && modalTitulo) modalTitulo.textContent = titulo.textContent
      if (descripcion && modalDescripcion) modalDescripcion.textContent = descripcion.textContent

      galeriaModal.style.display = "block"
      document.body.style.overflow = "hidden" // Evitar scroll
    }

    // Cerrar modal
    if (modalCerrar) {
      modalCerrar.addEventListener("click", closeModal)
    }

    // Cerrar modal al hacer clic fuera de la imagen
    if (galeriaModal) {
      galeriaModal.addEventListener("click", (e) => {
        if (e.target === galeriaModal) closeModal()
      })
    }

    // Función para cerrar el modal
    function closeModal() {
      galeriaModal.style.display = "none"
      document.body.style.overflow = "auto" // Restaurar scroll
    }

    // Navegación en el modal
    if (modalPrev) {
      modalPrev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + galeriaItems.length) % galeriaItems.length
        // Buscar el siguiente elemento visible
        let nextItem = galeriaItems[currentIndex]
        while (window.getComputedStyle(nextItem).display === "none" && currentIndex !== 0) {
          currentIndex = (currentIndex - 1 + galeriaItems.length) % galeriaItems.length
          nextItem = galeriaItems[currentIndex]
        }
        openModal(nextItem)
      })
    }

    if (modalNext) {
      modalNext.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % galeriaItems.length
        // Buscar el siguiente elemento visible
        let nextItem = galeriaItems[currentIndex]
        while (window.getComputedStyle(nextItem).display === "none" && currentIndex !== 0) {
          currentIndex = (currentIndex + 1) % galeriaItems.length
          nextItem = galeriaItems[currentIndex]
        }
        openModal(nextItem)
      })
    }

    // Navegación con teclado
    document.addEventListener("keydown", (e) => {
      if (galeriaModal.style.display === "block") {
        if (e.key === "Escape") closeModal()
        if (e.key === "ArrowLeft") modalPrev.click()
        if (e.key === "ArrowRight") modalNext.click()
      }
    })
  }

  // Slider de testimonios
  const testimonioSlides = document.querySelectorAll(".testimonio-slide")
  const testimonioDots = document.querySelectorAll(".testimonio-dots .dot")
  const testimonioPrev = document.querySelector(".testimonio-prev")
  const testimonioNext = document.querySelector(".testimonio-next")

  if (testimonioSlides.length > 0) {
    let currentTestimonioIndex = 0

    // Mostrar el primer testimonio
    testimonioSlides[0].classList.add("active")

    // Función para cambiar de testimonio
    function showTestimonio(index) {
      // Ocultar todos los testimonios
      testimonioSlides.forEach((slide) => slide.classList.remove("active"))
      testimonioDots.forEach((dot) => dot.classList.remove("active"))

      // Mostrar el testimonio seleccionado
      testimonioSlides[index].classList.add("active")
      if (testimonioDots[index]) testimonioDots[index].classList.add("active")

      currentTestimonioIndex = index
    }

    // Eventos para los botones de navegación
    if (testimonioPrev) {
      testimonioPrev.addEventListener("click", () => {
        const newIndex = (currentTestimonioIndex - 1 + testimonioSlides.length) % testimonioSlides.length
        showTestimonio(newIndex)
      })
    }

    if (testimonioNext) {
      testimonioNext.addEventListener("click", () => {
        const newIndex = (currentTestimonioIndex + 1) % testimonioSlides.length
        showTestimonio(newIndex)
      })
    }

    // Eventos para los dots
    testimonioDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number.parseInt(dot.getAttribute("data-slide"))
        showTestimonio(index)
      })
    })

    // Cambio automático de testimonios
    setInterval(() => {
      if (document.visibilityState === "visible") {
        const newIndex = (currentTestimonioIndex + 1) % testimonioSlides.length
        showTestimonio(newIndex)
      }
    }, 8000)
  }

  // ===== TERMINAL =====
  const terminalContainer = document.getElementById("terminal-container")
  const terminalMinimized = document.getElementById("terminal-minimized")
  const terminalOutput = document.getElementById("terminal-output")
  const terminalInput = document.getElementById("terminal-input")
  const btnMinimizarTerminal = document.getElementById("btn-minimizar-terminal")
  const btnMaximizarTerminal = document.getElementById("btn-maximizar-terminal")
  const btnCerrarTerminal = document.getElementById("btn-cerrar-terminal")

  // Historial de comandos
  const commandHistory = []
  let historyIndex = -1

  // Variables para YouTube
  let youtubeSearchResults = []
  const youtubeSearchPage = 1
  const youtubeResultsPerPage = 5
  let youtubeCurrentResultIndex = 0

  // Comandos disponibles
  const commands = {
    help: {
      description: "Muestra la lista de comandos disponibles",
      usage: "help",
      execute: () => {
        let output = "<div class='terminal-command-output'>"
        output += "<p>Comandos disponibles:</p>"
        output += "<table class='terminal-table'>"
        output += "<tr><th>Comando</th><th>Descripción</th></tr>"

        Object.keys(commands)
          .sort()
          .forEach((cmd) => {
            if (cmd !== "clear") {
              output += `<tr><td>${cmd}</td><td>${commands[cmd].description}</td></tr>`
            }
          })

        output += "</table>"
        output +=
          "<p>Para más información sobre un comando específico, escribe: <span class='terminal-cmd'>help [comando]</span></p>"
        output += "</div>"

        return output
      },
    },

    about: {
      description: "Muestra información sobre mí",
      usage: "about",
      execute: () => {
        return `
          <div class='terminal-command-output'>
            <p>Desarrollador Web & Especialista en Seguridad</p>
            <p>Con más de 5 años de experiencia en el sector, me especializo en:</p>
            <ul>
              <li>Desarrollo de aplicaciones web seguras</li>
              <li>Auditorías de seguridad y pentesting</li>
              <li>Implementación de arquitecturas Zero Trust</li>
              <li>Desarrollo frontend con React y Vue.js</li>
              <li>Desarrollo backend con Node.js y Python</li>
            </ul>
            <p>Para más información, visita la sección <a href="#sobre-mi">Sobre Mí</a>.</p>
          </div>
        `
      },
    },

    skills: {
      description: "Muestra mis habilidades técnicas",
      usage: "skills [categoría]",
      execute: (args) => {
        const categories = {
          frontend: ["HTML5/CSS3", "JavaScript (ES6+)", "React", "Vue.js", "SASS/LESS", "Webpack"],
          backend: ["Node.js", "Express", "Python", "Django", "PHP", "SQL/NoSQL"],
          security: [
            "Pentesting",
            "OWASP Top 10",
            "Análisis de Malware",
            "Seguridad en APIs",
            "Kali Linux",
            "Metasploit",
          ],
          devops: ["Git/GitHub", "Docker", "CI/CD", "AWS/Azure", "Linux", "Nginx/Apache"],
        }

        let output = "<div class='terminal-command-output'>"

        if (args.length === 0) {
          output += "<p>Categorías disponibles:</p>"
          output += "<ul>"
          output += "<li>frontend - Desarrollo Frontend</li>"
          output += "<li>backend - Desarrollo Backend</li>"
          output += "<li>security - Seguridad Informática</li>"
          output += "<li>devops - DevOps & Herramientas</li>"
          output += "</ul>"
          output += "<p>Uso: <span class='terminal-cmd'>skills [categoría]</span></p>"
        } else {
          const category = args[0].toLowerCase()

          if (categories[category]) {
            output += `<p>Habilidades en ${category}:</p>`
            output += "<ul>"
            categories[category].forEach((skill) => {
              output += `<li>${skill}</li>`
            })
            output += "</ul>"
          } else {
            output += `<p class='terminal-error'>Error: La categoría '${category}' no existe.</p>`
            output += "<p>Categorías disponibles: frontend, backend, security, devops</p>"
          }
        }

        output += "</div>"
        return output
      },
    },

    projects: {
      description: "Muestra información sobre mis proyectos",
      usage: "projects [id]",
      execute: (args) => {
        const projects = [
          {
            id: 1,
            name: "Sistema de Autenticación Segura",
            description:
              "Sistema de autenticación con múltiples factores, protección contra ataques de fuerza bruta y gestión segura de sesiones.",
            technologies: ["Node.js", "JWT", "MongoDB", "Express"],
            link: "#proyectos",
          },
          {
            id: 2,
            name: "Escáner de Vulnerabilidades Web",
            description:
              "Herramienta automatizada para detectar vulnerabilidades comunes en aplicaciones web como XSS, CSRF, inyección SQL y configuraciones incorrectas.",
            technologies: ["Python", "API REST", "Docker"],
            link: "#proyectos",
          },
          {
            id: 3,
            name: "Dashboard de Monitoreo en Tiempo Real",
            description:
              "Panel de control para visualización de datos en tiempo real con métricas de seguridad, alertas configurables y análisis de patrones.",
            technologies: ["React", "WebSockets", "D3.js", "Node.js"],
            link: "#proyectos",
          },
        ]

        let output = "<div class='terminal-command-output'>"

        if (args.length === 0) {
          output += "<p>Proyectos destacados:</p>"
          output += "<table class='terminal-table'>"
          output += "<tr><th>ID</th><th>Nombre</th><th>Tecnologías</th></tr>"

          projects.forEach((project) => {
            output += `<tr><td>${project.id}</td><td>${project.name}</td><td>${project.technologies.join(", ")}</td></tr>`
          })

          output += "</table>"
          output +=
            "<p>Para más detalles sobre un proyecto específico, escribe: <span class='terminal-cmd'>projects [id]</span></p>"
        } else {
          const projectId = Number.parseInt(args[0])
          const project = projects.find((p) => p.id === projectId)

          if (project) {
            output += `<p><strong>${project.name}</strong></p>`
            output += `<p>${project.description}</p>`
            output += "<p>Tecnologías utilizadas:</p>"
            output += "<ul>"
            project.technologies.forEach((tech) => {
              output += `<li>${tech}</li>`
            })
            output += "</ul>"
            output += `<p>Para más información, visita la <a href="${project.link}">sección de proyectos</a>.</p>`
          } else {
            output += `<p class='terminal-error'>Error: No se encontró ningún proyecto con ID ${projectId}.</p>`
            output += "<p>IDs disponibles: 1, 2, 3</p>"
          }
        }

        output += "</div>"
        return output
      },
    },

    contact: {
      description: "Muestra información de contacto",
      usage: "contact",
      execute: () => {
        return `
          <div class='terminal-command-output'>
            <p>Información de contacto:</p>
            <ul>
              <li>Email: email@ejemplo.com</li>
              <li>Teléfono: +34 600 000 000</li>
              <li>Ubicación: Madrid, España</li>
            </ul>
            <p>También puedes contactarme a través del <a href="#contacto">formulario de contacto</a>.</p>
            <p>Redes sociales:</p>
            <ul>
              <li>GitHub: <a href="#">github.com/minombre</a></li>
              <li>LinkedIn: <a href="#">linkedin.com/in/minombre</a></li>
              <li>Twitter: <a href="#">twitter.com/minombre</a></li>
            </ul>
          </div>
        `
      },
    },

    blog: {
      description: "Muestra mis últimos artículos del blog",
      usage: "blog",
      execute: () => {
        return `
          <div class='terminal-command-output'>
            <p>Últimos artículos del blog:</p>
            <ul>
              <li><a href="#blog">Seguridad en APIs REST: Mejores Prácticas</a> - 15 MAR</li>
              <li><a href="#blog">Zero Trust Architecture: Implementación Práctica</a> - 28 FEB</li>
              <li><a href="#blog">Protección contra Ataques XSS en Aplicaciones Modernas</a> - 10 FEB</li>
            </ul>
            <p>Visita la <a href="#blog">sección de blog</a> para ver todos los artículos.</p>
          </div>
        `
      },
    },

    clear: {
      description: "Limpia la terminal",
      usage: "clear",
      execute: () => {
        terminalOutput.innerHTML = ""
        return ""
      },
    },

    clean: {
      description: "Limpia la terminal y el historial de comandos",
      usage: "clean",
      execute: () => {
        // Limpiar la salida visible
        terminalOutput.innerHTML = `
          <div class="terminal-welcome">
            <div class="ascii-art">
██████╗  ██████╗ ███╗   ██╗███████╗ ██████╗ ██╗     ███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝██╔═══██╗██║     ██╔════╝
██║     ██║   ██║██╔██╗ ██║███████╗██║   ██║██║     █████╗  
██║     ██║   ██║██║╚██╗██║╚════██║██║   ██║██║     ██╔══╝  
╚██████╗╚██████╔╝██║ ╚████║███████╗╚██████╔╝███████╗███████╗
╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝                    
            </div>
            <div class="terminal-text">Terminal limpiada. Escribe <span class="terminal-cmd">help</span> para ver los comandos disponibles.</div>
          </div>
        `

        // Limpiar el historial de comandos
        commandHistory.length = 0
        historyIndex = -1

        return ""
      },
    },

    echo: {
      description: "Muestra un mensaje en la terminal",
      usage: "echo [mensaje]",
      execute: (args) => {
        if (args.length === 0) {
          return "<div class='terminal-command-output'><p></p></div>"
        }
        return `<div class='terminal-command-output'><p>${args.join(" ")}</p></div>`
      },
    },

    date: {
      description: "Muestra la fecha y hora actual",
      usage: "date",
      execute: () => {
        const now = new Date()
        return `<div class='terminal-command-output'><p>${now.toLocaleString()}</p></div>`
      },
    },

    whoami: {
      description: "Muestra información sobre el usuario",
      usage: "whoami",
      execute: () => {
        return `<div class='terminal-command-output'><p>visitor@portfolio</p></div>`
      },
    },

    pwd: {
      description: "Muestra la ruta del directorio actual",
      usage: "pwd",
      execute: () => {
        // Obtener el valor actual del directorio desde el elemento .terminal-path
        const currentPath = document.querySelector(".terminal-path").textContent
        // Formatear la ruta completa
        const fullPath = currentPath === "~" ? "/home/visitor" : `/home/visitor${currentPath.substring(1)}`
        return `<div class='terminal-command-output'><p>${fullPath}</p></div>`
      },
    },

    ls: {
      description: "Lista los contenidos del directorio actual",
      usage: "ls",
      execute: () => {
        return `
          <div class='terminal-command-output'>
            <p><span style="color: #4080ff;">inicio/</span></p>
            <p><span style="color: #4080ff;">proyectos/</span></p>
            <p><span style="color: #4080ff;">blog/</span></p>
            <p><span style="color: #4080ff;">habilidades/</span></p>
            <p><span style="color: #4080ff;">sobre-mi/</span></p>
            <p><span style="color: #4080ff;">contacto/</span></p>
            <p><span style="color: var(--primary-color);">curriculum.pdf</span></p>
            <p><span style="color: var(--primary-color);">portfolio.zip</span></p>
          </div>
        `
      },
    },

    cd: {
      description: "Cambia el directorio actual",
      usage: "cd [directorio]",
      execute: (args) => {
        const directories = ["inicio", "proyectos", "blog", "habilidades", "sobre-mi", "contacto"]

        if (args.length === 0 || args[0] === "~") {
          document.querySelector(".terminal-path").textContent = "~"
          return "<div class='terminal-command-output'><p>Directorio cambiado a: ~</p></div>"
        }

        const dir = args[0]

        if (directories.includes(dir)) {
          document.querySelector(".terminal-path").textContent = `~/${dir}`

          // Opcional: Desplazarse a la sección correspondiente
          const section = document.getElementById(dir)
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }

          return `<div class='terminal-command-output'><p>Directorio cambiado a: ~/${dir}</p></div>`
        } else {
          return `<div class='terminal-command-output'><p class='terminal-error'>Error: El directorio '${dir}' no existe.</p></div>`
        }
      },
    },

    download: {
      description: "Descarga un archivo",
      usage: "download [archivo]",
      execute: (args) => {
        const files = ["curriculum.pdf", "portfolio.zip"]

        if (args.length === 0) {
          return `
            <div class='terminal-command-output'>
              <p>Archivos disponibles para descargar:</p>
              <ul>
                ${files.map((file) => `<li>${file}</li>`).join("")}
              </ul>
              <p>Uso: <span class='terminal-cmd'>download [archivo]</span></p>
            </div>
          `
        }

        const file = args[0]

        if (files.includes(file)) {
          if (file === "curriculum.pdf") {
            generarYDescargarPDF()
            return `
              <div class='terminal-command-output'>
                <p class='terminal-success'>Descargando ${file}...</p>
              </div>
            `
          } else if (file === "portfolio.zip") {
            generarYDescargarZIP()
            return `
              <div class='terminal-command-output'>
                <p class='terminal-success'>Descargando ${file}...</p>
              </div>
            `
          }
        } else {
          return `<div class='terminal-command-output'><p class='terminal-error'>Error: El archivo '${file}' no existe.</p></div>`
        }
      },
    },

    matrix: {
      description: "Activa el modo Matrix",
      usage: "matrix",
      execute: () => {
        // Crear un canvas para el efecto Matrix
        const matrixCanvas = document.createElement("canvas")
        matrixCanvas.id = "matrix-canvas"
        matrixCanvas.style.position = "fixed"
        matrixCanvas.style.top = "0"
        matrixCanvas.style.left = "0"
        matrixCanvas.style.width = "100%"
        matrixCanvas.style.height = "100%"
        matrixCanvas.style.zIndex = "9999"
        document.body.appendChild(matrixCanvas)

        // Configurar el canvas
        const canvas = document.getElementById("matrix-canvas")
        const ctx = canvas.getContext("2d")

        // Hacer que el canvas ocupe toda la pantalla
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth

        // Caracteres para el efecto Matrix (usando caracteres que parecen código)
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

        // Convertir la cadena en un array de caracteres
        const charArray = chars.split("")

        // Tamaño de la fuente
        const fontSize = 14
        const columns = canvas.width / fontSize

        // Array para seguir la posición Y de cada columna
        const drops = []

        // Inicializar todas las gotas en la posición Y=1
        for (let i = 0; i < columns; i++) {
          drops[i] = 1
        }

        // Función para dibujar el efecto Matrix
        function drawMatrix() {
          // Fondo negro semi-transparente para crear el efecto de desvanecimiento
          ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Color y fuente para los caracteres
          ctx.fillStyle = "#0f0" // Verde Matrix clásico
          ctx.font = fontSize + "px monospace"

          // Dibujar los caracteres
          for (let i = 0; i < drops.length; i++) {
            // Seleccionar un caracter aleatorio
            const text = charArray[Math.floor(Math.random() * charArray.length)]

            // Dibujar el caracter
            ctx.fillText(text, i * fontSize, drops[i] * fontSize)

            // Reiniciar la gota cuando llega al final o aleatoriamente
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0
            }

            // Mover la gota hacia abajo
            drops[i]++
          }
        }

        // Iniciar la animación
        const matrixInterval = setInterval(drawMatrix, 33)

        // Detener la animación después de 10 segundos
        setTimeout(() => {
          clearInterval(matrixInterval)
          document.body.removeChild(matrixCanvas)
        }, 10000)

        return `
          <div class='terminal-command-output'>
            <p class='terminal-success'>Modo Matrix activado. Disfruta del espectáculo...</p>
            <p>El efecto se detendrá automáticamente después de 10 segundos.</p>
          </div>
        `
      },
    },

    youtube: {
      description: "Busca y reproduce videos de YouTube",
      usage: "youtube buscar [término] | youtube play [índice] | youtube next | youtube prev | youtube clear",
      execute: (args) => {
        if (args.length === 0) {
          return `
            <div class='terminal-command-output'>
              <p>Comando YouTube - Reproduce videos de YouTube en el reproductor de música</p>
              <p>Uso:</p>
              <ul>
                <li><span class='terminal-cmd'>youtube buscar [término]</span> - Busca videos en YouTube</li>
                <li><span class='terminal-cmd'>youtube play [índice]</span> - Reproduce el video del índice indicado</li>
                <li><span class='terminal-cmd'>youtube next</span> - Muestra el siguiente resultado de búsqueda</li>
                <li><span class='terminal-cmd'>youtube prev</span> - Muestra el resultado de búsqueda anterior</li>
                <li><span class='terminal-cmd'>youtube clear</span> - Limpia los resultados de búsqueda</li>
              </ul>
            </div>
          `
        }

        const action = args[0].toLowerCase()

        if (action === "buscar" || action === "search") {
          if (args.length < 2) {
            return "<p class='terminal-error'>Error: Debes especificar un término de búsqueda.</p>"
          }

          const searchTerm = args.slice(1).join(" ")
          return buscarVideosYoutube(searchTerm)
        } else if (action === "play") {
          if (args.length < 2) {
            return "<p class='terminal-error'>Error: Debes especificar el índice del video a reproducir.</p>"
          }

          const index = Number.parseInt(args[1]) - 1
          return reproducirVideoYoutube(index)
        } else if (action === "next") {
          return mostrarSiguienteResultado()
        } else if (action === "prev") {
          return mostrarResultadoAnterior()
        } else if (action === "clear") {
          youtubeSearchResults = []
          youtubeCurrentResultIndex = 0
          return "<p>Resultados de búsqueda eliminados.</p>"
        } else {
          return `<p class='terminal-error'>Error: Acción '${action}' no reconocida. Usa 'youtube' sin argumentos para ver la ayuda.</p>`
        }
      },
    },
  }

  // Función para buscar videos en YouTube (simulada)
  function buscarVideosYoutube(searchTerm) {
    // Base de datos ampliada de videos populares
    const videosDatabase = [
      { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channelTitle: "Rick Astley" },
      { id: "L_jWHffIx5E", title: "Smash Mouth - All Star", channelTitle: "Smash Mouth" },
      { id: "y6120QOlsfU", title: "Darude - Sandstorm", channelTitle: "Darude" },
      { id: "9bZkp7q19f0", title: "PSY - Gangnam Style", channelTitle: "PSY" },
      { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", channelTitle: "Luis Fonsi" },
      { id: "kXYiU_JCYtU", title: "Numb - Linkin Park", channelTitle: "Linkin Park" },
      { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", channelTitle: "Queen Official" },
      { id: "YR5ApYxkU-U", title: "Pink Floyd - Another Brick In The Wall", channelTitle: "Pink Floyd" },
      { id: "hTWKbfoikeg", title: "Nirvana - Smells Like Teen Spirit", channelTitle: "Nirvana" },
      { id: "6Ejga4kJUts", title: "The Cranberries - Zombie", channelTitle: "The Cranberries" },
      { id: "eVTXPUF4Oz4", title: "Linkin Park - In The End", channelTitle: "Linkin Park" },
      { id: "1w7OgIMMRc4", title: "Guns N' Roses - Sweet Child O' Mine", channelTitle: "Guns N' Roses" },
      { id: "lDK9QqIzhwk", title: "Bon Jovi - Livin' On A Prayer", channelTitle: "Bon Jovi" },
      { id: "YlUKcNNmywk", title: "Red Hot Chili Peppers - Californication", channelTitle: "Red Hot Chili Peppers" },
      { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channelTitle: "Ed Sheeran" },
      { id: "RgKAFK5djSk", title: "Wiz Khalifa - See You Again ft. Charlie Puth", channelTitle: "Wiz Khalifa" },
      { id: "60ItHLz5WEA", title: "Alan Walker - Faded", channelTitle: "Alan Walker" },
      { id: "pRpeEdMmmQ0", title: "Shakira - Waka Waka (This Time for Africa)", channelTitle: "Shakira" },
      { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channelTitle: "Katy Perry" },
      { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channelTitle: "Taylor Swift" },
      { id: "09R8_2nJtjg", title: "Maroon 5 - Sugar", channelTitle: "Maroon 5" },
      { id: "YQHsXMglC9A", title: "Adele - Hello", channelTitle: "Adele" },
      { id: "hLQl3WQQoQ0", title: "Adele - Someone Like You", channelTitle: "Adele" },
      { id: "rYEDA3JcQqw", title: "Adele - Rolling in the Deep", channelTitle: "Adele" },
      { id: "RBumgq5yVrA", title: "Passenger - Let Her Go", channelTitle: "Passenger" },
      { id: "0KSOMA3QBU0", title: "Katy Perry - Dark Horse ft. Juicy J", channelTitle: "Katy Perry" },
      { id: "QK8mJJJvaes", title: "MACKLEMORE & RYAN LEWIS - THRIFT SHOP", channelTitle: "Macklemore & Ryan Lewis" },
      { id: "YVkUvmDQ3HY", title: "Eminem - Without Me", channelTitle: "Eminem" },
      { id: "XbGs_qK2PQA", title: "Eminem - Rap God", channelTitle: "Eminem" },
      { id: "lp-EO5I60KA", title: "Ed Sheeran - Thinking Out Loud", channelTitle: "Ed Sheeran" },
      { id: "Qc9c12q3mrc", title: "Jhayco, Feid - LUNA", channelTitle: "Jhayco" },
      { id: "TmKh7lAwnBI", title: "BAD BUNNY x JHAY CORTEZ - DÁKITI", channelTitle: "Bad Bunny" },
      { id: "DiItGE3eAyQ", title: "Jhayco - Dile", channelTitle: "Jhayco" },
      { id: "1W5BA0lDVLM", title: "Jhayco - Corazón", channelTitle: "Jhayco" },
      { id: "TapXs54Ah3E", title: "Jhayco, Sech - 911", channelTitle: "Jhayco" },
      { id: "p7bfOZek9t4", title: "Jhayco - Sensual Bebé", channelTitle: "Jhayco" },
      { id: "3bRXWtLqV7M", title: "Jhayco - Costear", channelTitle: "Jhayco" },
      { id: "sSC2q1Q-7KM", title: "Jhayco - Deséame Suerte", channelTitle: "Jhayco" },
      { id: "OWpkaMHYNH8", title: "Jhayco - En Mi Cuarto", channelTitle: "Jhayco" },
      { id: "9jI-z9QN6g8", title: "Jhayco, Anuel AA - Ley Seca", channelTitle: "Jhayco" },
    ]

    // Función para normalizar texto (quitar acentos, convertir a minúsculas)
    function normalizeText(text) {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "")
    }

    // Normalizar el término de búsqueda
    const normalizedSearchTerm = normalizeText(searchTerm)

    // Buscar coincidencias en título y canal
    youtubeSearchResults = videosDatabase.filter((video) => {
      const normalizedTitle = normalizeText(video.title)
      const normalizedChannel = normalizeText(video.channelTitle)

      return normalizedTitle.includes(normalizedSearchTerm) || normalizedChannel.includes(normalizedSearchTerm)
    })

    youtubeCurrentResultIndex = 0

    if (youtubeSearchResults.length === 0) {
      return "<p class='terminal-error'>No se encontraron resultados para la búsqueda.</p>"
    }

    return mostrarResultadosYoutube()
  }

  // Función para mostrar los resultados de YouTube
  function mostrarResultadosYoutube() {
    if (youtubeSearchResults.length === 0) {
      return "<p class='terminal-error'>No hay resultados de búsqueda disponibles.</p>"
    }

    // Mostrar 3 resultados a la vez
    const startIndex = youtubeCurrentResultIndex
    const endIndex = Math.min(startIndex + 3, youtubeSearchResults.length)

    let output = "<div class='terminal-command-output'>"
    output += "<p>Resultados de YouTube:</p>"
    output += "<table class='terminal-table'>"
    output += "<tr><th>#</th><th>Título</th><th>Canal</th></tr>"

    for (let i = startIndex; i < endIndex; i++) {
      const video = youtubeSearchResults[i]
      output += `<tr><td>${i + 1}</td><td>${video.title}</td><td>${video.channelTitle}</td></tr>`
    }

    output += "</table>"
    output += `<p>Mostrando resultados ${startIndex + 1}-${endIndex} de ${youtubeSearchResults.length}</p>`
    output += "<p>Para reproducir un video, escribe: <span class='terminal-cmd'>youtube play [número]</span></p>"

    if (youtubeSearchResults.length > 3) {
      output +=
        "<p>Navega con: <span class='terminal-cmd'>youtube next</span> o <span class='terminal-cmd'>youtube prev</span></p>"
    }

    output += "</div>"
    return output
  }

  // Función para mostrar el siguiente conjunto de resultados
  function mostrarSiguienteResultado() {
    if (youtubeSearchResults.length === 0) {
      return "<p class='terminal-error'>No hay resultados de búsqueda disponibles.</p>"
    }

    if (youtubeCurrentResultIndex + 3 < youtubeSearchResults.length) {
      youtubeCurrentResultIndex += 3
    } else {
      youtubeCurrentResultIndex = 0 // Volver al principio
    }

    return mostrarResultadosYoutube()
  }

  // Función para mostrar el conjunto anterior de resultados
  function mostrarResultadoAnterior() {
    if (youtubeSearchResults.length === 0) {
      return "<p class='terminal-error'>No hay resultados de búsqueda disponibles.</p>"
    }

    if (youtubeCurrentResultIndex - 3 >= 0) {
      youtubeCurrentResultIndex -= 3
    } else {
      // Ir al último conjunto de resultados
      youtubeCurrentResultIndex = Math.floor((youtubeSearchResults.length - 1) / 3) * 3
    }

    return mostrarResultadosYoutube()
  }

  // Función para reproducir un video de YouTube
  function reproducirVideoYoutube(index) {
    if (youtubeSearchResults.length === 0) {
      return "<p class='terminal-error'>No hay resultados de búsqueda disponibles.</p>"
    }

    if (index < 0 || index >= youtubeSearchResults.length) {
      return `<p class='terminal-error'>Error: El índice ${index + 1} está fuera de rango. Hay ${youtubeSearchResults.length} resultados disponibles.</p>`
    }

    const video = youtubeSearchResults[index]

    // Llamar a la función que carga y reproduce el video
    cargarVideoYouTube(video.id, video.title, video.channelTitle)

    return `<p class='terminal-success'>Reproduciendo: ${video.title} - ${video.channelTitle}</p>`
  }

  // Datos para autocompletado
  const autocompletableData = {
    commands: Object.keys(commands),
    directories: ["inicio", "proyectos", "blog", "habilidades", "sobre-mi", "contacto", "~"],
    files: ["curriculum.pdf", "portfolio.zip"],
    categories: ["frontend", "backend", "security", "devops"],
    projectIds: ["1", "2", "3"],
    youtubeCommands: ["buscar", "play", "next", "prev", "clear"],
  }

  // Función para procesar comandos
  function processCommand(command) {
    const args = command.trim().split(" ")
    const cmd = args.shift().toLowerCase()

    if (cmd === "") {
      return ""
    }

    if (commands[cmd]) {
      return commands[cmd].execute(args)
    } else if (cmd === "help" && args.length > 0) {
      const helpCmd = args[0].toLowerCase()
      if (commands[helpCmd]) {
        return `
          <div class='terminal-command-output'>
            <p><strong>${helpCmd}</strong> - ${commands[helpCmd].description}</p>
            <p>Uso: <span class='terminal-cmd'>${commands[helpCmd].usage}</span></p>
          </div>
        `
      }
    }

    return `<div class='terminal-command-output'><p class='terminal-error'>Error: Comando '${cmd}' no reconocido. Escribe 'help' para ver los comandos disponibles.</p></div>`
  }

  // Función para añadir un comando al historial
  function addCommandToOutput(command) {
    const commandElement = document.createElement("div")
    commandElement.className = "terminal-command"

    const inputLine = document.createElement("div")
    inputLine.className = "terminal-command-input"
    inputLine.innerHTML = `<span class="terminal-prompt">visitor@portfolio:<span class="terminal-path">~</span>$</span> ${command}`

    commandElement.appendChild(inputLine)

    // Procesar el comando y obtener la salida
    const output = processCommand(command)
    if (output) {
      commandElement.innerHTML += output
    }

    terminalOutput.appendChild(commandElement)

    // Desplazarse al final
    terminalOutput.scrollTop = terminalOutput.scrollHeight
  }

  // Función para autocompletar comandos y argumentos
  function autocomplete(input) {
    const inputParts = input.split(" ")
    const lastPart = inputParts[inputParts.length - 1]

    // Si es el primer argumento, autocompletar comandos
    if (inputParts.length === 1) {
      const matches = autocompletableData.commands.filter((cmd) => cmd.startsWith(lastPart))
      return { matches, type: "command", prefix: "" }
    }
    // Si hay más de un argumento, autocompletar según el contexto
    else {
      const command = inputParts[0].toLowerCase()
      const prefix = inputParts.slice(0, -1).join(" ") + " "

      // Autocompletado específico según el comando
      switch (command) {
        case "cd":
          const dirMatches = autocompletableData.directories.filter((dir) => dir.startsWith(lastPart))
          return { matches: dirMatches, type: "directory", prefix }
        case "download":
          const fileMatches = autocompletableData.files.filter((file) => file.startsWith(lastPart))
          return { matches: fileMatches, type: "file", prefix }
        case "skills":
          const catMatches = autocompletableData.categories.filter((cat) => cat.startsWith(lastPart))
          return { matches: catMatches, type: "category", prefix }
        case "projects":
          const idMatches = autocompletableData.projectIds.filter((id) => id.startsWith(lastPart))
          return { matches: idMatches, type: "project_id", prefix }
        case "youtube":
          if (inputParts.length === 2) {
            const ytMatches = autocompletableData.youtubeCommands.filter((cmd) => cmd.startsWith(lastPart))
            return { matches: ytMatches, type: "youtube_command", prefix }
          }
          return { matches: [], type: "unknown", prefix }
        default:
          return { matches: [], type: "unknown", prefix }
      }
    }
  }

  // Función para mostrar sugerencias de autocompletado
  function showAutocompleteSuggestions(suggestions, type) {
    if (suggestions.length === 0) return

    let output = "<div class='terminal-command-output'><p>Posibles completados:</p>"

    // Agrupar sugerencias en columnas para mejor visualización
    const columns = 3
    const rows = Math.ceil(suggestions.length / columns)

    output += "<div class='terminal-autocomplete'>"

    for (let i = 0; i < rows; i++) {
      output += "<div class='terminal-autocomplete-row'>"
      for (let j = 0; j < columns; j++) {
        const index = i + j * rows
        if (index < suggestions.length) {
          output += `<span class='terminal-autocomplete-item'>${suggestions[index]}</span>`
        }
      }
      output += "</div>"
    }

    output += "</div></div>"

    const commandElement = document.createElement("div")
    commandElement.className = "terminal-command"
    commandElement.innerHTML = output

    terminalOutput.appendChild(commandElement)
    terminalOutput.scrollTop = terminalOutput.scrollHeight
  }

  // Evento para el input del terminal
  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      // Agregar atajo Ctrl + L para limpiar la terminal
      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault() // Prevenir el comportamiento predeterminado (seleccionar la barra de direcciones)

        // Limpiar la terminal (misma funcionalidad que el comando clear)
        terminalOutput.innerHTML = ""

        // Opcional: Mostrar un mensaje sutil indicando que se limpió la terminal
        const clearMessage = document.createElement("div")
        clearMessage.className = "terminal-clear-message"
        clearMessage.innerHTML = "<span class='terminal-subtle'>Terminal limpiada (Ctrl+L)</span>"
        terminalOutput.appendChild(clearMessage)

        // Hacer que el mensaje desaparezca después de 1.5 segundos
        setTimeout(() => {
          if (clearMessage.parentNode === terminalOutput) {
            terminalOutput.removeChild(clearMessage)
          }
        }, 1500)

        return
      }

      if (e.key === "Enter") {
        const command = terminalInput.value

        // Añadir al historial
        if (command.trim() !== "") {
          commandHistory.push(command)
          historyIndex = commandHistory.length
        }

        // Procesar el comando
        addCommandToOutput(command)

        // Limpiar el input
        terminalInput.value = ""
      } else if (e.key === "ArrowUp") {
        // Navegar hacia atrás en el historial
        if (historyIndex > 0) {
          historyIndex--
          terminalInput.value = commandHistory[historyIndex]

          // Mover el cursor al final
          setTimeout(() => {
            terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length
          }, 0)
        }

        e.preventDefault()
      } else if (e.key === "ArrowDown") {
        // Navegar hacia adelante en el historial
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++
          terminalInput.value = commandHistory[historyIndex]
        } else if (historyIndex === commandHistory.length - 1) {
          historyIndex++
          terminalInput.value = ""
        }

        e.preventDefault()
      } else if (e.key === "Tab") {
        // Autocompletar comandos y argumentos
        e.preventDefault()

        const input = terminalInput.value.trim()
        if (input === "") return

        // Obtener sugerencias de autocompletado
        const { matches, type, prefix } = autocomplete(input)

        if (matches.length === 1) {
          // Si hay una única coincidencia, autocompletar directamente
          terminalInput.value = prefix + matches[0] + " "
        } else if (matches.length > 1) {
          // Si hay múltiples coincidencias, mostrarlas y autocompletar la parte común
          showAutocompleteSuggestions(matches, type)

          // Encontrar el prefijo común más largo
          let commonPrefix = matches[0]
          for (let i = 1; i < matches.length; i++) {
            let j = 0
            while (
              j < commonPrefix.length &&
              j < matches[i].length &&
              commonPrefix[j].toLowerCase() === matches[i][j].toLowerCase()
            ) {
              j++
            }
            commonPrefix = commonPrefix.substring(0, j)
          }

          // Autocompletar hasta el prefijo común
          if (commonPrefix.length > 0 && commonPrefix.length > (input.split(" ").pop() || "").length) {
            terminalInput.value = prefix + commonPrefix
          }
        }
      }
    })
  }

  // Agregar un event listener global para capturar Ctrl+L incluso cuando el input no tiene el foco
  document.addEventListener("keydown", (e) => {
    // Verificar si el terminal está visible
    if (terminalContainer && !terminalContainer.classList.contains("hidden")) {
      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault()

        // Limpiar la terminal
        terminalOutput.innerHTML = ""

        // Mensaje sutil
        const clearMessage = document.createElement("div")
        clearMessage.className = "terminal-clear-message"
        clearMessage.innerHTML = "<span class='terminal-subtle'>Terminal limpiada (Ctrl+L)</span>"
        terminalOutput.appendChild(clearMessage)

        setTimeout(() => {
          if (clearMessage.parentNode === terminalOutput) {
            terminalOutput.removeChild(clearMessage)
          }
        }, 1500)

        // Enfocar el input
        if (terminalInput) {
          terminalInput.focus()
        }
      }
    }
  })

  // Agregar un event listener global para capturar Ctrl+R para reiniciar la terminal
  document.addEventListener("keydown", (e) => {
    // Verificar si el terminal está visible
    if (terminalContainer && !terminalContainer.classList.contains("hidden")) {
      if (e.key === "r" && e.ctrlKey) {
        e.preventDefault() // Prevenir que el navegador recargue la página

        // Reiniciar la terminal a su estado original
        resetTerminal()
      }
    }
  })

  // Función para reiniciar la terminal a su estado original
  function resetTerminal() {
    // Limpiar la salida visible
    terminalOutput.innerHTML = ""

    // Restablecer el historial de comandos
    commandHistory.length = 0
    historyIndex = -1

    // Limpiar el input actual
    if (terminalInput) {
      terminalInput.value = ""
    }

    // Restablecer el directorio actual a "~"
    const terminalPath = document.querySelector(".terminal-path")
    if (terminalPath) {
      terminalPath.textContent = "~"
    }

    // Mostrar mensaje de bienvenida
    const welcomeMessage = document.createElement("div")
    welcomeMessage.className = "terminal-welcome"
    welcomeMessage.innerHTML = `
      <div class="ascii-art">
██████╗  ██████╗ ███╗   ██╗███████╗ ██████╗ ██╗     ███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝██╔═══██╗██║     ██╔════╝
██║     ██║   ██║██╔██╗ ██║███████╗██║   ██║██║     █████╗  
██║     ██║   ██║██║╚██╗██║╚════██║██║   ██║██║     ██╔══╝  
╚██████╗╚██████╔╝██║ ╚████║███████╗╚██████╔╝███████╗███████╗
╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝                      
      </div>
      <div class="terminal-text">
        <p>¡Bienvenido a mi terminal interactiva!</p>
        <p>Escribe <span class="terminal-cmd">help</span> para ver los comandos disponibles.</p>
        <p>Atajos de teclado: <span class="terminal-cmd">Ctrl+L</span> para limpiar, <span class="terminal-cmd">Ctrl+R</span> para reiniciar, <span class="terminal-cmd">Tab</span> para autocompletar.</p>
      </div>
    `

    terminalOutput.appendChild(welcomeMessage)

    // Mostrar mensaje de reinicio
    const resetMessage = document.createElement("div")
    resetMessage.className = "terminal-reset-message"
    resetMessage.innerHTML = "<span class='terminal-subtle'>Terminal reiniciada (Ctrl+R)</span>"
    terminalOutput.appendChild(resetMessage)

    // Hacer que el mensaje desaparezca después de 1.5 segundos
    setTimeout(() => {
      if (resetMessage.parentNode === terminalOutput) {
        terminalOutput.removeChild(resetMessage)
      }
    }, 1500)

    // Enfocar el input
    if (terminalInput) {
      terminalInput.focus()
    }
  }

  // Modificar la inicialización del terminal para mostrar el mensaje de bienvenida al cargar
  if (terminalInput) {
    // Enfocar el input al cargar la página
    terminalInput.focus()

    // Agregar estilos para los mensajes
    const style = document.createElement("style")
    style.textContent = `
      .terminal-clear-message,
      .terminal-reset-message {
        padding: 5px 0;
        text-align: center;
      }
      .terminal-subtle {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85em;
        font-style: italic;
      }
      .terminal-welcome {
        margin-bottom: 15px;
      }
      .terminal-welcome .ascii-art {
        font-family: monospace;
        white-space: pre;
        font-size: 10px;
        line-height: 1.2;
        color: var(--primary-color);
        margin-bottom: 10px;
      }
      .terminal-welcome .terminal-text {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.5;
      }
      .terminal-welcome .terminal-cmd {
        color: var(--primary-color);
        font-weight: bold;
      }
      .terminal-success {
        color: #4CAF50;
      }
      .terminal-error {
        color: #F44336;
      }
    `
    document.head.appendChild(style)

    // Mostrar mensaje de bienvenida inicial
    resetTerminal()
  }

  // Eventos para los botones del terminal
  if (btnMinimizarTerminal) {
    btnMinimizarTerminal.addEventListener("click", () => {
      terminalContainer.classList.add("hidden")
      terminalMinimized.style.display = "flex"
    })
  }

  if (btnMaximizarTerminal) {
    btnMaximizarTerminal.addEventListener("click", () => {
      terminalContainer.classList.toggle("maximized")
    })
  }

  if (btnCerrarTerminal) {
    btnCerrarTerminal.addEventListener("click", () => {
      terminalContainer.classList.add("hidden")
      terminalMinimized.style.display = "flex"
    })
  }

  // Evento para el terminal minimizado
  if (terminalMinimized) {
    terminalMinimized.addEventListener("click", () => {
      terminalContainer.classList.remove("hidden")
      terminalMinimized.style.display = "none"

      // Enfocar el input
      if (terminalInput) {
        terminalInput.focus()
      }
    })
  }

  // Enfocar el input del terminal al hacer clic en el cuerpo del terminal
  if (terminalContainer) {
    terminalContainer.addEventListener("click", (e) => {
      // Solo enfocar si el clic no fue en un enlace o botón
      if (!e.target.closest("a") && !e.target.closest("button") && terminalInput) {
        terminalInput.focus()
      }
    })
  }

  // Inicializar el terminal con un mensaje de bienvenida
  if (terminalInput) {
    // Enfocar el input al cargar la página
    terminalInput.focus()

    // Agregar estilos para el mensaje de limpieza
    const style = document.createElement("style")
    style.textContent = `
      .terminal-clear-message {
        padding: 5px 0;
        text-align: center;
      }
      .terminal-subtle {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85em;
        font-style: italic;
      }
    `
    document.head.appendChild(style)
  }

  // Función para generar y descargar un PDF
  function generarYDescargarPDF() {
    // URL del PDF (puedes reemplazar esto con tu propio archivo)
    const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"

    // Crear un elemento a para la descarga
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "curriculum.pdf"
    link.target = "_blank"

    // Añadir al DOM, hacer clic y luego eliminar
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Función para generar y descargar un ZIP
  function generarYDescargarZIP() {
    // URL del ZIP (puedes reemplazar esto con tu propio archivo)
    const zipUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip"

    // Crear un elemento a para la descarga
    const link = document.createElement("a")
    link.href = zipUrl
    link.download = "portfolio.zip"
    link.target = "_blank"

    // Añadir al DOM, hacer clic y luego eliminar
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
})

// Asegurar que la página comience en la parte superior
// Usar un evento de carga para garantizar que todos los recursos estén cargados
window.addEventListener("load", () => {
  // Forzar el scroll al inicio con un pequeño retraso adicional
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, 200)
})

