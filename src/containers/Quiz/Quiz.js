import React, { Component } from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component{
    state={
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
                    {text: 'Стив Джопс', id:2},
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

        const question= this.state.quiz[this.state.activeQuestion]

        if(question.rightAnswerId === answerId){
            this.setState({
                answerState: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinish()){
                    console.log('finish')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })

                }
                window.clearTimeout(timeout)
            },1000)
        } else {
              this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }
    isQuizFinish(){
        return this.state.activeQuestion +1 === this.state.quiz.length
    }
    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        title={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick = {this.onAnswerClickHandler}
                        quizLenght = {this.state.quiz.length}
                        answerNumber = {this.state.activeQuestion + 1}
                        state = {this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz