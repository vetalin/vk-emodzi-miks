import { create } from 'zustand';

export interface MixResult {
  resultEmoji: string;
  caption: string;
  category: string;
}

interface EmojiMixStore {
  selectedEmojis: [string | null, string | null];
  currentResult: MixResult | null;
  isMixing: boolean;
  totalMixes: number;
  history: MixResult[];
  
  selectEmoji: (emoji: string) => void;
  clearSelection: () => void;
  mixEmojis: () => Promise<void>;
  incrementMixCount: () => void;
  reset: () => void;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Mix results embedded directly
const allMixResults: MixResult[] = [
  { resultEmoji: '👨‍👩‍👧', caption: 'Теперь вы семья! 👨‍👩‍👧', category: 'person' },
  { resultEmoji: '👫', caption: 'Лучшие друзья навсегда! 👫', category: 'person' },
  { resultEmoji: '🧑‍🤝‍🧑', caption: 'Команда мечты! 🧑‍🤝‍🧑', category: 'person' },
  { resultEmoji: '👼', caption: 'Маленький ангел! 👼', category: 'person' },
  { resultEmoji: '🧙', caption: 'Волшебник появился! 🧙', category: 'person' },
  { resultEmoji: '👮', caption: 'Полицейский на страже! 👮', category: 'person' },
  { resultEmoji: '👨‍🚀', caption: 'Космонавт готов к полёту! 👨‍🚀', category: 'person' },
  { resultEmoji: '🤵', caption: 'Элегантный джентльмен! 🤵', category: 'person' },
  { resultEmoji: '🍜', caption: 'Фастфуд-фьюжн! 🍜', category: 'food' },
  { resultEmoji: '🍣', caption: 'Японская кухня — объединяет! 🍣', category: 'food' },
  { resultEmoji: '🥗', caption: 'Здоровое питание — это ключ! 🥗', category: 'food' },
  { resultEmoji: '🍰', caption: 'Сладкий десерт для тебя! 🍰', category: 'food' },
  { resultEmoji: '🍦', caption: 'Мороженое — идеальный микс! 🍦', category: 'food' },
  { resultEmoji: '☕', caption: 'Утренний кофе — классика! ☕', category: 'food' },
  { resultEmoji: '🍺', caption: 'Отличный вечер! 🍺', category: 'food' },
  { resultEmoji: '🧁', caption: 'Капкейк — сладкая жизнь! 🧁', category: 'food' },
  { resultEmoji: '🦊', caption: 'Лиса — хитрый друг! 🦊', category: 'animal' },
  { resultEmoji: '🐼', caption: 'Панда — милашка! 🐼', category: 'animal' },
  { resultEmoji: '🦁', caption: 'Царь зверей! 🦁', category: 'animal' },
  { resultEmoji: '🦄', caption: 'Единорог — магия! 🦄', category: 'animal' },
  { resultEmoji: '🐉', caption: 'Дракон проснулся! 🐉', category: 'animal' },
  { resultEmoji: '🦋', caption: 'Бабочка — красота! 🦋', category: 'animal' },
  { resultEmoji: '🐙', caption: 'Осьминог — умнейший! 🐙', category: 'animal' },
  { resultEmoji: '🦀', caption: 'Краб — сила! 🦀', category: 'animal' },
  { resultEmoji: '🎮', caption: 'Геймер на связи! 🎮', category: 'activity' },
  { resultEmoji: '🏆', caption: 'Победа рядом! 🏆', category: 'activity' },
  { resultEmoji: '🎸', caption: 'Рок-звезда! 🎸', category: 'activity' },
  { resultEmoji: '🎨', caption: 'Творец шедевра! 🎨', category: 'activity' },
  { resultEmoji: '🎭', caption: 'Театральное искусство! 🎭', category: 'activity' },
  { resultEmoji: '🏖️', caption: 'Отпуск — это святое! 🏖️', category: 'activity' },
  { resultEmoji: '🎪', caption: 'Цирк — веселье! 🎪', category: 'activity' },
  { resultEmoji: '🎢', caption: 'Адреналин зашкаливает! 🎢', category: 'activity' },
  { resultEmoji: '📸', caption: 'Момент пойман! 📸', category: 'object' },
  { resultEmoji: '💎', caption: 'Бриллиант — вечная ценность! 💎', category: 'object' },
  { resultEmoji: '🚀', caption: 'К звёздам! 🚀', category: 'object' },
  { resultEmoji: '🎁', caption: 'Сюрприз! 🎁', category: 'object' },
  { resultEmoji: '🔮', caption: 'Будущее видится ясным! 🔮', category: 'object' },
  { resultEmoji: '🎯', caption: 'В яблочко! 🎯', category: 'object' },
  { resultEmoji: '💡', caption: 'Отличная идея! 💡', category: 'object' },
  { resultEmoji: '⚡', caption: 'Энергия бьёт ключом! ⚡', category: 'object' },
  { resultEmoji: '🥰', caption: 'Любовь и счастье! 🥰', category: 'emotion' },
  { resultEmoji: '🤗', caption: 'Обнимашки! 🤗', category: 'emotion' },
  { resultEmoji: '😘', caption: 'Целую! 😘', category: 'emotion' },
  { resultEmoji: '💖', caption: 'Сердце влюблено! 💖', category: 'emotion' },
  { resultEmoji: '✨', caption: 'Волшебство вокруг! ✨', category: 'emotion' },
  { resultEmoji: '🌟', caption: 'Сияешь ярче всех! 🌟', category: 'emotion' },
  { resultEmoji: '💫', caption: 'Звёздный час! 💫', category: 'emotion' },
  { resultEmoji: '🎉', caption: 'Праздник! 🎉', category: 'emotion' },
  { resultEmoji: '🧙‍♂️', caption: 'Маг появился! 🧙‍♂️', category: 'fantasy' },
  { resultEmoji: '🦸', caption: 'Супергерой в деле! 🦸', category: 'fantasy' },
  { resultEmoji: '🧚', caption: 'Фея прилетела! 🧚', category: 'fantasy' },
  { resultEmoji: '👽', caption: 'Пришелец с другой планеты! 👽', category: 'fantasy' },
  { resultEmoji: '🤖', caption: 'Робот нового поколения! 🤖', category: 'fantasy' },
  { resultEmoji: '🛸', caption: 'НЛО замечено! 🛸', category: 'fantasy' },
  { resultEmoji: '🔮', caption: 'Магический шар! 🔮', category: 'fantasy' },
  { resultEmoji: '⚔️', caption: 'Рыцарь готов к бою! ⚔️', category: 'fantasy' },
];

export const useEmojiStore = create<EmojiMixStore>((set, get) => ({
  selectedEmojis: [null, null],
  currentResult: null,
  isMixing: false,
  totalMixes: 0,
  history: [],

  selectEmoji: (emoji: string) => {
    const { selectedEmojis } = get();
    if (selectedEmojis[0] === emoji || selectedEmojis[1] === emoji) {
      if (selectedEmojis[0] === emoji) {
        set({ selectedEmojis: [null, selectedEmojis[1]] });
      } else {
        set({ selectedEmojis: [selectedEmojis[0], null] });
      }
    } else if (!selectedEmojis[0]) {
      set({ selectedEmojis: [emoji, selectedEmojis[1]] });
    } else if (!selectedEmojis[1]) {
      set({ selectedEmojis: [selectedEmojis[0], emoji] });
    } else {
      set({ selectedEmojis: [emoji, selectedEmojis[1]] });
    }
  },

  clearSelection: () => {
    set({ selectedEmojis: [null, null], currentResult: null });
  },

  mixEmojis: async () => {
    const { selectedEmojis } = get();
    if (!selectedEmojis[0] || !selectedEmojis[1]) return;

    set({ isMixing: true });
    await new Promise(resolve => setTimeout(resolve, 800));

    const key = `${selectedEmojis[0]}${selectedEmojis[1]}`;
    const hash = simpleHash(key);
    const result = allMixResults[hash % allMixResults.length];

    set({ 
      currentResult: result, 
      isMixing: false,
      totalMixes: get().totalMixes + 1,
      history: [...get().history, result].slice(-10)
    });
  },

  incrementMixCount: () => {
    set({ totalMixes: get().totalMixes + 1 });
  },

  reset: () => {
    set({ selectedEmojis: [null, null], currentResult: null, isMixing: false });
  },
}));