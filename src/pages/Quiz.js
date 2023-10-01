import React, {useEffect, useState} from "react";

import QuizThumb from "../components/QuizThumb";
import QuizCreateButton from "../components/QuizCreateButton";
import axios from "axios";
import {dummy} from "../quizDummy";

export default function Quiz() {

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/quizzes').then(res => {
            setQuizzes(res.data)
        }).catch(error => {
            alert(error)
        })
    }, [])

    return (
        <div>
            <h1>Quiz</h1><br/>
            <div>{JSON.stringify(quizzes)}</div>
            <div className='quiz-container'>
                {
                    quizzes.map((quiz)=>{
                        return (
                            <QuizThumb id={quiz['quizId']} title={quiz['question']} hint={quiz.hint} answer={quiz.answer} />
                        )
                    })
                }
                <QuizCreateButton />
            </div>
        </div>
    )
}