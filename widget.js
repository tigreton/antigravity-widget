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
                    <div class="stat-item" title="Salud"><i class="fa-solid fa-heart"></i> <span id="petHealth">100</span>%</div>
                    <div class="stat-item" title="Higiene"><i class="fa-solid fa-poop"></i> <span id="petHygiene">100</span>%</div>
                    <div class="stat-item" title="Productividad"><i class="fa-solid fa-g"></i> <span id="petProd">100</span>%</div>
                    <div class="stat-item" title="Monedas"><i class="fa-solid fa-coins"></i> <span id="petCoins">50</span></div>
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

        // Game basic interactivity
        $('#btnShower').on('click', () => { 
            playInteraction('fa-shower');
            $('#petHealth').text(Math.min(100, parseInt($('#petHealth').text()) + 5));
            $('#petHygiene').text(Math.min(100, parseInt($('#petHygiene').text()) + 20));
        });
        
        $('#btnFood').on('click', () => { 
            let coins = parseInt($('#petCoins').text());
            if(coins >= 10) {
                $('#petCoins').text(coins - 10);
                $('#petHealth').text(Math.min(100, parseInt($('#petHealth').text()) + 20));
                $('#petHygiene').text(Math.max(0, parseInt($('#petHygiene').text()) - 10));
                playInteraction('fa-burger');
            } else {
                alert("No tienes suficientes monedas.");
            }
        });
        
        $('#btnPlay').on('click', () => { 
            let coins = parseInt($('#petCoins').text());
            $('#petCoins').text(coins + 5);
            $('#petProd').text(Math.min(100, parseInt($('#petProd').text()) + 10));
            $('#petHygiene').text(Math.max(0, parseInt($('#petHygiene').text()) - 5));
            $('#petHealth').text(Math.max(0, parseInt($('#petHealth').text()) - 5));
            playInteraction('fa-baseball-bat-ball');
        });
        
        $('#btnClean').on('click', () => { 
            playInteraction('fa-sparkles');
            $('#petHygiene').text(Math.min(100, parseInt($('#petHygiene').text()) + 30));
            $('#petProd').text(Math.min(100, parseInt($('#petProd').text()) + 5));
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
