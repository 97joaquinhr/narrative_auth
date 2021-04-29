import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SimpleSurvey } from 'react-native-simple-survey';

const survey = [
    {
        questionType: 'Info',
        questionText: 'Welcome to the React Native Simple Survey Example app! Tap next to continue'
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            '¿Qué momento del día prefieres?',
        questionId: 'momento_dia',
        options: [
            {
                optionText: 'Mañana',
                value: 'a_manana'
            },
            {
                optionText: 'Medio día',
                value: 'b_medio_dia'
            },
            {
                optionText: 'Atardecer',
                value: 'c_atardecer'
            },
            {
                optionText: 'Noche',
                value: 'd_noche'
            }
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Elige entrar a algún lugar',
        questionId: 'lugar',
        options: [
            {
                optionText: 'Una casa',
                value: 'a_casa'
            },
            {
                optionText: 'Una oficina',
                value: 'b_oficina'
            },
            {
                optionText: 'Una escuela',
                value: 'c_escuela'
            },
            {
                optionText: 'Un cuarto',
                value: 'd_cuarto'
            }
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Entrando a ese lugar, saludas a',
        questionId: 'saludas',
        options: [
            {
                optionText: 'Un amigo',
                value: 'a_amigo'
            },
            {
                optionText: 'Un familiar',
                value: 'b_familiar'
            },
            {
                optionText: 'Un conocido',
                value: 'c_conocido'
            },
            {
                optionText: 'Un animal',
                value: 'd_animal'
            }
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Notas que tienes hambre, ¿qué comes?',
        questionId: 'comida',
        options: [
            {
                optionText: 'Una fruta',
                value: 'a_fruta'
            },
            {
                optionText: 'Una verdura',
                value: 'b_verdura'
            },
            {
                optionText: 'Una botana',
                value: 'c_botana'
            },
            {
                optionText: 'Un guisado',
                value: 'd_guisado'
            }
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Cuando terminas, ¿qué haces?',
        questionId: 'al_terminar',
        options: [
            {
                optionText: 'Duermes',
                value: 'a_duermes'
            },
            {
                optionText: 'Ordenas la cocina',
                value: 'b_cocina'
            },
            {
                optionText: 'Guardas las cosas',
                value: 'c_guardas'
            },
            {
                optionText: 'Comes algo más',
                value: 'd_comes_mas'
            }
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Justo después, escuchas una canción de',
        questionId: 'musica',
        options: [
            {
                optionText: 'Pop',
                value: 'a_pop'
            },
            {
                optionText: 'Hip Hop',
                value: 'b_hip_hop'
            },
            {
                optionText: 'Jazz',
                value: 'c_jazz'
            },
            {
                optionText: 'Clasica',
                value: 'd_clasica'
            }
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Al salir, te retiras',
        questionId: 'transporte',
        options: [
            {
                optionText: 'En coche',
                value: 'a_coche'
            },
            {
                optionText: 'Caminando',
                value: 'b_caminando'
            },
            {
                optionText: 'En taxi',
                value: 'c_taxi'
            },
            {
                optionText: 'En camión',
                value: 'd_camión'
            }
        ]
    },
    {
        questionType: 'Info',
        questionText: 'That is all for the demo, tap finish to see your results!'
    },
];

export default class SurveyScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'Autenticación narrativa'
        };
    }

    constructor(props) {
        super(props);
        this.state = { backgroundColor: 'white', answersSoFar: '' };
    }

    onSurveyFinished(answers) {
        /** 
         *  By using the spread operator, array entries with no values, such as info questions, are removed.
         *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
         *  to the rest of your code, can be done.
         *  Answers are returned in an array, of the form 
         *  [
         *  {questionId: string, value: any},
         *  {questionId: string, value: any},
         *  ...
         *  ]
         */

        const infoQuestionsRemoved = [...answers];

        // Convert from an array to a proper object. This won't work if you have duplicate questionIds
        const answersAsObj = {};
        for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }

        this.props.navigation.navigate('SurveyCompleted', { surveyAnswers: answersAsObj });
    }

    /**
     *  After each answer is submitted this function is called. Here you can take 
     *  additional steps in response to the user's answers.
     */
    onAnswerSubmitted(answer) {
        this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
        switch (answer.questionId) {
            case 'favoriteColor': {
                if (COLORS.includes(answer.value.toLowerCase())) {
                    this.setState({ backgroundColor: answer.value.toLowerCase() });
                }
                break;
            }
            default:
                break;
        }
    }

    renderPreviousButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 120, marginTop: 20, marginBottom: 20 }}>
                <Button
                    onPress={onPress}
                    disabled={!enabled}
                    title={'< Anterior'}
                    type='outline'
                />
            </View>
        );
    }

    renderNextButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 120, marginTop: 20, marginBottom: 20 }}>
                <Button
                    onPress={onPress}
                    disabled={!enabled}
                    title={'Siguiente >'}
                    type='solid'
                />
            </View>
        );
    }

    renderFinishedButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 20, marginBottom: 20 }}>
                <Button
                    title={'Terminar'}
                    onPress={onPress}
                    disabled={!enabled}
                />
            </View>
        );
    }

    renderButton(data, index, isSelected, onPress) {
        return (
            <View
                key={`selection_button_view_${index}`}
                style={{ margin:7, justifyContent: 'flex-start' }}
            >
                <Button
                    title={data.optionText}
                    onPress={onPress}
                    type={isSelected ? 'solid' : 'outline' }
                    style={isSelected ? { fontWeight: 'bold' } : {}}
                    key={`button_${index}`}
                    titleStyle={{
                        fontSize:22
                    }}
                />
            </View>
        );
    }

    renderQuestionText(questionText) {
        return (
            <View style={{ margin: 7 }}>
                <Text numLines={1} style={styles.questionText}>{questionText}</Text>
            </View>
        );
    }

    renderInfoText(infoText) {
        return (
            <View style={{ margin: 7 }}>
                <Text style={styles.infoText}>{infoText}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
                <SimpleSurvey
                    ref={(s) => { this.surveyRef = s; }}
                    survey={survey}
                    renderSelector={this.renderButton.bind(this)}
                    containerStyle={styles.surveyContainer}
                    navButtonContainerStyle={styles.navButtonContainerStyle}
                    renderPrevious={this.renderPreviousButton.bind(this)}
                    renderNext={this.renderNextButton.bind(this)}
                    renderFinished={this.renderFinishedButton.bind(this)}
                    renderQuestionText={this.renderQuestionText}
                    onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                    onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
                    renderInfo={this.renderInfoText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    surveyContainer: {
        flex:1,
        padding:25,
        width: '100%',
        backgroundColor:'white',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 25
    },
    infoText: {
        marginBottom: 20,
        fontSize: 25,
        marginLeft: 10
    },
    navButtonContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    answers: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    answersContainer: {
        width: '90%',
        maxHeight: '20%',
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
    }
});
