// DATABASE SIMULADO
const dataContent = {
    cards: [
        { icon: "🌱", title: "Carbono Zero", text: "Implementação de práticas para neutralizar emissões de CO2." },
        { icon: "💧", title: "Gestão Hídrica", text: "Sistemas inteligentes de irrigação com economia de 40% de água." },
        { icon: "🐝", title: "Biodiversidade", text: "Criação de corredores ecológicos entre as áreas produtivas." }
    ],
    techs: [
        { q: "Monitoramento por Satélite", a: "Analise de solo e saúde das plantas via imagens multiespectrais de alta resolução." },
        { q: "Bioinsumos", a: "Uso de defensivos biológicos para reduzir a dependência de químicos sintéticos." }
    ]
};

// RENDERIZADOR
const initPage = () => {
    const grid = document.getElementById('cards-grid');
    const acc = document.getElementById('accordion-group');

    // Injeção de Cards
    grid.innerHTML = dataContent.cards.map(c => `
        <article class="custom-card" tabindex="0">
            <span style="font-size: 2rem">${c.icon}</span>
            <h3>${c.title}</h3>
            <p>${c.text}</p>
        </article>
    `).join('');

    // Injeção de Acordeão
    acc.innerHTML = dataContent.techs.map((t, i) => `
        <div class="accordion-item">
            <button class="acc-trigger" aria-expanded="false" onclick="handleAccordion(this)">
                ${t.q} <span>+</span>
            </button>
            <div class="acc-content" style="display:none; padding: 1rem; background: var(--bg-main)">
                <p>${t.a}</p>
            </div>
        </div>
    `).join('');

    setupObservers();
};

// LÓGICA DE ACESSIBILIDADE
function adjustFont(delta) {
    const root = document.documentElement;
    const style = window.getComputedStyle(root).getPropertyValue('font-size');
    const newSize = parseFloat(style) + (delta * 2);
    root.style.fontSize = `${newSize}px`;
}

function toggleTheme() {
    document.body.classList.toggle('high-contrast');
    const isDark = document.body.classList.contains('high-contrast');
    localStorage.setItem('agro-theme', isDark ? 'dark' : 'light');
}

// LÓGICA DO ACORDEÃO
function handleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    content.style.display = isExpanded ? 'none' : 'block';
    btn.querySelector('span').innerText = isExpanded ? '+' : '-';
}

// OBSERVER PARA SCROLL (Reveal)
function setupObservers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initPage);
