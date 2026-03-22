import { useState } from 'react';
import { 
  ConfigProvider, 
  AppRoot, 
  View, 
  Panel, 
  PanelHeader, 
  SplitLayout
} from '@vkontakte/vkui';
import VKBridge from '@vkontakte/vk-bridge';
import HomePanel from './components/HomePanel';
import MixPanel from './components/MixPanel';
import { useEmojiStore } from './store/emojiStore';

// Инициализация VK Bridge
VKBridge.send('VKWebAppInit', {});

function App() {
  const [activePanel, setActivePanel] = useState('home');
  const { selectedEmojis } = useEmojiStore();

  const handleMix = () => {
    if (selectedEmojis[0] && selectedEmojis[1]) {
      setActivePanel('mix');
    }
  };

  const handleBack = () => {
    setActivePanel('home');
  };

  return (
    <ConfigProvider>
      <AppRoot>
        <SplitLayout>
          <View activePanel={activePanel}>
            <Panel id="home">
              <PanelHeader>Эмодзи-Микс</PanelHeader>
              <HomePanel onMix={handleMix} />
            </Panel>
            <Panel id="mix">
              <PanelHeader />
              <MixPanel onBack={handleBack} />
            </Panel>
          </View>
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  );
}

export default App;