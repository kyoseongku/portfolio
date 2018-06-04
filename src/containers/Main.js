import React, { Component } from 'react'
import './Main.css'
import ProjectCard from '../components/ProjectCard'
import ProjectDescModal from '../components/ProjectDescModal'
import supercare from '../constants/supercare'
import personal from '../constants/personal'



export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      window: { h: 0, w: 0 },
      sectionTriggers: {
        work: Number.POSITIVE_INFINITY,
        projects: Number.POSITIVE_INFINITY,
        school: Number.POSITIVE_INFINITY,
        me: Number.POSITIVE_INFINITY
      },
      iconAnimDidPlay: {
        work: false,
        projects: false,
        school: false,
        me: false
      },
      projDescModalData: {}
    }

    this._sch = {
      cardSelectors: []
    }
    this._pers = {
      cardSelectors: []
    }

    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.updateCardSelectors = this.updateCardSelectors.bind(this)
    this.resizeCardHeights = this.resizeCardHeights.bind(this)
    this.onProjDescModalOpen = this.onProjDescModalOpen.bind(this)
    this.onProjDescModalClose = this.onProjDescModalClose.bind(this)
  }



  componentDidMount() {
    while(!window.M); // Wait

    window.M.Modal.init(document.querySelectorAll('.modal'))

    setTimeout(() => {
      document.querySelector('.section-greeting h2').classList.add('animated')
      document.querySelector('.section-greeting h2').classList.add('wobble')
    }, 500)


    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }



  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }



  handleResize() {
    let newState

    if(window.innerHeight !== this.state.window.h || window.innerWidth !== this.state.window.w) {
      let lightSections = document.getElementsByClassName('section-light')
      let darkSections = document.getElementsByClassName('section-dark')
      for(let section of lightSections)
        section.style.minHeight = window.innerHeight+'px'
      for(let section of darkSections)
        section.style.minHeight = window.innerHeight+'px'

      let meLeft = document.querySelector('.me-left')
      let meRight = document.querySelector('.me-img')
      meRight.style.height = meLeft.offsetHeight+'px'

      let greetingSection = document.querySelector('.section-greeting')
      let greetingWords = document.querySelector('.section-greeting .container')
      greetingSection.style.paddingTop = ((window.innerHeight-greetingWords.offsetHeight)/2)+'px'

      let sectionWorkH = document.querySelector('.sectionWork').offsetHeight
      let sectionProjH = document.querySelector('.sectionProjects').offsetHeight
      let sectionSchoolH = document.querySelector('.sectionSchool').offsetHeight

      let sectionTriggers = {}
      sectionTriggers.work = window.innerHeight
      sectionTriggers.projects = sectionTriggers.work+sectionWorkH
      sectionTriggers.school = sectionTriggers.projects+sectionProjH
      sectionTriggers.me = sectionTriggers.school+sectionSchoolH

      newState = {
        sectionTriggers,
        window: {
          h: window.innerHeight,
          w: window.innerWidth
        }
      }

      // Reset
      if(this._sch.cardSelectors.length === supercare.length) {
        this._sch.cardSelectors.forEach(sel => {
          let tags = document.querySelector(sel.tags)
          tags.style.marginTop = '15px' // Default in ProjectCard.css
        })
      }
      if(this._pers.cardSelectors.length === personal.length) {
        this._pers.cardSelectors.forEach(sel => {
          let tags = document.querySelector(sel.tags)
          tags.style.marginTop = '15px' // Default in ProjectCard.css
        })
      }
    }

    if(newState) {
      this.setState(newState, () => {
        if(this._sch.cardSelectors.length === supercare.length)
          this.resizeCardHeights(this._sch.cardSelectors)
        if(this._pers.cardSelectors.length === personal.length)
          this.resizeCardHeights(this._pers.cardSelectors)
      })
    }
  }



  handleScroll() {
    let triggerOffset = 0.3*this.state.window.h
    if(!this.state.iconAnimDidPlay.work && window.scrollY > this.state.sectionTriggers.work-triggerOffset) {
      this.setState({
        iconAnimDidPlay: Object.assign(this.state.iconAnimDidPlay, { work: true })
      }, () => {
        document.querySelector('.section-work-header i').classList.add('animated')
        document.querySelector('.section-work-header i').classList.add('swing')
      })
    } else if(!this.state.iconAnimDidPlay.projects && window.scrollY > this.state.sectionTriggers.projects-triggerOffset) {
      this.setState({
        iconAnimDidPlay: Object.assign(this.state.iconAnimDidPlay, { projects: true })
      }, () => {
        document.querySelector('.section-projects-header i').classList.add('animated')
        document.querySelector('.section-projects-header i').classList.add('hinge')
      })
    } else if(!this.state.iconAnimDidPlay.school && window.scrollY > this.state.sectionTriggers.school-triggerOffset) {
      this.setState({
        iconAnimDidPlay: Object.assign(this.state.iconAnimDidPlay, { school: true })
      }, () => {
        document.querySelector('.section-school-header i').classList.add('animated')
        document.querySelector('.section-school-header i').classList.add('tada')
      })
    } else if(!this.state.iconAnimDidPlay.me && window.scrollY > this.state.sectionTriggers.me-triggerOffset) {
      this.setState({
        iconAnimDidPlay: Object.assign(this.state.iconAnimDidPlay, { me: true })
      }, () => {
        document.querySelector('.section-me-header i').classList.add('animated')
        document.querySelector('.section-me-header i').classList.add('flip')
      })
    }
  }



  updateCardSelectors(section, selectors) {
    if(section === 'sch')
      this._sch.cardSelectors[selectors.id] = selectors
    else if(section === 'pers')
      this._pers.cardSelectors[selectors.id] = selectors
  }



  resizeCardHeights(selectors) {
    // Ignore if mobile screen
    if(this.state.window.w < 601)
      return

    let maxCardH = 0

    selectors.forEach(sel => {
      let card = document.querySelector(sel.card)
      maxCardH = Math.max(card.clientHeight, maxCardH)
    })

    selectors.forEach(sel => {
      let card = document.querySelector(sel.card)
      let content = document.querySelector(sel.content)
      let tags = document.querySelector(sel.tags)

      if(card.clientHeight === maxCardH)
        return

      // -30 for padding in ProjectCard.css
      let availH = maxCardH-30-content.offsetHeight-tags.offsetHeight
      tags.style.marginTop = availH+'px'
    })

    let sectionWorkH = document.querySelector('.sectionWork').offsetHeight
    let sectionProjH = document.querySelector('.sectionProjects').offsetHeight
    let sectionSchoolH = document.querySelector('.sectionSchool').offsetHeight
    let sectionTriggers = {}
    sectionTriggers.work = this.state.window.h
    sectionTriggers.projects = sectionTriggers.work+sectionWorkH
    sectionTriggers.school = sectionTriggers.projects+sectionProjH
    sectionTriggers.me = sectionTriggers.school+sectionSchoolH
    this.setState({ sectionTriggers })
  }



  onProjDescModalOpen(data) {
    this.setState({
      projDescModalData: data
    }, () => {
      let modal = window.M.Modal.getInstance(document.querySelector('#projectDescModal'))
      modal.open()
    })
  }



  onProjDescModalClose() {
    let modal = window.M.Modal.getInstance(document.querySelector('#projectDescModal'))
    modal.close()
  }



  render() {
    return (
      <div>
        <div className='section-dark section-greeting'>
          <div className='container'>
            <h2 className='light'>hello</h2>
            <h5 className='light'>I'm Kyoseong (Austin), and I like to build things</h5>
          </div>
        </div>
        <div className='section-light sectionWork'>
          <div className='container'>
            <div className='section-work-header'>
              <i className='material-icons medium brown-text'>card_travel</i>
              <h4 className='light'>work experience</h4>
            </div>
            <div className='row'>
              <div className='col s12 m6 l6'>
                <div className='center sch-col'>
                  <img className='responsive-img' src='/static/img/logo_sch.png' alt='SuperCare Health logo'/>
                  <p>Feb. 2017 - Present</p>
                  <p>Software Developer</p>
                </div>
              </div>
              <div className='col s12 m6 l6'>
                <div className='sch-col'>
                  <p><b>Designed and developed</b> various projects off of loose requirements and added features to existing code base.</p>
                  <p><b>Provided documentation</b> including versioning, notes for users, notes for developers, API reference, and more.</p>
                  <p><b>Wrote automated tests</b> as well as interactive CLI manual tests for simulating human interactions.</p>
                </div>
              </div>
            </div>
            <div className='row'>
              {
                supercare.map((project, i) => {
                  return (
                    <div key={i} className='col s12 m6 l6'>
                      <ProjectCard
                        propKey={i}
                        section={'sch'}
                        data={project}
                        onRender={this.updateCardSelectors}
                        onDetails={this.onProjDescModalOpen}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='section-dark sectionProjects'>
          <div className='container'>
            <div className='section-projects-header'>
              <i className='material-icons medium blue-grey-text text-lighten-3'>build</i>
              <h4 className='light'>personal projects</h4>
            </div>
            <div className='pad'/>
            <div className='row'>
              {
                personal.map((project, i) => {
                  return (
                    <div key={i} className='col s12 m6 l6'>
                      <ProjectCard
                        propKey={i}
                        section={'pers'}
                        data={project}
                        onRender={this.updateCardSelectors}
                        onDetails={this.onProjDescModalOpen}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='section-light sectionSchool'>
          <div className='container'>
            <div className='section-school-header'>
              <i className='material-icons medium blue-text'>school</i>
              <h4 className='light'>education</h4>
            </div>
            <div className='row'>
              <div className='col s12 m6 l6'>
                <div className='school-col'>
                  <img className='responsive-img' src='/static/img/logo_ucla.png' alt='UCLA logo'/>
                  <h5 className='light'>Computer Science, B.S.</h5>
                  <p><b>University of California, Los Angeles</b></p>
                  <p>Graduated Dec. 2015</p>
                </div>
              </div>
              <div className='col s12 m6 l6'>
                <div className='school-courses'>
                  <div className='school-col'>
                    <h5 className='light'>Relevant coursework</h5>
                  </div>
                  <p>&nbsp;</p>
                  <p>Algorithms &amp; Complexity</p>
                  <p>Artificial Intelligence</p>
                  <p>Computer Graphics</p>
                  <p>Database Systems</p>
                  <p>Data Structures</p>
                  <p>Formal Languages &amp; Automata Theory</p>
                  <p>Machine Architecture</p>
                  <p>Network Fundamentals</p>
                  <p>Object-oriented Programming</p>
                  <p>Operating Systems</p>
                  <p>Programming Languages</p>
                  <p>Software Engineering</p>
                  <p>Web Applications</p>
                  <p>---</p>
                  <p>Entrepreneurship for Engineers</p>
                  <p>Finance and Marketing for Engineers</p>
                  <p>Systems Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='section-dark sectionMe'>
          <div className='container'>
            <div className='section-me-header'>
              <i className='material-icons medium amber-text'>perm_identity</i>
              <h4 className='light'>me</h4>
            </div>
            <div className='row'>
              <div className='col s12 m6 l6 me-left'>
                <div className='desc-block'>
                  <p className='center'><b>Typical stack</b></p>
                  <p className='desc-left'>Front-end:</p>
                  <p className='desc-right'>Material design</p>
                  <p className='desc-right'>React + Router + Redux</p>
                  <p className='desc-left'>Back-end:</p>
                  <p className='desc-right'>Node (ES6) or Go</p>
                  <p className='desc-right'>AWS Linux EC2 or S3 + Lambda</p>
                  <p className='desc-right'>AWS DynamoDB or MongoDB</p>
                </div>
                <div className='desc-block'>
                  <p className='center'><b>Other languages (schoolwork)</b></p>
                  <p className='desc-left'>Heavy usage:</p>
                  <p className='desc-right'>C, C++, Java</p>
                  <p className='desc-left'>Light usage:</p>
                  <p className='desc-right'>Assembly, Lisp, MySQL, OCaml, PHP, Python</p>
                </div>
                <div className='full-width-btn'>
                  <a className='btn-large blue' href='https://github.com/kyoseongku'>GitHub</a>
                </div>
                <div className='full-width-btn'>
                  <a className='btn-large amber' href='/static/resume-kyoseong_ku.pdf'>Resume (outdated)</a>
                </div>
                <p className='center'>No 3rd party recruiters please</p>
              </div>
              <div className='col s12 m6 l6'>
                <div className='me-img'>
                  <img className='responsive-img' src='/static/img/me.jpg' alt='Pic of me'/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectDescModal data={this.state.projDescModalData} onClose={this.onProjDescModalClose}/>
      </div>
    )
  }
}
