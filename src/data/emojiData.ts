export const popularEmojis = [
  '😀', '😂', '🥰', '😍', '🤔', '😎', '🤩', '😇',
  '😈', '👻', '🤡', '💀', '🤓', '🥳', '😱', '😭',
  '👨', '👩', '👦', '👧', '🧑', '👫', '👭', '👬',
  '👨‍👩‍👧', '👨‍👩‍👦', '🧔', '👱', '👴', '👵', '🧑‍🦰', '🧑‍🦱',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
  '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐',
  '🍕', '🍔', '🍟', '🌭', '🍿', '🍩', '🍪', '🎂',
  '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱',
  '🪀', '🏓', '🏸', '🥅', '⛳', '🎣', '🎽', '🎿',
  '💻', '📱', '📸', '📺', '📻', '⏰', '💡', '🔋',
  '🎁', '🎀', '💎', '💰', '📚', '✏️', '🖊️', '📎',
  '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗',
  '⭐', '🌟', '💫', '🔥', '✨', '🌈', '☀️', '🌤️',
  '❤️', '💕', '💖', '💗', '💓', '💞', '💟', '❣️',
];

export const categoryGradients: Record<string, string> = {
  person: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  food: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  animal: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  activity: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  object: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  emotion: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  fantasy: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
};

export type MixResult = {
  resultEmoji: string;
  caption: string;
  category: string;
};

export const mixTable: Record<string, MixResult[]> = {
  person: [
    { resultEmoji: '👨‍👩‍👧', caption: 'Теперь вы семья! 👨‍👩‍👧', category: 'person' },
    { resultEmoji: '👫', caption: 'Лучшие друзья навсегда! 👫', category: 'person' },
    { resultEmoji: '🧑‍🤝‍🧑', caption: 'Команда мечты! 🧑‍🤝‍🧑', category: 'person' },
    { resultEmoji: '👼', caption: 'Маленький ангел! 👼', category: 'person' },
    { resultEmoji: '🧙', caption: 'Волшебник появился! 🧙', category: 'person' },
    { resultEmoji: '👮', caption: 'Полицейский на страже! 👮', category: 'person' },
    { resultEmoji: '👨‍🚀', caption: 'Космонавт готов к полёту! 👨‍🚀', category: 'person' },
    { resultEmoji: '🤵', caption: 'Элегантный джентльмен! 🤵', category: 'person' },
  ],
  food: [
    { resultEmoji: '🍜', caption: 'Фастфуд-фьюжн! 🍜', category: 'food' },
    { resultEmoji: '🍣', caption: 'Японская кухня — объединяет! 🍣', category: 'food' },
    { resultEmoji: '🥗', caption: 'Здоровое питание — это ключ! 🥗', category: 'food' },
    { resultEmoji: '🍰', caption: 'Сладкий десерт для тебя! 🍰', category: 'food' },
    { resultEmoji: '🍦', caption: 'Мороженое — идеальный микс! 🍦', category: 'food' },
    { resultEmoji: '☕', caption: 'Утренний кофе — классика! ☕', category: 'food' },
    { resultEmoji: '🍺', caption: 'Отличный вечер! 🍺', category: 'food' },
    { resultEmoji: '🧁', caption: 'Капкейк — сладкая жизнь! 🧁', category: 'food' },
  ],
  animal: [
    { resultEmoji: '🦊', caption: 'Лиса — хитрый друг! 🦊', category: 'animal' },
    { resultEmoji: '🐼', caption: 'Панда — милашка! 🐼', category: 'animal' },
    { resultEmoji: '🦁', caption: 'Царь зверей! 🦁', category: 'animal' },
    { resultEmoji: '🦄', caption: 'Единорог — магия! 🦄', category: 'animal' },
    { resultEmoji: '🐉', caption: 'Дракон проснулся! 🐉', category: 'animal' },
    { resultEmoji: '🦋', caption: 'Бабочка — красота! 🦋', category: 'animal' },
    { resultEmoji: '🐙', caption: 'Осьминог — умнейший! 🐙', category: 'animal' },
    { resultEmoji: '🦀', caption: 'Краб — сила! 🦀', category: 'animal' },
  ],
  activity: [
    { resultEmoji: '🎮', caption: 'Геймер на связи! 🎮', category: 'activity' },
    { resultEmoji: '🏆', caption: 'Победа рядом! 🏆', category: 'activity' },
    { resultEmoji: '🎸', caption: 'Рок-звезда! 🎸', category: 'activity' },
    { resultEmoji: '🎨', caption: 'Творец шедевра! 🎨', category: 'activity' },
    { resultEmoji: '🎭', caption: 'Театральное искусство! 🎭', category: 'activity' },
    { resultEmoji: '🏖️', caption: 'Отпуск — это святое! 🏖️', category: 'activity' },
    { resultEmoji: '🎪', caption: 'Цирк — веселье! 🎪', category: 'activity' },
    { resultEmoji: '🎢', caption: 'Адреналин зашкаливает! 🎢', category: 'activity' },
  ],
  object: [
    { resultEmoji: '📸', caption: 'Момент пойман! 📸', category: 'object' },
    { resultEmoji: '💎', caption: 'Бриллиант — вечная ценность! 💎', category: 'object' },
    { resultEmoji: '🚀', caption: 'К звёздам! 🚀', category: 'object' },
    { resultEmoji: '🎁', caption: 'Сюрприз! 🎁', category: 'object' },
    { resultEmoji: '🔮', caption: 'Будущее видится ясным! 🔮', category: 'object' },
    { resultEmoji: '🎯', caption: 'В яблочко! 🎯', category: 'object' },
    { resultEmoji: '💡', caption: 'Отличная идея! 💡', category: 'object' },
    { resultEmoji: '⚡', caption: 'Энергия бьёт ключом! ⚡', category: 'object' },
  ],
  emotion: [
    { resultEmoji: '🥰', caption: 'Любовь и счастье! 🥰', category: 'emotion' },
    { resultEmoji: '🤗', caption: 'Обнимашки! 🤗', category: 'emotion' },
    { resultEmoji: '😘', caption: 'Целую! 😘', category: 'emotion' },
    { resultEmoji: '💖', caption: 'Сердце влюблено! 💖', category: 'emotion' },
    { resultEmoji: '✨', caption: 'Волшебство вокруг! ✨', category: 'emotion' },
    { resultEmoji: '🌟', caption: 'Сияешь ярче всех! 🌟', category: 'emotion' },
    { resultEmoji: '💫', caption: 'Звёздный час! 💫', category: 'emotion' },
    { resultEmoji: '🎉', caption: 'Праздник! 🎉', category: 'emotion' },
  ],
  fantasy: [
    { resultEmoji: '🧙‍♂️', caption: 'Маг появился! 🧙‍♂️', category: 'fantasy' },
    { resultEmoji: '🦸', caption: 'Супергерой в деле! 🦸', category: 'fantasy' },
    { resultEmoji: '🧚', caption: 'Фея прилетела! 🧚', category: 'fantasy' },
    { resultEmoji: '👽', caption: 'Пришелец с другой планеты! 👽', category: 'fantasy' },
    { resultEmoji: '🤖', caption: 'Робот нового поколения! 🤖', category: 'fantasy' },
    { resultEmoji: '🛸', caption: 'НЛО замечено! 🛸', category: 'fantasy' },
    { resultEmoji: '🔮', caption: 'Магический шар! 🔮', category: 'fantasy' },
    { resultEmoji: '⚔️', caption: 'Рыцарь готов к бою! ⚔️', category: 'fantasy' },
  ],
};