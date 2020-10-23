import React, { Component } from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component{
    state={
        results:{},
        isFinished: false,
        answerState: null,
        activeQuestion: 0,
        quiz:[
            {
                question: 'Сколько лап у кошки?',
                rightAnswerId: 3,
                id:1,
                answers:[
                    {text: '3', id:1},
                    {text: '8', id:2},
                    {text: '4', id:3},
                    {text: '11', id:4}
                    ]
            },
            {
                question: 'Основатель компании Apple?',
                rightAnswerId: 2,
                id:2,
                answers:[
                    {text: 'Канеки Кен', id:1},
                    {text: 'Стив Джобс', id:2},
                    {text: 'Тим Кок', id:3},
                    {text: 'Илон Маск', id:4}
                ]
            }
        ]
    }
    onAnswerClickHandler = (answerId)=>{
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key]==='success'){
                return
            }
        }
        const results = this.state.results
        const question= this.state.quiz[this.state.activeQuestion]

        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinish()){
                    this.setState({
                        isFinished: !this.state.isFinished
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })

                }
                window.clearTimeout(timeout)
            },700)
        } else {
            results[question.id] = 'error'
              this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }
    isQuizFinish(){
        return this.state.activeQuestion +1 === this.state.quiz.length
    }
    retryHandler = ()=>{
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                        ?   <FinishedQuiz
                                results = {this.state.results}
                                quiz={ this.state.quiz}
                                onRetry = {this.retryHandler}
                            />

                        : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                title={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick = {this.onAnswerClickHandler}
                                quizLenght = {this.state.quiz.length}
                                answerNumber = {this.state.activeQuestion + 1}
                                state = {this.state.answerState}
                          />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz