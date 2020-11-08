import axios from '../../axios/axios-quiz'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.scss';
import Loader from './../../components/UI/Loader/Loader';
import {connect} from 'redux'

class QuizList extends Component {

    state={
        quizes: [],
        loading: true
    }

    renderQuizes(){
        return this.state.quizes.map(quiz=>{
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount(){  
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

            this.setState({
                quizes,
                loading: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    { this.state.loading 
                        ?
                        <Loader />
                        :
                        <ul>
                          {this.renderQuizes()}
                        </ul>
                    }        
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)