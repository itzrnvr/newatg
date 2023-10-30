import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Onboarding, {
    DoneButtonProps,
    NextButtonProps,
    SkipButtonProps,
} from 'react-native-onboarding-swiper';
import {StackNavigationProp} from '@react-navigation/stack';

type OnBoardingScreenProp = {
    navigation: StackNavigationProp<any>;
};

const Dots: React.FC<{selected: boolean}> = ({selected}) => {
    let backgroundColor: string;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    );
};

const Skip: React.FC<SkipButtonProps> = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
        <Text style={{fontSize: 16}}>Skip</Text>
    </TouchableOpacity>
);

const Next: React.FC<NextButtonProps> = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
        <Text style={{fontSize: 16}}>Next</Text>
    </TouchableOpacity>
);

const Done: React.FC<DoneButtonProps> = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
        <Text style={{fontSize: 16}}>Done</Text>
    </TouchableOpacity>
);

const OnBoardingScreen: React.FC<OnBoardingScreenProp> = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace('Home')}
            onDone={() => navigation.navigate('Home')}
            pages={[
                {
                    backgroundColor: '#3b82f6',
                    image: (
                        <Image source={require('../../assets/on_one.png')} />
                    ),
                    title: 'Learn How to Learn & even Score Better',
                    titleStyles: {
                        color: '#ffffff',
                    },
                    subtitle:
                        'For STUDENTS- preparing for any exams and wishing to perform better.',
                    subTitleStyles: {
                        color: '#ffffff',
                    },
                },
                {
                    backgroundColor: '#3b82f6',
                    image: (
                        <Image source={require('../../assets/on_two.png')} />
                    ),
                    title: 'Reduce stress and generate Spare time',
                    titleStyles: {
                        color: '#ffffff',
                    },
                    subtitle:
                        'Corportae Excecutative can complete their tasks faster.',
                    subTitleStyles: {
                        color: '#ffffff',
                    },
                },
            ]}
        />
    );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
