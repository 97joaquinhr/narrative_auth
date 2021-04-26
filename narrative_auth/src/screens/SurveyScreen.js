import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '../res/validColors';

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';

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
            headerStyle: {
                backgroundColor: GREEN,
                height: 40,
                elevation: 5,
            },
            headerTintColor: '#fff',
            headerTitle: 'Sample Survey',
            headerTitleStyle: {
                flex: 1,
            }
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
         * 
         *  Answers are returned in an array, of the form 
         *  [
         *  {questionId: string, value: any},
         *  {questionId: string, value: any},
         *  ...
         *  ]
         *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
         *  to you.
         *  
         *  As an example
         *  { 
         *      questionId: "favoritePet", 
         *      value: { 
         *          optionText: "Dogs",
         *          value: "dog"
         *      }
         *  }
         *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a 
         *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
         */

        const infoQuestionsRemoved = [...answers];

        // Convert from an array to a proper object. This won't work if you have duplicate questionIds
        const answersAsObj = {};
        for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }

        this.props.navigation.navigate('SurveyCompleted', { surveyAnswers: answersAsObj });
    }

    /**
     *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
     *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
     *  is restricted (age, geo-fencing) from your app.
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
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    color={GREEN}
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={GREEN}
                    title={'Previous'}
                />
            </View>
        );
    }

    renderNextButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    color={GREEN}
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={GREEN}
                    title={'Next'}
                />
            </View>
        );
    }

    renderFinishedButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    title={'Finished'}
                    onPress={onPress}
                    disabled={!enabled}
                    color={GREEN}
                />
            </View>
        );
    }

    renderButton(data, index, isSelected, onPress) {
        return (
            <View
                key={`selection_button_view_${index}`}
                style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
            >
                <Button
                    title={data.optionText}
                    onPress={onPress}
                    color={isSelected ? GREEN : PURPLE}
                    style={isSelected ? { fontWeight: 'bold' } : {}}
                    key={`button_${index}`}
                />
            </View>
        );
    }

    renderQuestionText(questionText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text numLines={1} style={styles.questionText}>{questionText}</Text>
            </View>
        );
    }

    renderInfoText(infoText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text style={styles.infoText}>{infoText}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
                <View style={styles.container}>
                    <SimpleSurvey
                        ref={(s) => { this.surveyRef = s; }}
                        survey={survey}
                        renderSelector={this.renderButton.bind(this)}
                        containerStyle={styles.surveyContainer}
                        navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                        renderPrevious={this.renderPreviousButton.bind(this)}
                        renderNext={this.renderNextButton.bind(this)}
                        renderFinished={this.renderFinishedButton.bind(this)}
                        renderQuestionText={this.renderQuestionText}
                        onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                        onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
                        renderInfo={this.renderInfoText}
                    />

                </View>

                <ScrollView style={styles.answersContainer}>
                    <Text style={{ textAlign: 'center' }}>JSON output</Text>
                    <Text>{this.state.answersSoFar}</Text>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        height: 30,
        width: 140,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',


        borderRadius: 10,
        flex: 1,
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
    },
    surveyContainer: {
        width: 'auto',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignContent: 'center',
        padding: 5,
        flexGrow: 0,
        elevation: 20,
    },
    navButtonText: {
        margin: 10,
        fontSize: 20,
        color: 'white',


        width: 'auto'
    },
    answers: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    navigationButton: {

        minHeight: 40,
        backgroundColor: GREEN,
        padding: 0,
        borderRadius: 100,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20
    },
    infoText: {
        marginBottom: 20,
        fontSize: 20,
        marginLeft: 10
    },
});
