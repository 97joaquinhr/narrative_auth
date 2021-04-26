import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
export default class SurveyCompletedScreen extends Component {
    static navigationOptions = () => {
        return {
            headerStyle: {
                backgroundColor: GREEN,
                height: 40,
                elevation: 5,
            },
            headerTintColor: '#fff',
            headerTitle: 'Survey Results',
            headerTitleStyle: {
                flex: 1,
            }
        };
    }

    render() {
        const answers = this.props.navigation.getParam('surveyAnswers');

        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.questionText}>The results are in!</Text>
                        <Text style={styles.questionText}>1 {answers.momento_dia.optionText}: {answers.momento_dia.value}</Text>
                        <Text style={styles.questionText}>2 {answers.lugar.optionText}: {answers.lugar.value}</Text>
                        <Text style={styles.questionText}>3 {answers.saludas.optionText}: {answers.saludas.value}</Text>
                        <Text style={styles.questionText}>4 {answers.comida.optionText}: {answers.comida.value}</Text>
                        <Text style={styles.questionText}>5 {answers.al_terminar.optionText}: {answers.al_terminar.value}</Text>
                        <Text style={styles.questionText}>6 {answers.musica.optionText}: {answers.musica.value}</Text>
                        <Text style={styles.questionText}>7 {answers.transporte.optionText}: {answers.transporte.value}</Text>
                        <Text>Raw JSON: {JSON.stringify(this.props.navigation.getParam('surveyAnswers', {}))}</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PURPLE,
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
