$(document).ready(function () {
    const $toggleBtn = $('#widgetToggleBtn');
    const $widgetPanel = $('#widgetPanel');
    const $closeBtn = $('#widgetCloseBtn');
    const $widgetContent = $('#widgetContent');
    const $widgetTitle = $('#widgetTitle');
    const $widgetIcon = $('#widgetIcon');

    // --- Widget Open/Close Logic ---
    $toggleBtn.on('click', function () {
        $widgetPanel.addClass('open');
        $toggleBtn.addClass('hidden');
    });

    $closeBtn.on('click', function () {
        $widgetPanel.removeClass('open');
        setTimeout(() => {
            $toggleBtn.removeClass('hidden');
        }, 300);
    });

    // --- Mode Switch Logic ---

    // Fake News Data
    const newsData = [
        { title: "Nueva actualización disponible", excerpt: "Hemos mejorado el rendimiento de la aplicación en un 20%." },
        { title: "Mantenimiento programado", excerpt: "El sistema estará inactivo durante 2 horas el próximo domingo." },
        { title: "¡Nuevo diseño!", excerpt: "Descubre nuestra nueva interfaz, más limpia y rápida." }
    ];

    function loadNewsWidget() {
        // Update Header
        $widgetTitle.text('Super Noticia');
        $widgetIcon.attr('class', 'fa-solid fa-bolt');
        $toggleBtn.html('<i class="fa-solid fa-comment-dots"></i> Nuevo Memo');

        // Update Content
        $widgetContent.empty();
        newsData.forEach(news => {
            $widgetContent.append(`
                <div class="news-item">
                    <div class="news-title">${news.title}</div>
                    <p class="news-excerpt">${news.excerpt}</p>
                </div>
            `);
        });
    }

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

    function loadState() {
        const saved = localStorage.getItem('pouWidgetState');
        if (saved) {
            try {
                petState = { ...petState, ...JSON.parse(saved) };
                if (!petState.look) {
                    petState.look = { colorHue: 0, hat: null, glasses: null, shoes: null };
                }
            } catch (e) {}
        }
    }

    function saveState() {
        localStorage.setItem('pouWidgetState', JSON.stringify(petState));
    }

    function logAction(actionStr) {
        petState.log.push({ action: actionStr, time: new Date().toLocaleTimeString() });
        if (petState.log.length > 20) petState.log.shift();
        saveState();
    }
    
    // Load state on startup
    loadState();

    function loadGameWidget() {
        // Update Header
        $widgetTitle.text('Mi Pou');
        $widgetIcon.attr('class', 'fa-solid fa-gamepad');
        $toggleBtn.html('<i class="fa-solid fa-paw"></i> Jugar');

        // Update Content
        $widgetContent.html(`
            <div class="game-container">
                <div class="game-stats">
                    <div class="stat-item" title="Salud: ${petState.petHealth}%" data-name="Salud">
                        <i class="fa-solid fa-heart"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill health-fill" id="petHealth" style="width: ${petState.petHealth}%;" data-val="${petState.petHealth}"></div></div>
                    </div>
                    <div class="stat-item" title="Monedas: ${petState.petCoins}" data-name="Monedas">
                        <i class="fa-solid fa-coins"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill coins-fill" id="petCoins" style="width: ${Math.min(100, petState.petCoins)}%;" data-val="${petState.petCoins}"></div></div>
                    </div>
                    <div class="stat-item" title="Higiene: ${petState.petHygiene}%" data-name="Higiene">
                        <i class="fa-solid fa-poop"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill hygiene-fill" id="petHygiene" style="width: ${petState.petHygiene}%;" data-val="${petState.petHygiene}"></div></div>
                    </div>
                    <div class="stat-item" title="Productividad: ${petState.petProd}%" data-name="Productividad">
                        <i class="fa-solid fa-g"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill prod-fill" id="petProd" style="width: ${petState.petProd}%;" data-val="${petState.petProd}"></div></div>
                    </div>
                </div>
                
                <div class="game-pet-area" id="petArea">
                    <div class="pet-name-display" id="petNameDisplay" title="Haz clic para cambiar el nombre">${petState.name}</div>
                    <button class="pet-screenshot-btn" id="btnScreenshot" title="Descargar imagen del Pou"><i class="fa-solid fa-camera"></i></button>
                    <div class="pet-avatar-container" id="petAvatarContainer" style="position: relative; display: inline-block;">
                        <div class="pet-emoji" id="petAvatar" style="filter: hue-rotate(${petState.look.colorHue || 0}deg);">💩</div>
                        <div class="cosmetic-item cosmetic-hat" id="cosmeticHat">${petState.look.hat || ''}</div>
                        <div class="cosmetic-item cosmetic-glasses" id="cosmeticGlasses">${petState.look.glasses || ''}</div>
                        <div class="cosmetic-item cosmetic-shoes" id="cosmeticShoes">${petState.look.shoes ? `<div class="shoe-left">${petState.look.shoes}</div><div class="shoe-right" style="transform: scaleX(-1);">${petState.look.shoes}</div>` : ''}</div>
                    </div>
                </div>
                
                <div class="game-footer">
                    <div class="footer-col actions-col">
                        <button class="action-btn-small" id="btnShower" title="Duchar"><i class="fa-solid fa-shower"></i></button>
                        <button class="action-btn-small" id="btnFood" title="Comer"><i class="fa-solid fa-burger"></i></button>
                        <button class="action-btn-small" id="btnPlay" title="Jugar"><i class="fa-solid fa-baseball-bat-ball"></i></button>
                        <button class="action-btn-small" id="btnClean" title="Limpiar"><i class="fa-solid fa-broom"></i></button>
                    </div>
                    <div class="footer-col cart-col">
                        <button class="action-btn-large" id="btnShop" title="Tienda / Vestidor"><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                    <button class="footer-col family-col" id="btnFamily" title="Familia Pou">
                        <div class="mini-pou">💩</div>
                        <div class="mini-pou">💩</div>
                        <div class="mini-pou">💩</div>
                    </button>
                </div>
                
                <!-- In-widget modal for Shop/Wardrobe -->
                <div id="gameModal" class="game-modal d-none">
                    <div class="game-modal-content wardrobe-modal position-relative">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" id="btnCancelWardrobe" aria-label="Close"></button>
                        <h4 class="text-success fw-bold mb-3">Vestidor</h4>
                        
                        <div class="text-center mb-3">
                            <div class="pet-emoji d-inline-block" id="wardrobePreview" style="font-size: 3.5rem; filter: hue-rotate(${petState.look.colorHue || 0}deg);">💩</div>
                        </div>

                        <div class="wardrobe-section text-start">
                            <label class="fw-bold small mb-1">Color (Tono)</label>
                            <input type="range" class="form-range" id="colorSlider" min="0" max="360" value="${petState.look.colorHue || 0}">
                        </div>

                        <div class="wardrobe-section text-start mt-2">
                            <label class="fw-bold small mb-1">Gorro</label>
                            <div class="btn-group w-100" role="group">
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="hat" data-val="">X</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="hat" data-val="🎩">🎩</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="hat" data-val="🧢">🧢</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="hat" data-val="👑">👑</button>
                            </div>
                        </div>

                        <div class="wardrobe-section text-start mt-2">
                            <label class="fw-bold small mb-1">Gafas</label>
                            <div class="btn-group w-100" role="group">
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="glasses" data-val="">X</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="glasses" data-val="🕶️">🕶️</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="glasses" data-val="👓">👓</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="glasses" data-val="🥽">🥽</button>
                            </div>
                        </div>

                        <div class="wardrobe-section text-start mt-2">
                            <label class="fw-bold small mb-1">Zapatos</label>
                            <div class="btn-group w-100" role="group">
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="shoes" data-val="">X</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="shoes" data-val="👟">👟</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="shoes" data-val="🥾">🥾</button>
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-cosmetic" data-type="shoes" data-val="🩰">🩰</button>
                            </div>
                        </div>

                        <button class="btn btn-sm btn-success mt-3 w-100" id="btnCloseGameModal">Guardar y Cerrar</button>
                    </div>
                </div>
            </div>
        `);

        // Interaction animation helper
        function playInteraction(iconClass) {
            const $icon = $(`<i class="interaction-icon fa-solid ${iconClass}"></i>`);
            $('#petArea').append($icon);
            setTimeout(() => {
                $icon.remove();
            }, 1000);
        }

        // Stat helpers
        function updateStat(id, change) {
            const $el = $('#' + id);
            let current = petState[id];
            let newVal = Math.max(0, current + change); 
            if (id !== 'petCoins') newVal = Math.min(100, newVal);
            
            petState[id] = newVal;
            
            $el.attr('data-val', newVal);
            $el.css('width', Math.min(100, newVal) + '%');

            // Update tooltip text
            const $parent = $el.closest('.stat-item');
            const name = $parent.attr('data-name');
            $parent.attr('title', name + ': ' + newVal + (id === 'petCoins' ? '' : '%'));

            saveState();
            return newVal;
        }

        function getStat(id) {
            return petState[id];
        }

        $('#petNameDisplay').on('click', function() {
            const newName = prompt('Elige un nuevo nombre:', petState.name);
            if (newName && newName.trim() !== '') {
                petState.name = newName.trim();
                $(this).text(petState.name);
                logAction('Cambió de nombre a ' + petState.name);
                saveState();
            }
        });

        // Screenshot handler
        $('#btnScreenshot').on('click', function() {
            const container = document.getElementById('petAvatarContainer');
            // Clone and render off-screen with overflow visible
            const clone = container.cloneNode(true);
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position:fixed; left:-9999px; top:0; padding:50px 60px; overflow:visible; background:transparent;';
            clone.style.animation = 'none';
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);
            
            domtoimage.toPng(wrapper, { bgcolor: null, scale: 3 }).then(function(dataUrl) {
                document.body.removeChild(wrapper);
                const link = document.createElement('a');
                link.download = (petState.name || 'pou') + '_avatar.png';
                link.href = dataUrl;
                link.click();
            }).catch(function() {
                document.body.removeChild(wrapper);
            });
        });

        // Game basic interactivity
        $('#btnShower').on('click', () => {
            playInteraction('fa-shower');
            updateStat('petHealth', 5);
            updateStat('petHygiene', 20);
            logAction('Tomó una ducha');
        });

        $('#btnFood').on('click', () => {
            let coins = getStat('petCoins');
            if (coins >= 10) {
                updateStat('petCoins', -10);
                updateStat('petHealth', 20);
                updateStat('petHygiene', -10);
                playInteraction('fa-burger');
                logAction('Comió una hamburguesa');
            } else {
                playInteraction('fa-xmark');
            }
        });

        $('#btnPlay').on('click', () => {
            updateStat('petCoins', 5);
            updateStat('petProd', 10);
            updateStat('petHygiene', -5);
            updateStat('petHealth', -5);
            playInteraction('fa-baseball-bat-ball');
            logAction('Jugó a la pelota');
        });

        $('#btnClean').on('click', () => {
            playInteraction('fa-sparkles');
            updateStat('petHygiene', 30);
            updateStat('petProd', 5);
            logAction('Limpió su zona');
        });

        // Wardrobe Logic
        let draftLook = null;

        function highlightActiveCosmetics() {
            $('.btn-cosmetic').removeClass('active');
            $(`.btn-cosmetic[data-type="hat"][data-val="${draftLook.hat || ''}"]`).addClass('active');
            $(`.btn-cosmetic[data-type="glasses"][data-val="${draftLook.glasses || ''}"]`).addClass('active');
            $(`.btn-cosmetic[data-type="shoes"][data-val="${draftLook.shoes || ''}"]`).addClass('active');
        }

        $('#colorSlider').on('input', function() {
            const hue = $(this).val();
            draftLook.colorHue = hue;
            $('#wardrobePreview').css('filter', `hue-rotate(${hue}deg)`);
        });

        $('.btn-cosmetic').on('click', function() {
            const type = $(this).data('type');
            const val = $(this).data('val');
            draftLook[type] = val;
            highlightActiveCosmetics();
        });

        $('#btnShop').on('click', () => {
            draftLook = { ...petState.look };
            $('#colorSlider').val(draftLook.colorHue || 0);
            $('#wardrobePreview').css('filter', `hue-rotate(${draftLook.colorHue || 0}deg)`);
            highlightActiveCosmetics();
            $('#gameModal').removeClass('d-none');
            logAction('Abrió el vestidor');
        });

        $('#btnCancelWardrobe').on('click', () => {
            $('#gameModal').addClass('d-none');
        });

        $('#btnCloseGameModal').on('click', () => {
            petState.look = { ...draftLook };
            saveState();
            
            // Apply to main pet
            $('#petAvatar').css('filter', `hue-rotate(${petState.look.colorHue}deg)`);
            $('#cosmeticHat').text(petState.look.hat || '');
            $('#cosmeticGlasses').text(petState.look.glasses || '');
            
            if (petState.look.shoes) {
                $('#cosmeticShoes').html(`<div class="shoe-left">${petState.look.shoes}</div><div class="shoe-right" style="transform: scaleX(-1);">${petState.look.shoes}</div>`);
            } else {
                $('#cosmeticShoes').empty();
            }
            
            $('#gameModal').addClass('d-none');
        });

        $('#btnFamily').on('click', () => {
            playInteraction('fa-heart');
            logAction('Saludó a la familia');
        });
    }

    // Bind switch buttons
    $('#btnModeNews').on('click', function () {
        loadNewsWidget();
        // Optional: Open the widget to show it
        $widgetPanel.addClass('open');
        $toggleBtn.addClass('hidden');
    });

    $('#btnModeGame').on('click', function () {
        loadGameWidget();
        // Optional: Open the widget to show it
        $widgetPanel.addClass('open');
        $toggleBtn.addClass('hidden');
    });

    // Initialize with Game mode by default
    loadGameWidget();

    // --- Export / Import ---
    $('#btnExport').on('click', function() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('pouWidgetState') || '{}');
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "pou_partida.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    $('#btnImport').on('click', function() {
        $('#fileImport').click();
    });

    $('#fileImport').on('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const contents = e.target.result;
                const parsed = JSON.parse(contents);
                if (parsed && typeof parsed.petHealth !== 'undefined') {
                    localStorage.setItem('pouWidgetState', JSON.stringify(parsed));
                    alert("Partida importada con éxito. La página se recargará.");
                    location.reload();
                } else {
                    alert("El archivo no parece ser una partida válida.");
                }
            } catch(err) {
                alert("Error al leer el archivo.");
            }
        };
        reader.readAsText(file);
    });
});
