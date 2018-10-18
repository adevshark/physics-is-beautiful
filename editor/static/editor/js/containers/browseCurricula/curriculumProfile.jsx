import React from 'react'

import { connect } from 'react-redux'

import { Image as ImageBs, Grid, Row, Col, Glyphicon, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap'
import Moment from 'react-moment'

import PropTypes from 'prop-types'
import {
  loadCurriculumIfNeeded
} from '../../actions'
import { history } from '../../history'

class CurriculumProfileView extends React.Component {
  constructor (props) {
    super(props)
    this.startCurriculum = this.startCurriculum.bind(this)
  }

  componentDidMount () {
    this.props.loadCurriculum(this.props.match.params.uuid)
  }

  startCurriculum () {
    window.open('/curriculum/' + this.props.match.params.uuid + '/', '_blank')
  }

  render () {
    var selectedCurriculum = this.props.curricula[this.props.match.params.uuid]
    if (!selectedCurriculum) return null

    return (
      <div className={'container section-sheet'}>
        <div className={'pop-up-window'}>
          <a className={'back-button'} onClick={() => { history.push('/browse/') }} >
            <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
            Curricula
          </a>
          <div className={'selectable-image'} style={{height: '100%'}}>
            { selectedCurriculum
              ? <Grid fluid>
                <Row style={{padding: 0}}>
                  <Col sm={12} md={12}
                    style={{
                      padding: 0,
                      paddingTop: '37%',
                      width: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#12adf4'}} >
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        right: '0'}}
                    >
                      <div style={{position: selectedCurriculum.cover_photo ? 'relative' : ''}}>
                        <div>{ selectedCurriculum.cover_photo
                          ? <ImageBs src={selectedCurriculum.cover_photo} responsive />
                          : <div style={{ height: '100%', width: '100%' }} /> }
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row style={{padding: 0}}>
                  <Col sm={2} md={2} style={{padding: 0}}>
                    <div style={{minHeight: '10rem'}}>
                      { selectedCurriculum.image ? <ImageBs
                        src={selectedCurriculum.image}
                        responsive
                      /> : null }
                    </div>
                  </Col>
                  <Col sm={7} md={7}>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div className={'blue-title'}>
                          {selectedCurriculum.name}
                        </div>
                      </Col>
                    </Row>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div style={{fontSize: '2rem'}}>
                          { selectedCurriculum.author.display_name }
                          ∙ { selectedCurriculum.count_lessons } lessons
                          ∙ { selectedCurriculum.number_of_learners } learners
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12}>
                        <div style={{color: 'gray'}}>
                          Created <Moment fromNow>{selectedCurriculum.created_on}</Moment>
                          ∙ Last updated <Moment fromNow>{selectedCurriculum.updated_on}</Moment>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={3} md={3}>
                    <button className={'editor-common-button'} onClick={this.startCurriculum}>Start Curriculum</button>
                  </Col>
                </Row>
                <Row style={{padding: '2rem'}}>
                  <Col sm={12} md={12}>
                    {selectedCurriculum.description}
                  </Col>
                </Row>
              </Grid> : null }
          </div>
        </div>
      </div>
    )
  }
}

CurriculumProfileView.propTypes = {
  loadCurriculum: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    curricula: state.curricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadCurriculum: (uuid) => dispatch(loadCurriculumIfNeeded(uuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurriculumProfileView)
export { CurriculumProfileView as CurriculumProfileViewNotConnected }
