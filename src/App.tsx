import { useState, useEffect, lazy, Suspense } from 'react';
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  Epic,
  Tabbar,
  TabbarItem,
  View,
  ScreenSpinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28HomeOutline, Icon28UserOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { HomePanel } from './panels/Home';
import { ProfilePanel } from './panels/Profile';
import { useNavigation } from './hooks/useNavigation';
import { useAppStore } from './store/app';
import type { ColorSchemeType } from '@vkontakte/vkui';

// Второстепенные панели грузятся лениво
const DetailPanel = lazy(() =>
  import('./panels/Detail').then((m) => ({ default: m.DetailPanel })),
);

type ActiveStory = 'home' | 'profile';

export function App() {
  const [activeStory, setActiveStory] = useState<ActiveStory>('home');

  const homeNav = useNavigation('home-main');
  const profileNav = useNavigation('profile-main');

  const colorScheme = useAppStore((state) => state.colorScheme);
  const setColorScheme = useAppStore((state) => state.setColorScheme);

  // Централизованная подписка на Bridge события
  useEffect(() => {
    bridge.subscribe(({ detail }) => {
      if (detail.type === 'VKWebAppUpdateConfig') {
        const { appearance } = detail.data as { appearance?: ColorSchemeType };
        if (appearance) setColorScheme(appearance);
      }
    });
  }, [setColorScheme]);

  return (
    <ConfigProvider colorScheme={colorScheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol autoSpaced>
              <Epic
                activeStory={activeStory}
                tabbar={
                  <Tabbar>
                    <TabbarItem
                      selected={activeStory === 'home'}
                      onClick={() => setActiveStory('home')}
                      label="Главная"
                    >
                      <Icon28HomeOutline />
                    </TabbarItem>
                    <TabbarItem
                      selected={activeStory === 'profile'}
                      onClick={() => setActiveStory('profile')}
                      label="Профиль"
                    >
                      <Icon28UserOutline />
                    </TabbarItem>
                  </Tabbar>
                }
              >
                <View
                  id="home"
                  history={homeNav.history}
                  activePanel={homeNav.activePanel}
                  onSwipeBack={homeNav.back}
                >
                  <HomePanel id="home-main" onNavigate={homeNav.navigate} />
                  <Suspense fallback={<ScreenSpinner />}>
                    <DetailPanel id="home-detail" onBack={homeNav.back} />
                  </Suspense>
                </View>

                <View
                  id="profile"
                  history={profileNav.history}
                  activePanel={profileNav.activePanel}
                  onSwipeBack={profileNav.back}
                >
                  <ProfilePanel id="profile-main" />
                </View>
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
