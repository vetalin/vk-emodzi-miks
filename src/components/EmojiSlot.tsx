import './EmojiSlot.css';

interface EmojiSlotProps {
  emoji: string | null;
  slot: number;
}

function EmojiSlot({ emoji }: EmojiSlotProps) {
  return (
    <div className={`emoji-slot ${emoji ? 'filled' : 'empty'}`}>
      {emoji ? (
        <span className="selected-emoji">{emoji}</span>
      ) : (
        <span className="slot-placeholder">+</span>
      )}
    </div>
  );
}

export default EmojiSlot;