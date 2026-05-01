/**
 * Configuración dinámica de cosméticos para el Pou
 * Permite ajustar posición, escala y color individualmente.
 */
const COSMETICS_CONFIG = {
    hats: [
        { id: 'none', emoji: '', name: 'Ninguno' },
        { id: 'top_hat', emoji: '🎩', hue: 0, x: 0, y: -5, scale: 1 },
        { id: 'cap', emoji: '🧢', hue: 0, x: 0, y: -5, scale: 1 },
        { id: 'crown', emoji: '👑', hue: 45, x: 0, y: -12, scale: 1.1 },
        { id: 'grad_cap', emoji: '🎓', hue: 0, x: 0, y: -8, scale: 1.1 },
        { id: 'cowboy', image: 'assets/cosmetics/cowboy_hat.png', hue: 0, x: 0, y: -5, scale: 1.2 }
    ],
    glasses: [
        { id: 'none', emoji: '', name: 'Ninguno' },
        { id: 'sunglasses', emoji: '🕶️', hue: 0, x: 0, y: 40, scale: 1.1 },
        { id: 'glasses', emoji: '👓', hue: 190, x: 0, y: 30, scale: 1.1 },
        { id: 'goggles', emoji: '🥽', hue: 0, x: 0, y: 30, scale: 1.3 },
    ],
    shoes: [
        { id: 'none', emoji: '', name: 'Ninguno' },
        { id: 'sneakers', emoji: '👟', hue: 0, x: 0, y: -15, scale: 1 },
        { id: 'boots', emoji: '🥾', hue: 0, x: 0, y: -15, scale: 1.1 },
        { id: 'heels', emoji: '👠', hue: 0, x: 0, y: -15, scale: 0.9 },
        { id: 'ballet', emoji: '🩰', hue: 330, x: 0, y: -15, scale: 1 },
        { id: 'skates', emoji: '⛸️', hue: 180, x: 0, y: 40, scale: 1 }
    ]
};
