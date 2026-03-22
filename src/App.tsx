import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { 
  ConfigProvider, 
  AppRoot, 
  SplitLayout, 
  SplitCol, 
  View, 
  Panel, 
  PanelHeader, 
  Button,
  Group,
  Cell,
  Div,
  Text
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const EMOJIS = ['😀','😎','🤔','😂','🥳','😇','🤯','🥺','😈','👻','🦊','🐼','🐸','🦄','🐯','🦁','🐨','🐙','🦋','🌸'];

const RESULTS = [
  { emoji: '🌟', text: 'Легенда', desc: 'Ты — легенда! Все смешивают свои эмодзи с твоими.' },
  { emoji: '🔥', text: 'Огонь', desc: 'Твоя смесь — горячая! Будь осторожен.' },
  { emoji: '💩', text: 'Какашка', desc: 'Ну... бывает. Попробуй ещё раз!' },
  { emoji: '💎', text: 'Бриллиант', desc: 'Редчайшая комбинация! Ты — бриллиант.' },
  { emoji: '🤝', text: 'Дружба', desc: 'Ваши эмодзи подругались. Мило!' },
  { emoji: '🎉', text: 'Вечеринка', desc: 'Получилась самая настоящая тусовка!' },
  { emoji: '😰', text: 'Тревога', desc: 'Смесь слишком мощная. Может, полегче?' },
  { emoji: '❤️', text: 'Любовь', desc: 'Ваши эмодзи влюбились друг в друга!' },
];

function App() {
  const [view, setView] = useState<'home' | 'select1' | 'select2' | 'mix' | 'result'>('home');
  const [emoji1, setEmoji1] = useState<string>('');
  const [emoji2, setEmoji2] = useState<string>('');
  const [result, setResult] = useState<typeof RESULTS[0] | null>(null);
  const [scheme, setScheme] = useState<'light'|'dark'>('light');

  useEffect(() => {
    bridge.send('VKWebAppInit');
    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppUpdateConfig') {
        const s = e.detail.data?.scheme;
        setScheme(s === 'space_gray' || s === 'vkcom_dark' ? 'dark' : 'light');
      }
    });
  }, []);

  const handleMix = () => {
    setView('mix');
    setTimeout(() => {
      const hash = (emoji1.charCodeAt(0) + emoji2.charCodeAt(0)) % RESULTS.length;
      setResult(RESULTS[hash]);
      setView('result');
    }, 1500);
  };

  const handleShare = async () => {
    if (!result) return;
    const text = `Я получил: ${result.emoji} ${result.text}!\n${result.desc}\nПопробуй: https://vk.com/app54499993`;
    try {
      await bridge.send('VKWebAppShowWallPostBox', { message: text });
    } catch {}
  };

  return (
    <ConfigProvider colorScheme={scheme}>
      <AppRoot>
        <SplitLayout>
          <SplitCol>
            <View activePanel={view}>
              <Panel id="home">
                <PanelHeader>Эмодзи-Микс</PanelHeader>
                <Div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Text style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🎲</Text>
                  <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Эмодзи-Микс</Text>
                  <Text style={{ color: '#666', marginBottom: '32px' }}>Смешай два эмодзи и узнай результат!</Text>
                  <Button size="l" onClick={() => setView('select1')}>Начать</Button>
                </Div>
              </Panel>

              <Panel id="select1">
                <PanelHeader>Выбери первый</PanelHeader>
                <Group>
                  <Div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '16px' }}>
                    {EMOJIS.map(e => (
                      <Cell 
                        key={e} 
                        style={{ fontSize: '32px', textAlign: 'center', padding: '12px' }}
                        onClick={() => { setEmoji1(e); setView('select2'); }}
                      >{e}</Cell>
                    ))}
                  </Div>
                </Group>
              </Panel>

              <Panel id="select2">
                <PanelHeader>Выбери второй</PanelHeader>
                <Group>
                  <Div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '16px' }}>
                    {EMOJIS.map(e => (
                      <Cell 
                        key={e} 
                        style={{ fontSize: '32px', textAlign: 'center', padding: '12px' }}
                        onClick={() => { setEmoji2(e); handleMix(); }}
                      >{e}</Cell>
                    ))}
                  </Div>
                </Group>
              </Panel>

              <Panel id="mix">
                <PanelHeader></PanelHeader>
                <Div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Text style={{ fontSize: '80px', display: 'block', marginBottom: '20px' }}>{emoji1} + {emoji2}</Text>
                  <Text style={{ fontSize: '20px', color: '#666' }}>Смешиваем... 🔄</Text>
                </Div>
              </Panel>

              <Panel id="result">
                <PanelHeader>Результат</PanelHeader>
                <Div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Text style={{ fontSize: '80px', display: 'block', marginBottom: '16px' }}>{result?.emoji}</Text>
                  <Text style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{result?.text}</Text>
                  <Text style={{ color: '#666', marginBottom: '32px' }}>{result?.desc}</Text>
                  <Button size="l" onClick={handleShare} style={{ marginBottom: '12px' }}>Поделиться</Button>
                  <br />
                  <Button onClick={() => { setEmoji1(''); setEmoji2(''); setResult(null); setView('home'); }}>Ещё раз</Button>
                </Div>
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  );
}

export default App;
