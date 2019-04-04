import React from 'react';

import {AnswerChoiceContainer} from '../containers/answer_choice';

export class MultipleChoiceAnswers extends React.Component {

  render() {
    var answers = [];
    for (var i in this.props.answers) {
      answers.push(<AnswerChoiceContainer key={this.props.answers[i]} uuid={this.props.answers[i]} exclusive={this.props.exclusive} withThumbnail={this.props.hasPictures}/>)
    }
    return <div>
      {answers}
      <div className="editor-col-md-1 module-accessible-block add-answer" onClick={e => {e.preventDefault();this.props.onAddAnswerClick()}}>
      + Add answer
      </div>    
    </div>;
  }
  
}
