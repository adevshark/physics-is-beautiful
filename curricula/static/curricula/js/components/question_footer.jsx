import React from 'react'
import {DEFAULT_MATHJAX_OPTIONS} from '../constants'
import {Answer} from './answers/correct_answers/correct_answer'
import {CheckContinueButton} from './utils/check_continue_button'

/* global MathJax */

export class Footer extends React.Component {
  componentDidMount () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  render () {
    var checkMarks = ''
    var correctMessage = ''
    // var continueButton = ''
    if (this.props.correct === true) {
      checkMarks = (<span id='correct' className='glyphicon glyphicon-ok-sign pull-right'></span>)
      correctMessage = 'Correct'
    } else if (this.props.correct === false) {
      checkMarks = (<span id='incorrect' className='glyphicon glyphicon-remove-sign pull-right'></span>)
      correctMessage = <div>
        <span>Incorrect, the correct answer is: <br /></span>
        <Answer answer={this.props.correct_answer} />
      </div>
      // continueButton = (
      //   <button id='checkButton' type='button' onClick={this.props.continueAction}>
      //       Continue
      //   </button>
      // )
    }

    return (
      <div id='footer'>
        <div id='checkMarks'>{checkMarks}</div>
        <div id='checkContainer'>
          {/* {continueButton} */}
          <CheckContinueButton
            checkAction={this.props.checkAction}
            continueAction={this.props.continueAction}
            isCheck={typeof this.props.correct === 'undefined'} />
        </div>
        <div id='blockRight'>
          <div id='correctMessage'>{correctMessage}</div>
        </div>
        <div className='progress-bottom-container'>
          <h4>Progress</h4>
          <div className='progress'>
            <div
              className='progress-bar progress-bar-info progress-bar-striped'
              id='progressbar'
              role='progressbar'
              aria-valuenow='0'
              aria-valuemin='0'
              aria-valuemax='100'
              style={{width: this.props.progress + '%'}}>
              <span className='sr-only'></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Footer.propTypes = {
  continueAction: React.PropTypes.func.isRequired,
  checkAction: React.PropTypes.func.isRequired
}