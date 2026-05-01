$(document).ready(function () {
    const $toggleBtn = $('#widgetToggleBtn');
    const $widgetPanel = $('#widgetPanel');
    const $closeBtn = $('#widgetCloseBtn');
    const $widgetContent = $('#widgetContent');
    const $widgetTitle = $('#widgetTitle');
    const $widgetIcon = $('#widgetIcon');

    // --- Game State Management ---
    let petState = {
        name: 'Pou',
        petHealth: 100,
        petCoins: 50,
        petHygiene: 100,
        petProd: 100,
        log: [],
        look: {
            colorHue: 0,
            hat: null,
            glasses: null,
            shoes: null
        }
    };

    function saveState() {
        localStorage.setItem('pouWidgetState', JSON.stringify(petState));
    }

    function loadState() {
        const saved = localStorage.getItem('pouWidgetState');
        if (saved) {
            petState = { ...petState, ...JSON.parse(saved) };
        }
    }

    function logAction(actionStr) {
        petState.log.push({ action: actionStr, time: new Date().toLocaleTimeString() });
        if (petState.log.length > 20) petState.log.shift();
        saveState();
    }

    // --- Cosmetic Helpers ---
    function applyCosmeticStyles($el, config) {
        if (!config || config.id === 'none') {
            $el.empty().css({'filter': '', 'transform': ''});
            return;
        }

        if (config.image) {
            $el.html(`<img src="${config.image}" style="width: 100%; height: auto; display: block;">`);
        } else {
            $el.text(config.emoji || '');
        }

        $el.css({
            'filter': `hue-rotate(${config.hue || 0}deg)`,
            'transform': `translateX(-50%) translate(${config.x || 0}px, ${config.y || 0}px) scale(${config.scale || 1})`
        });
    }

    function renderPet(targetLook) {
        const look = targetLook || petState.look;
        const isPreview = !!targetLook;
        const suffix = isPreview ? 'Preview' : ''; // We could use this if we had separate IDs for preview items
        
        // For now, we apply to the main pet elements, but if we are in the wardrobe, 
        // we also want to see changes in the preview emoji.
        const $avatar = isPreview ? $('#wardrobePreview') : $('#petAvatar');
        $avatar.css('filter', `hue-rotate(${look.colorHue || 0}deg)`);

        // If it's a preview, we might want to apply cosmetics to the preview too.
        // But the current wardrobe modal only has one "wardrobePreview" emoji.
        // Let's make renderPet apply to BOTH if no targetLook is provided, 
        // or just to the preview elements if targetLook is provided.
        
        const applyTo = isPreview ? {
            avatar: $('#wardrobePreview'),
            hat: null, // The wardrobe preview doesn't have accessory slots currently
            glasses: null,
            shoes: null
        } : {
            avatar: $('#petAvatar'),
            hat: $('#cosmeticHat'),
            glasses: $('#cosmeticGlasses'),
            shoes: $('#cosmeticShoes')
        };

        if (!isPreview) {
            // Apply main body color
            $('#petAvatar').css('filter', `hue-rotate(${look.colorHue || 0}deg)`);
            
            // Apply cosmetics based on config
            const hatConfig = COSMETICS_CONFIG.hats.find(h => h.id === look.hat || h.emoji === look.hat) || COSMETICS_CONFIG.hats[0];
            applyCosmeticStyles($('#cosmeticHat'), hatConfig);

            const glassesConfig = COSMETICS_CONFIG.glasses.find(g => g.id === look.glasses || g.emoji === look.glasses) || COSMETICS_CONFIG.glasses[0];
            applyCosmeticStyles($('#cosmeticGlasses'), glassesConfig);

            const shoesConfig = COSMETICS_CONFIG.shoes.find(s => s.id === look.shoes || s.emoji === look.shoes) || COSMETICS_CONFIG.shoes[0];
            const $shoes = $('#cosmeticShoes');
            if (shoesConfig && shoesConfig.id !== 'none') {
                const content = shoesConfig.image ? 
                    `<img src="${shoesConfig.image}" style="width: 100%; height: auto; display: block;">` : 
                    shoesConfig.emoji;
                
                $shoes.html(`
                    <div class="shoe-left" style="filter: hue-rotate(${shoesConfig.hue || 0}deg); transform: translate(${shoesConfig.x || 0}px, ${shoesConfig.y || 0}px) scale(${shoesConfig.scale || 1})">${content}</div>
                    <div class="shoe-right" style="filter: hue-rotate(${shoesConfig.hue || 0}deg); transform: translate(${-shoesConfig.x || 0}px, ${shoesConfig.y || 0}px) scaleX(-1) scale(${shoesConfig.scale || 1})">${content}</div>
                `);
            } else {
                $shoes.empty();
            }
        } else {
            // Update the wardrobe preview emoji color
            $('#wardrobePreview').css('filter', `hue-rotate(${look.colorHue || 0}deg)`);
        }
    }

    function generateCosmeticButtons(type, currentVal) {
        let html = '';
        // Fix pluralization: if type is 'hat' -> 'hats', if 'glasses' or 'shoes' -> stay same
        const pluralKey = (type === 'hat') ? 'hats' : type;
        const items = COSMETICS_CONFIG[pluralKey];
        if (!items) return '';
        items.forEach(item => {
            // Check match by ID or Emoji for backward compatibility
            const isActive = (item.id === currentVal || item.emoji === currentVal) ? 'active' : '';
            
            let content = item.emoji || 'X';
            if (item.image) {
                content = `<img src="${item.image}" style="width: 24px; height: 24px; object-fit: contain;">`;
            }

            html += `<button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic ${isActive}" 
                        data-type="${type}" data-val="${item.id}">${content}</button>`;
        });
        return html;
    }

    // --- UI Update Logic ---
    function loadNewsWidget() {
        $widgetTitle.text('Super Noticia');
        $widgetIcon.attr('class', 'fa-solid fa-bolt');
        $toggleBtn.html('<i class="fa-solid fa-comment-dots"></i> Nuevo Memo');
        $widgetContent.empty();
        [
            { title: "Nueva actualización disponible", excerpt: "Hemos mejorado el rendimiento de la aplicación en un 20%." },
            { title: "Mantenimiento programado", excerpt: "El sistema estará inactivo durante 2 horas el próximo domingo." },
            { title: "¡Nuevo diseño!", excerpt: "Descubre nuestra nueva interfaz, más limpia y rápida." }
        ].forEach(news => {
            $widgetContent.append(`
                <div class="news-item">
                    <div class="news-title">${news.title}</div>
                    <p class="news-excerpt">${news.excerpt}</p>
                </div>
            `);
        });
    }

    function loadGameWidget() {
        $widgetTitle.text('Mi Pou');
        $widgetIcon.attr('class', 'fa-solid fa-gamepad');
        $toggleBtn.html('<i class="fa-solid fa-paw"></i> Jugar');
        $widgetContent.html(`
            <div class="game-container">
                <div class="game-stats">
                    <div class="stat-item" title="Salud: ${petState.petHealth}%" data-name="Salud">
                        <i class="fa-solid fa-heart"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill health-fill" id="petHealth" style="width: ${petState.petHealth}%;"></div></div>
                    </div>
                    <div class="stat-item" title="Monedas: ${petState.petCoins}" data-name="Monedas">
                        <i class="fa-solid fa-coins"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill coins-fill" id="petCoins" style="width: ${Math.min(100, petState.petCoins)}%;"></div></div>
                    </div>
                    <div class="stat-item" title="Higiene: ${petState.petHygiene}%" data-name="Higiene">
                        <i class="fa-solid fa-poop"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill hygiene-fill" id="petHygiene" style="width: ${petState.petHygiene}%;"></div></div>
                    </div>
                    <div class="stat-item" title="Productividad: ${petState.petProd}%" data-name="Productividad">
                        <i class="fa-solid fa-g"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill prod-fill" id="petProd" style="width: ${petState.petProd}%;"></div></div>
                    </div>
                </div>
                <div class="game-pet-area" id="petArea">
                    <div class="pet-name-display" id="petNameDisplay">${petState.name}</div>
                    <button class="pet-screenshot-btn" id="btnScreenshot"><i class="fa-solid fa-camera"></i></button>
                    <div class="pet-avatar-container" id="petAvatarContainer">
                        <div class="pet-emoji" id="petAvatar">💩</div>
                        <div class="cosmetic-item cosmetic-hat" id="cosmeticHat"></div>
                        <div class="cosmetic-item cosmetic-glasses" id="cosmeticGlasses"></div>
                        <div class="cosmetic-item cosmetic-shoes" id="cosmeticShoes"></div>
                    </div>
                </div>
                <div class="game-footer">
                    <div class="footer-col actions-col">
                        <button class="action-btn-small" id="btnShower"><i class="fa-solid fa-shower"></i></button>
                        <button class="action-btn-small" id="btnFood"><i class="fa-solid fa-burger"></i></button>
                        <button class="action-btn-small" id="btnPlay"><i class="fa-solid fa-baseball-bat-ball"></i></button>
                        <button class="action-btn-small" id="btnClean"><i class="fa-solid fa-broom"></i></button>
                    </div>
                    <div class="footer-col cart-col">
                        <button class="action-btn-large" id="btnShop"><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                    <button class="footer-col family-col" id="btnFamily">
                        <div class="mini-pou">💩</div>
                        <div class="mini-pou">💩</div>
                        <div class="mini-pou">💩</div>
                    </button>
                </div>
                <div id="gameModal" class="game-modal d-none">
                    <div class="game-modal-content wardrobe-modal position-relative">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" id="btnCancelWardrobe"></button>
                        <h4 class="text-success fw-bold mb-3">Vestidor</h4>
                        <div class="text-center mb-3">
                            <div class="pet-emoji d-inline-block" id="wardrobePreview">💩</div>
                        </div>
                        <div class="wardrobe-section text-start">
                            <label class="fw-bold small mb-1">Color (Tono)</label>
                            <input type="range" class="form-range" id="colorSlider" min="0" max="360" value="${petState.look.colorHue || 0}">
                        </div>
                        <div class="wardrobe-section text-start mt-2">
                            <label class="fw-bold small mb-1">Gorro</label>
                            <div class="d-flex flex-wrap gap-1" role="group">
                                ${generateCosmeticButtons('hat', petState.look.hat)}
                            </div>
                        </div>
                        <div class="wardrobe-section text-start mt-2">
                            <label class="fw-bold small mb-1">Gafas</label>
                            <div class="d-flex flex-wrap gap-1" role="group">
                                ${generateCosmeticButtons('glasses', petState.look.glasses)}
                            </div>
                        </div>
                        <div class="wardrobe-section text-start mt-2">
                            <label class="fw-bold small mb-1">Zapatos</label>
                            <div class="d-flex flex-wrap gap-1" role="group">
                                ${generateCosmeticButtons('shoes', petState.look.shoes)}
                            </div>
                        </div>
                        <button class="btn btn-sm btn-success mt-3 w-100" id="btnCloseGameModal">Guardar y Cerrar</button>
                    </div>
                </div>
            </div>
        `);
        renderPet();
    }

    // --- Interaction Logic ---
    function playInteraction(iconClass) {
        const $icon = $(`<i class="interaction-icon fa-solid ${iconClass}"></i>`);
        $('#petArea').append($icon);
        setTimeout(() => { $icon.remove(); }, 1000);
    }

    function updateStat(id, change) {
        const $el = $('#' + id);
        let newVal = Math.max(0, petState[id] + change);
        if (id !== 'petCoins') newVal = Math.min(100, newVal);
        petState[id] = newVal;
        $el.css('width', Math.min(100, newVal) + '%');
        $el.closest('.stat-item').attr('title', $el.closest('.stat-item').attr('data-name') + ': ' + newVal + (id === 'petCoins' ? '' : '%'));
        saveState();
        return newVal;
    }

    // --- Global Events (Delegated) ---
    $(document).on('click', '#btnScreenshot', function() {
        const area = document.getElementById('petArea');
        const container = document.getElementById('petAvatarContainer');
        container.style.animationPlayState = 'paused';
        domtoimage.toPng(area, {
            bgcolor: null,
            filter: function(node) {
                if (node.id === 'petNameDisplay' || node.id === 'btnScreenshot') return false;
                if (node.classList && node.classList.contains('interaction-icon')) return false;
                return true;
            }
        }).then(function(dataUrl) {
            container.style.animationPlayState = '';
            const link = document.createElement('a');
            link.download = (petState.name || 'pou') + '_avatar.png';
            link.href = dataUrl;
            link.click();
        }).catch(err => { console.warn(err); container.style.animationPlayState = ''; });
    });

    $(document).on('click', '#btnShower', () => { playInteraction('fa-shower'); updateStat('petHealth', 5); updateStat('petHygiene', 20); logAction('Ducha'); });
    $(document).on('click', '#btnFood', () => { if (petState.petCoins >= 10) { updateStat('petCoins', -10); updateStat('petHealth', 20); updateStat('petHygiene', -10); playInteraction('fa-burger'); logAction('Comió'); } });
    $(document).on('click', '#btnPlay', () => { updateStat('petCoins', 5); updateStat('petProd', 10); updateStat('petHygiene', -5); updateStat('petHealth', -5); playInteraction('fa-baseball-bat-ball'); logAction('Jugó'); });
    $(document).on('click', '#btnClean', () => { playInteraction('fa-sparkles'); updateStat('petHygiene', 30); updateStat('petProd', 5); logAction('Limpió'); });
    
    $(document).on('click', '#petNameDisplay', function() {
        const newName = prompt('Nombre:', petState.name);
        if (newName) { petState.name = newName.trim(); $(this).text(petState.name); saveState(); }
    });

    // Wardrobe
    let draftLook = null;
    $(document).on('click', '#btnShop', () => {
        draftLook = { ...petState.look };
        $('#colorSlider').val(draftLook.colorHue || 0);
        highlightActiveCosmetics();
        $('#gameModal').removeClass('d-none');
    });

    $(document).on('input', '#colorSlider', function() {
        draftLook.colorHue = $(this).val();
        renderPet(draftLook);
    });

    $(document).on('click', '.btn-cosmetic', function() {
        draftLook[$(this).data('type')] = $(this).data('val');
        highlightActiveCosmetics();
        // Temporarily apply to main pet for preview? 
        // Or should we add slots to the wardrobe preview?
        // Let's apply to main pet so the user sees the result immediately.
        renderPet(draftLook);
    });

    function highlightActiveCosmetics() {
        $('.btn-cosmetic').removeClass('active');
        $(`.btn-cosmetic[data-type="hat"][data-val="${draftLook.hat || 'none'}"]`).addClass('active');
        $(`.btn-cosmetic[data-type="glasses"][data-val="${draftLook.glasses || 'none'}"]`).addClass('active');
        $(`.btn-cosmetic[data-type="shoes"][data-val="${draftLook.shoes || 'none'}"]`).addClass('active');
    }

    $(document).on('click', '#btnCloseGameModal', () => {
        petState.look = { ...draftLook };
        saveState();
        renderPet();
        $('#gameModal').addClass('d-none');
    });

    $(document).on('click', '#btnCancelWardrobe', () => { $('#gameModal').addClass('d-none'); });
    $(document).on('click', '#btnFamily', () => { playInteraction('fa-heart'); });

    // Mode Buttons
    $toggleBtn.on('click', () => { $widgetPanel.addClass('open'); $toggleBtn.addClass('hidden'); });
    $closeBtn.on('click', () => { $widgetPanel.removeClass('open'); setTimeout(() => $toggleBtn.removeClass('hidden'), 300); });
    $('#btnModeNews').on('click', () => loadNewsWidget());
    $('#btnModeGame').on('click', () => loadGameWidget());

    // Export/Import
    $('#btnExport').on('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('pouWidgetState') || '{}');
        const dl = document.createElement('a'); dl.href = dataStr; dl.download = "pou.json"; dl.click();
    });
    $('#btnImport').on('click', () => $('#fileImport').click());
    $('#fileImport').on('change', (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader(); reader.onload = (re) => {
            try { localStorage.setItem('pouWidgetState', re.target.result); location.reload(); } catch(err) { alert("Error"); }
        }; reader.readAsText(file);
    });

    // Start
    loadState();
    loadGameWidget();
});
