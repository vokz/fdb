import * as React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import data from './data';

function CarouselCards() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return (
        <View style={{ flex: 1, zIndex: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}>
            <Carousel
                loop
                width={width}
                height={height}
                autoPlay={true}
                data={[...data.keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => {}}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                            height: 100
                        }}
                    >
                        <Image source={data[index].imgUrl} />
                    </View>
                )}
            />
        </View>
    );
}

export default CarouselCards;