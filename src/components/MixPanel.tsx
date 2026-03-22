import { useEffect } from 'react';
import { Button, Title, Div } from '@vkontakte/vkui';
import { Icon28ShareOutline } from '@vkontakte/icons';
import confetti from 'canvas-confetti';
import { useEmojiStore } from '../store/emojiStore';
import { categoryGradients } from '../data/emojiData';
import './MixPanel.css';

interface MixPanelProps {
  onBack: () => void;
}

function MixPanel({ onBack }: MixPanelProps) {
  const { selectedEmojis, currentResult, isMixing, mixEmojis } = useEmojiStore();

  useEffect(() => {
    if (!isMixing && !currentResult && selectedEmojis[0] && selectedEmojis[1]) {
      mixEmojis();
    }
  }, []);

  useEffect(() => {
    if (currentResult) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#9D4EDD', '#FFD700', '#00CED1'],
      });
    }
  }, [currentResult]);

  const handleShare = async () => {
    if (!currentResult) return;
    
    // Копируем результат в буфер обмена
    const text = `${currentResult.resultEmoji} ${currentResult.caption}\n\nСоздано в Эмодзи-Микс 💜`;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.log('Clipboard not available');
    }
  };

  const handleReplay = () => {
    useEmojiStore.getState().clearSelection();
    onBack();
  };

  const gradient = currentResult 
    ? categoryGradients[currentResult.category] || categoryGradients.fantasy
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  return (
    <div className="mix-panel">
      <div className="mix-container">
        {!isMixing && currentResult ? (
          <>
            <div className="result-card" style={{ background: gradient }}>
              <div className="result-emoji">{currentResult.resultEmoji}</div>
              <Title level="3" className="result-caption">
                {currentResult.caption}
              </Title>
            </div>
            
            <Div className="share-section">
              <Button
                size="l"
                mode="primary"
                stretched
                before={<Icon28ShareOutline />}
                onClick={handleShare}
                className="share-button"
              >
                Скопировать результат 📋
              </Button>
              
              <Button
                size="l"
                mode="outline"
                stretched
                onClick={handleReplay}
                className="replay-button"
              >
                🎲 Ещё раз
              </Button>
            </Div>
          </>
        ) : (
          <div className="mixing-animation">
            <div className="mixing-emojis">
              <span className="mix-emoji first">{selectedEmojis[0]}</span>
              <span className="mix-plus">+</span>
              <span className="mix-emoji second">{selectedEmojis[1]}</span>
            </div>
            <div className="mixing-spinner">
              <span>✨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MixPanel;