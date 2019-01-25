import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as resourcesCreators from '../../actions/resources'

import {DockableDropTarget, DragItemTypes} from '../../dnd'

import { Grid, Row, Col, Image, Glyphicon } from 'react-bootstrap'

import Chapter from './Components/chapter'

class TextBookResourceView extends React.Component {
  constructor (props) {
    super(props)
    // enh copy resource from props to state to allow user modify
    this.state = {
      chapterEditModeId: null,
      resourceEditMode: false
    }

    this.addProblemClick = this.addProblemClick.bind(this)
    this.onChangeChapterValue = this.onChangeChapterValue.bind(this)
    this.onChangeProblemTitle = this.onChangeProblemTitle.bind(this)
  }

  // editChapterClick (id) {
  //   this.setState({
  //     chapterEditMode: id
  //   })
  // }

  editResourceClick () {
    this.setState({
      resourceEditMode: !this.state.resourceEditMode
    })
  }

  addChapterClick () {
    // this.props.resourcesActions.addProblem('Chapter ' + (this.props.resource.length + 1), this.props.resource)
  }

  addProblemClick (chapter) {
    this.setState({
      chapterEditModeId: null
    })
    // add problem to list
    this.props.resourcesActions.addProblem('' + (chapter.problems.length + 1), chapter, this.props.resource)
  }

  onChangeChapterValue (value, id) {
    // save chapter title
    let chapter = {id: id, title: value}
    this.props.resourcesActions.updateChapterReloadResource(chapter, this.props.resource)
  }

  onChangeProblemTitle (value, uuid) {
    // update problem title
    let problem = {uuid: uuid, title: value}
    this.props.resourcesActions.updateProblemReloadResource(problem, this.props.resource)
  }

  onChapterDroppedBefore (beforeChapter, chapter) {
    let updateChapter = {id: chapter.id}
    if (beforeChapter) {
      updateChapter['position'] = beforeChapter.position
    } else { // at the end of list
      // not so good if already reordered by another user (used in editor also)
      // var lastChapter = this.props.resource.sections[this.props.resource.sections.length - 1]
      // updateChapter['position'] = lastChapter.position + 1
      updateChapter['position'] = -1
    }

    this.props.resourcesActions.updateChapterReloadResource(updateChapter, this.props.resource)
  }

  render () {
    var isbn = null
    if (this.props.resource.metadata.data.volumeInfo.hasOwnProperty('industryIdentifiers')) {
      var isbnFound = this.props.resource.metadata.data.volumeInfo.industryIdentifiers.find(x => x.type === 'ISBN_13')
      if (isbnFound) {
        isbn = isbnFound.identifier
      }
    }

    return (
      <Grid fluid>
        <Row>
          <Col sm={12} md={12}>
            <h1 className={'blue-title text-align-center'}>
              {this.props.resource.metadata ? this.props.resource.metadata.data.volumeInfo.title : 'Unknown resource'}
              <span style={{position: 'relative', paddingLeft: '1rem'}}>
                <span className={'base-circle-edit'}>
                  [<span
                    onClick={() => this.editResourceClick()}
                    className={'blue-text'}
                    style={{cursor: 'pointer'}}
                  >
                    {this.state.resourceEditMode
                      ? 'View'
                      : 'Edit'}
                  </span>]
                </span>
              </span>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col sm={9} md={9}>
            {this.props.resource.sections ? this.props.resource.sections.map(function (chapter, i) { // ============ chapters
              return <Row key={chapter.id}>
                <Col sm={12} md={12}>
                  <DockableDropTarget
                    key={chapter.id}
                    onDrop={(droppedChapter) => { this.onChapterDroppedBefore(chapter, droppedChapter) }}
                    itemType={DragItemTypes.CHAPTER}
                    self={chapter}>
                    <Chapter
                      chapter={chapter}
                      chapterEditModeId={this.state.chapterEditModeId}
                      onChangeProblemTitle={this.onChangeProblemTitle}
                      onChangeChapterValue={this.onChangeChapterValue}
                      resourceEditMode={this.state.resourceEditMode}
                      addProblemClick={this.addProblemClick}
                      resource={this.props.resource}
                    />
                  </DockableDropTarget>
                </Col>
              </Row>
            }, this)
              : null
            }
            {this.state.resourceEditMode
              ? <DockableDropTarget
                onDrop={(droppedChapter) => { this.onChapterDroppedBefore(null, droppedChapter) }}
                itemType={DragItemTypes.CHAPTER}
                self={null}
              >
                <div // Add chapter button
                  style={{cursor: 'pointer'}}
                  onClick={() => this.addChapterClick()}
                  className={'blue-text'}>
                  <Glyphicon glyph='plus' /> Add chapter
                </div>
              </DockableDropTarget> : null
            }
          </Col>
          <Col sm={3} md={3}>
            <div
              style={{paddingBottom: '1rem',
                fontSize: '20rem',
                overflow: 'hidden',
                textAlign: 'center'}}>
              { this.props.resource.metadata &&
              this.props.resource.metadata.data.volumeInfo.hasOwnProperty('imageLinks') &&
              this.props.resource.metadata.data.volumeInfo.imageLinks.thumbnail
                ? <Image src={this.props.resource.metadata.data.volumeInfo.imageLinks.thumbnail} />
                : <Glyphicon glyph='picture' /> }
            </div>
            { this.props.resource.metadata
              ? <div style={{backgroundColor: '#EDEDED', padding: '1rem'}}>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Author:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('authors')
                      ? <div>{this.props.resource.metadata.data.volumeInfo.authors.map(function (author, i) {
                        return <span key={author} style={{paddingRight: '1rem'}}>
                          {author}
                          {this.props.resource.metadata.data.volumeInfo.authors.length - 1 !== i ? ',' : null}
                        </span>
                      }, this)}</div> : null
                    }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Language:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('language')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.language }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Published:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('publishedDate')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.publishedDate }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Publisher:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('publisher')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.publisher }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>ISBN:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { isbn }
                  </Col>
                </Row>
              </div> : 'Book data not found'}
          </Col>
        </Row>
      </Grid>
    )
  }
}

TextBookResourceView.propTypes = {
  // actions
  resourcesActions: PropTypes.shape({
    addProblem: PropTypes.func.isRequired,
    updateProblemReloadResource: PropTypes.func.isRequired,
    updateChapterReloadResource: PropTypes.func.isRequired
  }),
  // data
  resource: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    resource: state.resources.resource
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookResourceView)
export { TextBookResourceView as TextBookResourceViewNotConnected }
