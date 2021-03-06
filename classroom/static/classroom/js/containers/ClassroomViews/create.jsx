import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import history from '../../history'

import { PopupWindow } from '../../components/PopupWindow'

import SelectCurriculum from '../../components/SelectCurriculum'

import * as classroomCreators from '../../actions/classroom'
import * as tabCreators from '../../actions/tab'

class CreateClassroomView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classroomFormValues: {
        name: '',
        curriculum_uuid: ''
      },
      classroomFormIsValid: false
    }
    this.handleClassroomFormChange = this.handleClassroomFormChange.bind(this)
    this.selectedCurriculumChanged = this.selectedCurriculumChanged.bind(this)
    this.saveClassroom = this.saveClassroom.bind(this)
  }

  componentWillMount () {
    // select teacher tab by default
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)

    if (this.props.match.params && this.props.match.params['uuid']) {
      // load classroom if unavailable
      if (!this.props.classroomTeacher) {
        this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
      }
    } else {
      // new class room
      this.props.classroomActions.classroomEraseTeacherClassroom()
    }
  }

  componentWillReceiveProps (props) {
    if (props.classroomTeacher) {
      this.setState(
        { classroomFormValues: {
          name: props.classroomTeacher.name,
          curriculum_uuid: props.classroomTeacher.curriculum.uuid
        }},
        this.validateClassroomForm
      )
    }
  }

  handleClassroomFormChange (e) {
    let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
    classroomFormValues[e.target.name] = e.target.value
    this.setState(
      {classroomFormValues},
      this.validateClassroomForm
    )
  }

  selectedCurriculumChanged (curriculum) {
    let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
    classroomFormValues['curriculum_uuid'] = curriculum.uuid
    this.setState(
      {classroomFormValues},
      this.validateClassroomForm
    )
  }

  validateClassroomForm () {
    if (this.state.classroomFormValues &&
      this.state.classroomFormValues.name &&
      this.state.classroomFormValues.curriculum_uuid) {
      this.setState({'classroomFormIsValid': true})
    } else {
      this.setState({'classroomFormIsValid': false})
    }
  }

  saveClassroom (e) {
    e.preventDefault()
    if (this.state.classroomFormIsValid) {
      if (!this.props.classroomTeacher) {
        // save
        this.props.classroomActions.classroomCreateClassroom(this.state.classroomFormValues, true, null, true)
      } else {
        // update
        this.props.classroomActions.classroomPartialUpdateTeacherClassroom(
          Object.assign({}, this.state.classroomFormValues, { uuid: this.props.classroomTeacher.uuid }),
          true
        )
      }
    }
  }

  render () {
    return (
      <PopupWindow goBack={history.goBack}>
        <form onSubmit={this.saveClassroom}>
          <div style={{paddingTop: '2rem'}}>Name of your classroom:</div>
          <div>
            <input
              type='text' name='name'
              className={'form-control'}
              value={this.state.classroomFormValues ? this.state.classroomFormValues.name : ''}
              onChange={this.handleClassroomFormChange} />
          </div>
          <br />
          <SelectCurriculum
            selectedCurriculumChanged={this.selectedCurriculumChanged}
            selectedUuid={this.state.classroomFormValues.curriculum_uuid} />
          <button disabled={!this.state.classroomFormIsValid}
            className={'classroom-common-button float-right' + (this.state.classroomFormIsValid ? '' : ' disabled-button')}
            type='submit'>
            {this.props.classroomTeacher ? 'Save classroom' : 'Create classroom'}
          </button>
          <div style={{'clear': 'both'}}></div>
        </form>
      </PopupWindow>
    )
  }
}

CreateClassroomView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  classroomActions: PropTypes.shape({
    classroomCreateClassroom: PropTypes.func.isRequired,
    classroomFetchTeacherClassroom: PropTypes.func.isRequired,
    classroomEraseTeacherClassroom: PropTypes.func.isRequired,
    classroomPartialUpdateTeacherClassroom: PropTypes.func.isRequired
  }).isRequired,
  classroomTeacher: PropTypes.object
}
CreateClassroomView.defaultProps = {
}

const mapStateToProps = (state) => {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    tabActions: bindActionCreators(tabCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassroomView)
export { CreateClassroomView as CreateClassroomViewNotConnected }

// !=================== backup =======================
// import React from 'react'
//
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
//
// import history from '../../history'
//
// import { PopupWindow } from '../../components/PopupWindow'
// import { CurriculumRow } from '../../components/CurriculumRow'
//
// import * as classroomCreators from '../../actions/classroom'
// import * as tabCreators from '../../actions/tab'
// import * as curriculaCreators from '../../actions/curricula'
//
// class CreateClassroomView extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       classroomFormValues: {
//         name: '',
//         curriculum_uuid: ''
//       },
//       classroomFormIsValid: false
//     }
//     this.handleClassroomFormChange = this.handleClassroomFormChange.bind(this)
//     this.saveClassroom = this.saveClassroom.bind(this)
//   }
//
//   componentWillMount () {
//     // load curricula
//     this.props.curriculaActions.curriculaFetchCurriculaList()
//     // load other curricula
//     this.props.curriculaActions.curriculaFetchOtherCurriculaList()
//     // select teacher tab by default
//     this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
//
//     if (this.props.match.params && this.props.match.params['uuid']) {
//       // load classroom if unavailable
//       if (!this.props.classroomTeacher) {
//         this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
//       }
//     } else {
//       // new class room
//       this.props.classroomActions.classroomEraseTeacherClassroom()
//     }
//   }
//
//   componentWillReceiveProps (props) {
//     if (props.classroomTeacher) {
//       this.setState(
//         { classroomFormValues: {
//           name: props.classroomTeacher.name,
//           curriculum_uuid: props.classroomTeacher.curriculum.uuid
//         }},
//         this.validateClassroomForm
//       )
//     }
//   }
//
//   handleClassroomFormChange (e) {
//     let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
//     classroomFormValues[e.target.name] = e.target.value
//     this.setState(
//       {classroomFormValues},
//       this.validateClassroomForm
//     )
//   }
//
//   selectCurriculum (curriculum) {
//     let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
//     classroomFormValues['curriculum_uuid'] = curriculum.uuid
//     this.setState(
//       {classroomFormValues},
//       this.validateClassroomForm
//     )
//   }
//
//   validateClassroomForm () {
//     if (this.state.classroomFormValues &&
//       this.state.classroomFormValues.name &&
//       this.state.classroomFormValues.curriculum_uuid) {
//       this.setState({'classroomFormIsValid': true})
//     } else {
//       this.setState({'classroomFormIsValid': false})
//     }
//   }
//
//   saveClassroom (e) {
//     e.preventDefault()
//     if (this.state.classroomFormIsValid) {
//       if (!this.props.classroomTeacher) {
//         // save
//         this.props.classroomActions.classroomCreateClassroom(this.state.classroomFormValues)
//       } else {
//         // update
//         this.props.classroomActions.classroomPartialUpdateTeacherClassroom(
//           Object.assign({}, this.state.classroomFormValues, { uuid: this.props.classroomTeacher.uuid }),
//           true
//         )
//       }
//     }
//   }
//
//   render () {
//     return (
//       <PopupWindow goBack={history.goBack}>
//         <form onSubmit={this.saveClassroom}>
//           <div style={{paddingTop: '2rem'}}>Name of your classroom:</div>
//           <div>
//             <input
//               type='text' name='name'
//               className={'form-control'}
//               value={this.state.classroomFormValues ? this.state.classroomFormValues.name : ''}
//               onChange={this.handleClassroomFormChange} />
//           </div>
//           <br />
//           <div>Select curriculum:</div>
//           <div style={{color: 'rgb(8, 209, 255)'}}>My curricula</div>
//           {this.props.curriculaList ? <div>{ this.props.curriculaList.map(function (curriculum, i) {
//             return <div key={i} onClick={() => { this.selectCurriculum(curriculum) }}>
//               <CurriculumRow curriculum={curriculum} selectedUuid={this.state.classroomFormValues.curriculum_uuid} />
//             </div>
//           }, this)}
//           </div> : null }
//           <div className={'create-curriculum-button curriculum-card'} onClick={() => { window.open('/editor/', '_blank') }}>+ Create new curriculum</div>
//           <div className={'blue-text'}>Physics is Beautiful curricula:</div>
//           {this.props.curriculaOtherList ? <div>{ this.props.curriculaOtherList.map(function (curriculum, i) {
//             return <div key={i} onClick={() => { this.selectCurriculum(curriculum) }}>
//               <CurriculumRow curriculum={curriculum} selectedUuid={this.state.classroomFormValues.curriculum_uuid} />
//             </div>
//           }, this)}
//           </div> : null }
//           <div className={'gray-text pointer'} onClick={() => { window.open('/editor/', '_blank') }}>Browse other curricula</div>
//           <button disabled={!this.state.classroomFormIsValid}
//             className={'classroom-common-button float-right' + (this.state.classroomFormIsValid ? '' : ' disabled-button')}
//             type='submit'>
//             {this.props.classroomTeacher ? 'Save classroom' : 'Create classroom'}
//           </button>
//           <div style={{'clear': 'both'}}></div>
//         </form>
//       </PopupWindow>
//     )
//   }
// }
//
// CreateClassroomView.propTypes = {
//   tabActions: PropTypes.shape({
//     changeSelectedTab: PropTypes.func.isRequired
//   }).isRequired,
//   curriculaActions: PropTypes.shape({
//     curriculaFetchCurriculaList: PropTypes.func.isRequired,
//     curriculaFetchOtherCurriculaList: PropTypes.func.isRequired
//   }).isRequired,
//   classroomActions: PropTypes.shape({
//     classroomCreateClassroom: PropTypes.func.isRequired,
//     classroomFetchTeacherClassroom: PropTypes.func.isRequired,
//     classroomEraseTeacherClassroom: PropTypes.func.isRequired,
//     classroomPartialUpdateTeacherClassroom: PropTypes.func.isRequired
//   }).isRequired,
//   curriculaList: PropTypes.array,
//   curriculaOtherList: PropTypes.array,
//   classroomTeacher: PropTypes.object
// }
// CreateClassroomView.defaultProps = {
//   // statusText: '',
//   // userName: ''
// }
//
// const mapStateToProps = (state) => {
//   return {
//     // tab: state.tab.tab
//     curriculaList: state.curricula.curriculaList,
//     curriculaOtherList: state.curricula.curriculaOtherList,
//     classroomTeacher: state.classroom.classroomTeacherClassroom
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     classroomActions: bindActionCreators(classroomCreators, dispatch),
//     tabActions: bindActionCreators(tabCreators, dispatch),
//     curriculaActions: bindActionCreators(curriculaCreators, dispatch)
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(CreateClassroomView)
// export { CreateClassroomView as CreateClassroomViewNotConnected }
