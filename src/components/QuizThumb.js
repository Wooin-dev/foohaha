import React from "react";
import {useNavigate} from "react-router-dom";


export default function QuizThumb(props) {

    const navigate = useNavigate();
    const onClickQuizItem = () => {
        navigate(`/quizzes/${props.quiz.quizId}`)
    }

    const QuizContentsOnThumb = () => {
        return (
            <div className="Quiz-Contents-Section
            flex-1 overflow-hidden whitespace-no-wrap">
                <div className="text-xs">
                    <span>Quiz. {props.quiz.quizId}</span>
                </div>
                <div className="text-md font-bold">
                    <p className="truncate">{props.quiz.question}</p>
                </div>
                <div className="flex text-xs text-gray-500 pt-2 space-x-2">
                    <div>
                        푸하하 {props.quiz.cntLikes}
                    </div>
                    <div>
                        댓글 {props.quiz.cntReplies}
                    </div>
                </div>
            </div>
        );
    }

    const AuthorOnThumb = () => {
        return (
            <div className="Quiz-Author-Section
            text-sm text-gray-500 w-auto ml-5 px-2">
                {props.quiz.author}
            </div>
        );
    }

    return (
        <div onClick={onClickQuizItem}
             className="
            w-auto h-24
            m-auto p-1.5 px-6
            space-y-px
            rounded shadow
            cursor-pointer
            flex items-center
            {/*grid grid-flow-row auto-rows-max*/}
        ">

            <QuizContentsOnThumb/>
            <AuthorOnThumb/>

        </div>
    )
}