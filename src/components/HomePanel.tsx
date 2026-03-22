import { 
  Group, 
  Button, 
  Subhead, 
  Caption
} from '@vkontakte/vkui';
import { useEmojiStore } from '../store/emojiStore';
import { popularEmojis } from '../data/emojiData';
import EmojiSlot from './EmojiSlot';
import './HomePanel.css';

interface HomePanelProps {
  onMix: () => void;
}

function HomePanel({ onMix }: HomePanelProps) {
  const { selectedEmojis, clearSelection, isMixing, totalMixes } = useEmojiStore();
  const canMix = selectedEmojis[0] && selectedEmojis[1];

  return (
    <div className="home-panel">
      <Group mode="card" className="selection-group">
        <Subhead className="select-title">Выбери 2 эмодзи</Subhead>
        
        <div className="emoji-slots">
          <EmojiSlot emoji={selectedEmojis[0]} slot={1} />
          <span className="plus-sign">+</span>
          <EmojiSlot emoji={selectedEmojis[1]} slot={2} />
        </div>

        {(selectedEmojis[0] || selectedEmojis[1]) && (
          <Button 
            mode="tertiary" 
            size="s" 
            onClick={clearSelection}
            className="reset-button"
          >
            ✕ Сброс
          </Button>
        )}
      </Group>

      <Group mode="card" className="emoji-grid-group">
        <div className="emoji-grid">
          {popularEmojis.map((emoji, index) => (
            <button
              key={index}
              className={`emoji-cell ${
                selectedEmojis[0] === emoji || selectedEmojis[1] === emoji ? 'selected' : ''
              }`}
              onClick={() => useEmojiStore.getState().selectEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </Group>

      <div className="action-section">
        <Button
          size="l"
          mode="primary"
          stretched
          disabled={!canMix}
          loading={isMixing}
          onClick={onMix}
          className="mix-button"
        >
          Смешать 🎲
        </Button>
        
        <Caption className="counter">
          Создано {totalMixes} комбо
        </Caption>
      </div>
    </div>
  );
}

export default HomePanel;