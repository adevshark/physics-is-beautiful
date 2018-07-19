import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'
import { ClassroomCard } from '../../components/ClassroomCard'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { EditClassroomView } from '../../containers/index'

import * as actionCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'

import { Route } from 'react-router'

class IndexView extends React.Component {
  // goToProtected () {
  //   this.props.dispatch(push('/protected'))
  // }

  componentWillMount () {
    this.props.classRoomActions.classroomFetchClassroomList()
  }

  render () {
    var createUrl = this.props.match.url.replace(/\/$/, '') + '/create'
    var editUrl = this.props.match.url.replace(/\/$/, '') + '/edit/:uuid/'

    return (
      <Sheet>
        <Tabs name='tab'
          className='tabs'
          handleSelect={this.props.actions.changeSelectedTab}
          selectedTab={this.props.tab}
        >
          <div className='tab-links'>
            <TabLink to='student'>Student</TabLink>
            <TabLink to='teacher'>Teacher</TabLink>
          </div>
          <div className='content'>
            <TabContent for='student'>
              student
            </TabContent>
            <TabContent for='teacher'>
              {this.props.location.pathname === '/classroom/'
                ? <div>
                  <h2>All classrooms</h2>
                  {this.props.classroomList ? <div>{ this.props.classroomList.map(function (classroom, i) {
                    return <ClassroomCard classroom={classroom} key={i} />
                  })}
                  <div style={{'clear': 'both'}}></div>
                  </div> : null }
                </div>
                : null
              }
              <Route path={createUrl} component={EditClassroomView} />
              <Route path={editUrl} component={EditClassroomView} />
              {this.props.location.pathname === '/classroom/' ? <div className={'create-classroom-button'}
                onClick={() => this.props.dispatch(push(createUrl))}>
                + Create classroom
              </div> : null}
            </TabContent>
          </div>
        </Tabs>
      </Sheet>
    )
  }
}

IndexView.propTypes = {
  actions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  classRoomActions: PropTypes.shape({
    classroomFetchClassroomList: PropTypes.func.isRequired
  }).isRequired,
  tab: PropTypes.string,
  classroomList: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    classroomList: state.classroom.classroomList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch),
    classRoomActions: bindActionCreators(classroomCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
