import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import expressAPI from '../api/expressApi';


export default class SurveyCompletedScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'Revisa tus respuestas'
        };
    }

    render() {
        const answers = this.props.navigation.getParam('surveyAnswers');

        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.questionText}>Revisar</Text>
                        <Text style={styles.questionText}>Desea: {answers.flow.optionText}</Text>
                        <Text style={styles.questionText}>Tu usuario: {answers.username}</Text>
                        <Text style={styles.questionText}>1 {answers.momento_dia.optionText}</Text>
                        <Text style={styles.questionText}>2 {answers.lugar.optionText}</Text>
                        <Text style={styles.questionText}>3 {answers.saludas.optionText}</Text>
                        <Text style={styles.questionText}>4 {answers.comida.optionText}</Text>
                        <Text style={styles.questionText}>5 {answers.al_terminar.optionText}</Text>
                        <Text style={styles.questionText}>6 {answers.musica.optionText}</Text>
                        <Text style={styles.questionText}>7 {answers.transporte.optionText}</Text>
                        {/* <Text>Raw JSON: {JSON.stringify(this.props.navigation.getParam('surveyAnswers', {}))}</Text> */}
                    </ScrollView>
                    <Button
                        title="Listo"
                        onPress={() => postJson(this.props.navigation, answers)}
                    />
                </View>
            </View>
        );
    }
}

async function postJson(navigation, answers){
    const username = answers.username;
    let password = '';
    for (let key in answers){
        if (key != 'username' && key != 'flow'){
            password+=answers[key]['value'].charAt(0);
        }
    }
    let flow_text = 'Inicio de sesión';
    if (answers.flow.value == 'signup'){
        flow_text = 'Registro'
    }
    let apiRoute = '/'.concat(answers.flow.value)
    try{
        const response = await expressAPI.post(apiRoute,{username,password});
        navigation.navigate('Finished', {
            flow: flow_text,
            result: 'con éxito'
        });
    }catch(err){
        // console.log(err);
        navigation.navigate('Finished', {
            flow: flow_text,
            result: 'fallido'
        });
    }
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        maxHeight: '80%',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20
    },
});
