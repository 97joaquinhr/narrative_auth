import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from '../components/Spacer';

const FinishedScreen = ({navigation})=>{
    return (
        <>
            <Spacer>
                <Text h3>
                    {navigation.getParam('flow')} {navigation.getParam('result')}
                </Text>
            </Spacer>
            <>
                <Spacer>
                    <Text h4>Reinicie la app para volver a empezar</Text>
                </Spacer>
            </>
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