import React, { Component } from 'react'
import classes from './QuizCreator.module.scss'
import Button from './../../components/UI/Button/Button';

export default class QuizCreator extends Component {

    state = {
        quiz:[],
        formControls:{
            question:'',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
        }
    }

    submitHandler(event){
        event.preventDefault()
    }

    addQuestionHandler = ()=>{

    }

    createQuizHandler= ()=>{

    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>

                        <input />
                        <hr/>
                        <input />
                        <input />
                        <input />
                        <input />

                        <select></select>

                        <Button
                            type={"primary"}
                            onClick={this.addQuestionHandler}
                        >   
                            Добавить вопрос
                        </Button>

                        <Button
                            type={"success"}
                            onClick={this.createQuizHandler}
                        >   
                            Создать тест
                        </Button>

                        
                    </form>
                </div>
            </div>
        )
    }
}
