$(document).ready(function() {
    const $toggleBtn = $('#widgetToggleBtn');
    const $widgetPanel = $('#widgetPanel');
    const $closeBtn = $('#widgetCloseBtn');
    const $widgetContent = $('#widgetContent');
    const $widgetTitle = $('#widgetTitle');
    const $widgetIcon = $('#widgetIcon');

    // --- Widget Open/Close Logic ---
    $toggleBtn.on('click', function() {
        $widgetPanel.addClass('open');
        $toggleBtn.addClass('hidden');
    });

    $closeBtn.on('click', function() {
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

    function loadGameWidget() {
        // Update Header
        $widgetTitle.text('Mi Pou');
        $widgetIcon.attr('class', 'fa-solid fa-gamepad');
        $toggleBtn.html('<i class="fa-solid fa-paw"></i> Jugar');

        // Update Content
        $widgetContent.html(`
            <div class="game-container">
                <div class="game-stats">
                    <div class="stat-item" title="Salud">
                        <i class="fa-solid fa-heart"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill health-fill" id="petHealth" style="width: 100%;" data-val="100"></div></div>
                    </div>
                    <div class="stat-item" title="Monedas">
                        <i class="fa-solid fa-coins"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill coins-fill" id="petCoins" style="width: 50%;" data-val="50"></div></div>
                    </div>
                    <div class="stat-item" title="Higiene">
                        <i class="fa-solid fa-poop"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill hygiene-fill" id="petHygiene" style="width: 100%;" data-val="100"></div></div>
                    </div>
                    <div class="stat-item" title="Productividad">
                        <i class="fa-solid fa-g"></i>
                        <div class="stat-bar-bg"><div class="stat-bar-fill prod-fill" id="petProd" style="width: 100%;" data-val="100"></div></div>
                    </div>
                </div>
                
                <div class="game-pet-area" id="petArea">
                    <div class="pet-emoji" id="petAvatar">💩</div>
                </div>
                
                <div class="game-actions">
                    <button class="action-btn" id="btnShower" title="Duchar"><i class="fa-solid fa-shower"></i></button>
                    <button class="action-btn" id="btnFood" title="Comer"><i class="fa-solid fa-burger"></i></button>
                    <button class="action-btn" id="btnPlay" title="Jugar"><i class="fa-solid fa-baseball-bat-ball"></i></button>
                    <button class="action-btn" id="btnClean" title="Limpiar"><i class="fa-solid fa-broom"></i></button>
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
            let current = parseInt($el.attr('data-val'));
            let newVal = Math.max(0, Math.min(100, current + change));
            $el.attr('data-val', newVal);
            $el.css('width', newVal + '%');
            return newVal;
        }
        
        function getStat(id) {
            return parseInt($('#' + id).attr('data-val'));
        }

        // Game basic interactivity
        $('#btnShower').on('click', () => { 
            playInteraction('fa-shower');
            updateStat('petHealth', 5);
            updateStat('petHygiene', 20);
        });
        
        $('#btnFood').on('click', () => { 
            let coins = getStat('petCoins');
            if(coins >= 10) {
                updateStat('petCoins', -10);
                updateStat('petHealth', 20);
                updateStat('petHygiene', -10);
                playInteraction('fa-burger');
            } else {
                alert("No tienes suficientes monedas.");
            }
        });
        
        $('#btnPlay').on('click', () => { 
            updateStat('petCoins', 5);
            updateStat('petProd', 10);
            updateStat('petHygiene', -5);
            updateStat('petHealth', -5);
            playInteraction('fa-baseball-bat-ball');
        });
        
        $('#btnClean').on('click', () => { 
            playInteraction('fa-sparkles');
            updateStat('petHygiene', 30);
            updateStat('petProd', 5);
        });
    }

    // Bind switch buttons
    $('#btnModeNews').on('click', function() {
        loadNewsWidget();
        // Optional: Open the widget to show it
        $widgetPanel.addClass('open');
        $toggleBtn.addClass('hidden');
    });

    $('#btnModeGame').on('click', function() {
        loadGameWidget();
        // Optional: Open the widget to show it
        $widgetPanel.addClass('open');
        $toggleBtn.addClass('hidden');
    });

    // Initialize with News mode by default
    loadNewsWidget();
});
