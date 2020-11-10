import axios from './../../axios/axios-quiz';
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from './actionTypes';

export function fetchQuizes(){
    return async dispatch =>{
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')
            console.log(response.data)

            const quizes =[]

            Object.keys(response.data).forEach((key, index)=>{
                quizes.push({
                    id:key,
                    name: `Тест №${ index + 1 }`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            dispatch(fetchQuizesError())
        }
    }
}

export function fetchQuizByID(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart(){
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error){
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
        isFinished: true
    }
}
    
export function quizNextQuestion(activeQuestion, answerState) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion,
        answerState
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if(state.answerState){
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key]==='success'){
                return
            }
        }
        const results = state.results
        const question = state.quiz[state.activeQuestion]

        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }

            dispatch(quizSetState( {[answerId]: 'success'}, results))
            const timeout = window.setTimeout(()=>{
                if(isQuizFinish(state)){
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1, null))
                }
                window.clearTimeout(timeout)
            },700)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState( {[answerId]: 'error'}, results))
        }
    }
}

function isQuizFinish(state){
    return state.activeQuestion +1 === state.quiz.length
}

export function quizRetry() {
    return {
        type: QUIZ_RETRY
    }
}