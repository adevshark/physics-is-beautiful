import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

export class StudentClassroomRow extends React.Component {
  render () {
    var className = 'student-classroom-row'

    return (
      <div className={className}>
        <Row>
          <Col sm={10} md={10}>
            <span
              onClick={() => this.props.onAssignmentsClick(this.props.baseUrl + '/' + this.props.classroom.uuid + '/')}
              className={'blue-title pointer'}>{this.props.classroom.name}
            </span>
          </Col>
          <Col sm={2} md={2}>
            <span onClick={() => this.props.onAssignmentsClick(this.props.baseUrl +
              '/' + this.props.classroom.uuid + '/')} className={'pib-link'}>Assignments</span>
          </Col>
        </Row>
      </div>
    )
  }
}

StudentClassroomRow.propTypes = {
  classroom: PropTypes.object,
  baseUrl: PropTypes.string.isRequired,
  onAssignmentsClick: PropTypes.func.isRequired
}
