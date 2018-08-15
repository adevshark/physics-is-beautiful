import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Image} from 'react-bootstrap'

export class AssignmentStudentRow extends React.Component {
  render () {
    var className = 'student-classroom-row'

    var textColorClassName = 'green-text'
    if (!this.props.assignment.completed_on) {
      if (new Date(this.props.assignment.due_on) < new Date()) {
        textColorClassName = 'red-text'
      } else {
        textColorClassName = 'gray-text'
      }
      var dueDateTime = new Date(this.props.assignment.due_on).toLocaleDateString() + ' ' + new Date(this.props.assignment.due_on).toLocaleTimeString()
    }

    return (
      <Row className={className}>
        <Col sm={1} md={1}>
          <div className={'gray-text small-text'}>
          {/*image*/}
          </div>
        </Col>
        <Col sm={4} md={4}>
          { !this.props.isTeacher && textColorClassName !== 'gray-text' // TODO check start date
            ? <div className={'blue-title'}>{this.props.assignment.name}</div>
            : <div className={'blue-title pointer'} onClick={this.props.onTitleClick}>{this.props.assignment.name}</div>
          }
          <div className={'gray-text small-text'}>{this.props.assignment.count_lessons} lesson{this.props.assignment.count_lessons > 1 ? 's' : null}</div>
        </Col>
        <Col sm={4} md={4} className={'vcenter'}>
          { this.props.assignment.completed_on ? <div className={textColorClassName}>Completed</div> : <div>
            {new Date(this.props.assignment.due_on) > new Date() ? <div className={textColorClassName}>Due:&nbsp;{dueDateTime}</div> : null }
            {new Date(this.props.assignment.due_on) < new Date() ? <div className={textColorClassName}>Past due:&nbsp;{dueDateTime}</div> : null }
          </div> }

        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          <div className={textColorClassName}>
            {this.props.assignment.count_completed_lessons} / {this.props.assignment.count_lessons}
          </div>
        </Col>
        <Col sm={1} md={1} className={'vcenter'}>
          { textColorClassName === 'green-text'
            ? <span className='glyphicon glyphicon-ok-sign' style={{color: 'green', fontSize: '3rem'}} /> : null }
          { textColorClassName === 'red-text'
            ? <span className='glyphicon glyphicon-exclamation-sign' style={{color: 'red', fontSize: '3rem'}} /> : null }
        </Col>
      </Row>
    )
  }
}

AssignmentStudentRow.propTypes = {
  assignment: PropTypes.object.isRequired,
  onTitleClick: PropTypes.func,
  isTeacher: PropTypes.bool.isRequired
}