import React from 'react';

import {Thumbnail} from './thumbnail';

import { DragSource } from 'react-dnd';

import {DragItemTypes} from '../dnd';

export const dragSource = {
  beginDrag(props) {
    return {uuid:props.uuid};
  }
}


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview : connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}


class QuestionThumbnail extends React.Component {
  render() {
    return this.props.connectDragPreview(
      <div className={'question-thumbnail draggable' + (this.props.selected ? ' selected':'')} style={{display: this.props.isDragging ? 'none' : 'inline-block'}}
           onClick={this.props.onClick}>
        {this.props.connectDragSource(<span className="drag-handle"/>)}
        <span>{this.props.shortText}</span>
      </div>)    
  }
}

QuestionThumbnail = DragSource(DragItemTypes.QUESTION, dragSource, collect)(QuestionThumbnail)

export {QuestionThumbnail}