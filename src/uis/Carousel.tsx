import {useRef, useState} from 'react';
import type {
  FlatListProps,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {css} from '@emotion/native';
import {Button, useDooboo} from 'dooboo-ui';
import {useRouter} from 'expo-router';

import {t} from '../STRINGS';
import {COMPONENT_WIDTH} from '../utils/constants';

type Props<T> = {
  style?: StyleProp<ViewStyle>;
  onLayout?: FlatListProps<T>['onLayout'];
  getItemLayout?: FlatListProps<T>['getItemLayout'];
  data: FlatListProps<T>['data'];
  renderItem: ListRenderItem<T>;
  renderIndicator?: (length: number, currentIndex: number) => JSX.Element;
};

function Carousel<T>({
  style,
  data = [],
  renderItem,
  renderIndicator,
  onLayout,
  getItemLayout,
}: Props<T>): JSX.Element {
  const {theme} = useDooboo();
  const {bottom} = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<T>>(null);
  const {replace} = useRouter();

  const onViewableItemsChanged: FlatListProps<any>['onViewableItemsChanged'] =
    ({viewableItems}) => setCurrentIndex(viewableItems[0].index ?? 0);

  // https://github.com/facebook/react-native/issues/30171#issuecomment-820833606
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged,
    },
  ]);

  return (
    <View
      style={[
        style,
        css`
          flex: 1;
          align-self: stretch;
        `,
      ]}
    >
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: bottom + 60,

          alignItems: 'center',
          justifyContent: 'center',
        }}
        data={data}
        getItemLayout={getItemLayout}
        horizontal
        onLayout={onLayout}
        onScrollToIndexFailed={() => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({index: 1, animated: false});
          });
        }}
        pagingEnabled
        ref={flatListRef}
        renderItem={renderItem}
        style={css`
          padding-bottom: 28px;
          max-width: ${COMPONENT_WIDTH + 'px'};
        `}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      {/* Bottom Components */}
      <View
        style={css`
          width: 100%;
          position: absolute;
          padding: 0 28px 0 40px;
          bottom: ${bottom + 28 + 'px'};

          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Button
          onPress={() => {
            if (currentIndex === data!.length - 1) {
              replace('/intro');

              return;
            }

            flatListRef.current?.scrollToIndex({
              index: currentIndex + 1,
              animated: false,
            });

            setCurrentIndex((prev) => prev + 1);
          }}
          styles={{
            container: css`
              padding: 6px 12px;
            `,
            text: css`
              font-family: Pretendard-Bold;
              font-size: 16px;
              color: ${theme.role.success};
            `,
          }}
          text={t('next')}
          type="text"
        />
        {renderIndicator?.(data!.length, currentIndex)}
      </View>
    </View>
  );
}

export default Carousel;
