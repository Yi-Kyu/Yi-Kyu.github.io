document.addEventListener("DOMContentLoaded", () => {
  console.log("Script de máquinas cargado correctamente");

  // ===== Base de datos de máquinas completadas =====
  // Las "categorias" deberían incluir al menos un valor que coincida con los
  // filtros del HTML (web, privesc, buffer, rce, sqli, osint) para que el
  // filtro por categoría funcione. Puedes añadir tags extra para mostrar.
  const maquinasDB = [
    {
      id: 1,
      nombre: "Cat",
      plataforma: "hackthebox",
      dificultad: "Medium",
      os: "Linux",
      ip: "10.10.10.3",
      fecha: "2023-01-15",
      categorias: ["web", "privesc"],
      enlace: "https://app.hackthebox.com/machines/Cat",
    },
    {
      id: 2,
      nombre: "Rabbit",
      plataforma: "hackthebox",
      dificultad: "Insane",
      os: "Windows",
      ip: "10.10.10.71",
      fecha: "2023-01-20",
      categorias: ["web", "sqli"],
      enlace: "https://app.hackthebox.com/machines/Rabbit",
    },
    {
      id: 3,
      nombre: "Blackfield",
      plataforma: "hackthebox",
      dificultad: "Hard",
      os: "Windows",
      ip: "10.10.10.4",
      fecha: "2023-01-25",
      categorias: ["privesc", "rce"],
      enlace: "https://app.hackthebox.com/machines/Blackfield",
    },
    {
      id: 4,
      nombre: "RootMe",
      plataforma: "tryhackme",
      dificultad: "Easy",
      os: "Linux",
      ip: "10.10.10.108",
      fecha: "2023-02-05",
      categorias: ["web", "privesc"],
      enlace: "https://tryhackme.com/room/rrootme",
    },
    {
      id: 5,
      nombre: "Vulnversity",
      plataforma: "tryhackme",
      dificultad: "Easy",
      os: "Linux",
      ip: "10.10.10.109",
      fecha: "2023-02-10",
      categorias: ["web", "privesc"],
      enlace: "https://tryhackme.com/room/vulnversity",
    },
    {
      id: 6,
      nombre: "Metasploitable 2",
      plataforma: "vulnhub",
      dificultad: "Easy",
      os: "Linux",
      ip: "192.168.1.100",
      fecha: "2023-02-15",
      categorias: ["rce", "privesc"],
      enlace: "https://www.vulnhub.com/entry/metasploitable-2,29/",
    },
    {
      id: 7,
      nombre: "Nibbles",
      plataforma: "hackthebox",
      dificultad: "Easy",
      os: "Linux",
      ip: "10.10.10.75",
      fecha: "2023-02-20",
      categorias: ["web", "privesc"],
      enlace: "https://app.hackthebox.com/machines/Nibbles",
    },
    {
      id: 8,
      nombre: "Beep",
      plataforma: "hackthebox",
      dificultad: "Easy",
      os: "Linux",
      ip: "10.10.10.7",
      fecha: "2023-02-25",
      categorias: ["web", "rce"],
      enlace: "https://app.hackthebox.com/machines/Beep",
    },
        {
      id: 8,
      nombre: "Dark Corp",
      plataforma: "hackthebox",
      dificultad: "Insane",
      os: "Windows",
      ip: "10.10.11.54",
      fecha: "2025-05-05",
      categorias: ["AD", "RoundCube"],
      enlace: "https://app.hackthebox.com/machines/Beep",
    },
  ];

  // ===== Configuración =====
  const MAQUINAS_POR_PAGINA = 8;
  let paginaActual = 1;
  let maquinasFiltradas = [...maquinasDB];

  // ===== Referencias al DOM =====
  const grid = document.getElementById("maquinas-grid");
  const contadorTotal = document.getElementById("contador-total");
  const filtroPlataforma = document.getElementById("filtro-plataforma");
  const filtroDificultad = document.getElementById("filtro-dificultad");
  const filtroCategoria = document.getElementById("filtro-categoria");
  const busquedaInput = document.getElementById("busqueda-maquina");
  const btnAnterior = document.getElementById("pagina-anterior");
  const btnSiguiente = document.getElementById("pagina-siguiente");
  const paginaActualSpan = document.getElementById("pagina-actual");

  if (!grid) {
    console.error("No se encontró el grid de máquinas (#maquinas-grid)");
    return;
  }

  // ===== Helpers =====
  function formatearFecha(fecha) {
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return fecha;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function nombrePlataforma(p) {
    const nombres = {
      hackthebox: "HackTheBox",
      tryhackme: "TryHackMe",
      vulnhub: "VulnHub",
      offsec: "OffSec PG",
    };
    return nombres[p] || p;
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  // ===== Render =====
  function crearTarjeta(m) {
    const categoriasHTML = m.categorias
      .map((cat) => `<span class="maquina-categoria">${escapeHTML(cat)}</span>`)
      .join("");

    const dificultadBarra = `
      <div class="maquina-dificultad">
        <span>${escapeHTML(m.dificultad)}</span>
        <div class="dificultad-barra dificultad-${escapeHTML(m.dificultad)}">
          <div class="dificultad-nivel"></div>
          <div class="dificultad-nivel"></div>
          <div class="dificultad-nivel"></div>
          <div class="dificultad-nivel"></div>
        </div>
      </div>
    `;

    return `
      <div class="maquina-card">
        <div class="maquina-header">
          <h3 class="maquina-nombre">${escapeHTML(m.nombre)}</h3>
          <span class="maquina-plataforma plataforma-${escapeHTML(m.plataforma)}">${escapeHTML(nombrePlataforma(m.plataforma))}</span>
        </div>
        <div class="maquina-body">
          <div class="maquina-info">
            <div class="maquina-info-item">
              <span class="maquina-info-label">OS:</span>
              <span class="maquina-info-valor">${escapeHTML(m.os)}</span>
            </div>
            <div class="maquina-info-item">
              <span class="maquina-info-label">IP:</span>
              <span class="maquina-info-valor">${escapeHTML(m.ip)}</span>
            </div>
            <div class="maquina-info-item">
              <span class="maquina-info-label">Difficulty:</span>
              ${dificultadBarra}
            </div>
          </div>
          <div class="maquina-categorias">${categoriasHTML}</div>
        </div>
        <div class="maquina-footer">
          <span class="maquina-fecha">${escapeHTML(formatearFecha(m.fecha))}</span>
          <a href="${escapeHTML(m.enlace)}" class="maquina-enlace" target="_blank" rel="noopener noreferrer">
            View <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    `;
  }

  function renderizar() {
    const totalPaginas = Math.max(
      1,
      Math.ceil(maquinasFiltradas.length / MAQUINAS_POR_PAGINA)
    );
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;
    if (paginaActual < 1) paginaActual = 1;

    const inicio = (paginaActual - 1) * MAQUINAS_POR_PAGINA;
    const fin = inicio + MAQUINAS_POR_PAGINA;
    const maquinasPagina = maquinasFiltradas.slice(inicio, fin);

    if (maquinasPagina.length === 0) {
      grid.innerHTML = `<div class="no-maquinas">No machines match the current filters.</div>`;
    } else {
      grid.innerHTML = maquinasPagina.map(crearTarjeta).join("");
    }

    if (contadorTotal) contadorTotal.textContent = maquinasFiltradas.length;
    if (paginaActualSpan) paginaActualSpan.textContent = `Page ${paginaActual} of ${totalPaginas}`;
    if (btnAnterior) btnAnterior.disabled = paginaActual <= 1;
    if (btnSiguiente) btnSiguiente.disabled = paginaActual >= totalPaginas;
  }

  // ===== Filtros =====
  function aplicarFiltros() {
    const plataforma = filtroPlataforma ? filtroPlataforma.value : "todas";
    const dificultad = filtroDificultad ? filtroDificultad.value : "todas";
    const categoria = filtroCategoria ? filtroCategoria.value : "todas";
    const busqueda = busquedaInput
      ? busquedaInput.value.trim().toLowerCase()
      : "";

    maquinasFiltradas = maquinasDB.filter((m) => {
      if (plataforma !== "todas" && m.plataforma !== plataforma) return false;
      if (dificultad !== "todas" && m.dificultad !== dificultad) return false;
      if (categoria !== "todas" && !m.categorias.includes(categoria)) return false;
      if (busqueda && !m.nombre.toLowerCase().includes(busqueda)) return false;
      return true;
    });

    paginaActual = 1;
    renderizar();
  }

  // ===== Listeners =====
  if (filtroPlataforma) filtroPlataforma.addEventListener("change", aplicarFiltros);
  if (filtroDificultad) filtroDificultad.addEventListener("change", aplicarFiltros);
  if (filtroCategoria) filtroCategoria.addEventListener("change", aplicarFiltros);
  if (busquedaInput) busquedaInput.addEventListener("input", aplicarFiltros);

  if (btnAnterior) {
    btnAnterior.addEventListener("click", () => {
      if (paginaActual > 1) {
        paginaActual--;
        renderizar();
      }
    });
  }

  if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
      const totalPaginas = Math.ceil(maquinasFiltradas.length / MAQUINAS_POR_PAGINA);
      if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizar();
      }
    });
  }

  // Render inicial
  renderizar();
});