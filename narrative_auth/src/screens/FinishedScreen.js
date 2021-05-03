import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Button } from 'react-native-elements';

const FinishedScreen = ({navigation})=>{
    return (
        <>
            <Spacer>
                <Text h3> {navigation.getParam('flow')} {navigation.getParam('result')}</Text>
            </Spacer>
            <Spacer>
                <Button
                    title="Empezar de nuevo"
                    onPress={() => navigation.navigate('Survey')}
                />
            </Spacer>
            

        </>
    );
};

FinishedScreen.navigationOptions ={
    title: 'Finalizado'
};
const styles = StyleSheet.create({
    text:{
        fontSize:24
    }
});
export default FinishedScreen;