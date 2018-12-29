import React from 'react'

import PropTypes from 'prop-types'

import Moment from 'react-moment'

import { Glyphicon, Grid, Row, Col, FormControl, Checkbox, Form, Button } from 'react-bootstrap'

import { ReplyForm } from './replyForm'

export class Post extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      replyFormShow: false
    }

    this.onSubmitReplay = this.onSubmitReplay.bind(this)
    this.toggleReplyForm = this.toggleReplyForm.bind(this)
    this.upDownClick = this.upDownClick.bind(this)
  }

  onSubmitReplay (...args) {
    this.props.onSubmitReplay(...args)
    this.toggleReplyForm()
  }

  toggleReplyForm () {
    this.setState({ replyFormShow: !this.state.replyFormShow })
  }

  upDownClick (value) {
    this.props.changePostVote(this.props.post, value)
  }

  render () {
    return (
      <div>
        { this.props.post
          ? <Grid fluid style={{padding: 0}}>
            <Row>
              <Col sm={1} md={1} xs={1} style={{padding: 0, width: 'fit-content'}}>
                <div className={'text-align-center'}>
                  <div>
                    <Glyphicon
                      glyph='arrow-up'
                      style={{cursor: 'pointer'}}
                      onClick={() => this.upDownClick(1)} />
                  </div>
                  <div>
                    {this.props.post.score}
                  </div>
                  <div>
                    <Glyphicon
                      glyph='arrow-down'
                      style={{cursor: 'pointer'}}
                      onClick={() => this.upDownClick(-1)} />
                  </div>
                </div>
              </Col>
              <Col sm={11} md={11}>
                <Row className={'gray-text'}>
                  <Col md={1} sm={2} xs={4}>
                    {this.props.post.created_by
                      ? <a href={this.props.post.created_by.get_absolute_url} target={'_blank'}>
                        {this.props.post.created_by.display_name}
                      </a> : 'Guest'
                    }
                  </Col>
                  <Col md={2} sm={3} xs={3}>
                    <Moment fromNow>{this.props.post.created_on}</Moment>
                  </Col>
                  <Col md={2} sm={3} xs={4}>
                    {this.props.post.modified_on !== this.props.post.created_on
                      ? <span>edited <Moment fromNow>{this.props.post.modified_on}</Moment></span>
                      : null
                    }
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12}>
                    { this.props.post.content }
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12}>
                    <span className='pib-link' onClick={this.toggleReplyForm}>Reply</span>
                    &nbsp;
                    <span className='pib-link' onClick={this.toggleReplyForm}>Share</span>
                    {/*/ec744tb*/}
                    {/*<button>Report</button>*/}
                    {/*<button>Save</button>*/}
                  </Col>
                </Row>
                {this.state.replyFormShow
                  ? <ReplyForm
                    parentPost={this.props.post}
                    currentProfile={this.props.currentProfile}
                    onSubmitPost={this.onSubmitReplay}
                    onToggleForm={this.toggleReplyForm}
                  /> : null
                }
              </Col>
            </Row>
          </Grid> : null }
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onSubmitReplay: PropTypes.func.isRequired,
  currentProfile: PropTypes.object.isRequired,
  changePostVote: PropTypes.func.isRequired
}
