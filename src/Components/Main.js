import React, { Component } from 'react'
import {retake, fetch } from '../actions/selection';
import {connect} from 'react-redux';
import Questionaire from './Questionaire';

/// mapping the reducer as property of the class
const MapStateToProps = state => ({
    QuestionBank: state.QuestionBank
})

/// mapping the actions as properties of the class
const MapDispatchToProps = dispatch =>({
    fetch:() => {dispatch(fetch())},
    retake:() =>dispatch(retake()),
})

class Main extends Component {

    componentDidMount(){
        this.props.fetch();
    }
   
    render(){
        const Question = () =>{
            return(<Questionaire questions={this.props.QuestionBank.questions} retake={this.props.retake}/>)
        }
        return(
            <Question/>
        )
    }
    
}

export default connect(MapStateToProps,MapDispatchToProps)(Main);
