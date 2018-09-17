import React, { Component } from 'react'
import './ProjectCard.css'
import tags from '../constants/tags'

export default class ProjectCard extends Component {
  componentDidUpdate() {
    this.props.onRender(this.props.section, {
      id: this.props.propKey,
      card: `#card${this.props.section}${this.props.propKey}`,
      content: `#cardContent${this.props.section}${this.props.propKey}`,
      tags: `#cardTags${this.props.section}${this.props.propKey}`
    })
  }

  render() {
    return (
      <div id={`card${this.props.section}${this.props.propKey}`} className='project-card'>
        <div id={`cardContent${this.props.section}${this.props.propKey}`}>
          <div className='project-card-top'>
            <p>{this.props.data.role}</p>
            <a onClick={() => { this.props.onDetails(this.props.data) }}>Details</a>
            <div className='clear'></div>
          </div>
          <p className='project-card-title'><b>{this.props.data.name}</b></p>
          <p className='project-card-info'>{this.props.data.info}</p>
        </div>
        <div id={`cardTags${this.props.section}${this.props.propKey}`} className='project-card-tags'>
          {
            this.props.data.tags.map((tagKey, i) => {
              return <div key={i} className={`chip ${tags[tagKey].class}`}>{tags[tagKey].name}</div>
            })
          }
        </div>
      </div>
    )
  }
}
