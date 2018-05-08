import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
require('rc-slider/assets/index.css')

import Avatar from './avatar'
import Search from './search'
import SubMenu from './sub-menu'
import Slider from 'rc-slider'
import { Button, Grid, Header, Menu, Segment } from 'semantic-ui-react'

//============================================================================//
// A word about react-modal
//
// Modal's can't be called from anywhere using standard React. This means that
// a modal dialogue can only be embedded within a parent element which is whats
// happening in this module. As the Confirmation Modal is specific to this list,
// this is not really a big problem just a little icky from a coding style
// perpective.
//
// It will be a problem if we ever wanted to be invoke an "add a person"
// dialogue from within 2 or 3 different components.
//
// Therefore at some stage we'll need to consider refactoring modals using
// either Flux or Redux.
//
//============================================================================//

// Custom style for Modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const style = { fontSize: 20 }

// Marks for 
const marks = {
  1: {
    style: { fontSize: 20 },
    label: <strong>1</strong>,
  },
  2: {
    style: { fontSize: 20 },
    label: <strong>2</strong>,
  },
  3: {
    style: { fontSize: 20 },
    label: <strong>3</strong>,
  },
  4: {
    style: { fontSize: 20 },
    label: <strong>4</strong>,
  },
  5: {
    style: { fontSize: 20 },
    label: <strong>5</strong>,
  },
  6: {
    style: { fontSize: 20 },
    label: <strong>6</strong>
  }
}


class CheckInList extends React.Component {
  state = {
    modalIsOpen: false,
    _id: "",
    name: "",
    surname: "",
    avatar: "",
    hours: 2
  }

  // Modal handlers
  openModal = (person_id, name, surname, avatar) => {
    this.setState({ _id: person_id })
    this.setState({ name: name })
    this.setState({ surname: surname })
    this.setState({ avatar: avatar })
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  clickConfirm = (person_id, hours) => {
    this.props.recordAttendance(person_id, hours)
    this.closeModal()
  }

  handleInput = (v) => {
    console.log(v)
    this.setState({ hours: v })
  }

  render() {
    const isCheckedIn = false
    const { loading, ppl } = this.props;

    return (
      <Grid.Column width={12}>
        <SubMenu />
        <Header
          as='h2'
          content='Ready for Check In'
          textAlign='center'
        />

        <Grid stackable columns={4}>
          {
            loading &&
            <div>
              <p>Loading</p>
            </div>
          }
          {
            ppl.length === 0 &&
            <div>
              <p>No one to check in!</p>
              <Link className={'ui button'} to="/addvolunteer">Add new volunteer </Link>
            </div>
          }
          {
            ppl.length > 1 && ppl
              .map(({ _id, firstname, surname, avatar }) => (
                <Grid.Column
                  mobile={16}
                  tablet={8}
                  computer={4}
                  key={_id}
                  onClick={() => this.openModal(_id, firstname, surname, avatar)}
                >
                  <Avatar
                    _id={_id}
                    firstName={firstname}
                    lastName={surname}
                    isCheckedIn={isCheckedIn}
                    fileName={avatar}
                  />
                </Grid.Column>
              ))}
        </Grid>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="WTF"
        >
          <div>
            <Header
              divided
              as='h2'
              content='Checkin'
              textAlign='center'
            />
            <Avatar
              _id={this.state._id}
              firstName={this.state.name}
              lastName={this.state.surname}
              isCheckedIn={isCheckedIn}
              fileName={this.state.avatar}
            />
            <Segment padded='very'>
              <Header divided as='h3' content='How long will you be here for?' />
              <Slider
                min={1}
                max={6}
                step={1}
                marks={marks}
                defaultValue={this.state.hours}
                onChange={this.handleInput}
                dots
              />
            </Segment>
            <div>
              <Button onClick={this.closeModal}>
                Not Me!
              </Button>
              <Button
                color='green'
                onClick={() => this.clickConfirm(this.state._id, this.state.hours)}
              >
                Sign In
              </Button>
            </div>
          </div>
        </Modal>
      </Grid.Column>
    );
  }
}

CheckInList.propTypes = {
  loading: PropTypes.bool.isRequired,
  ppl: PropTypes.array.isRequired,
  recordAttendance: PropTypes.func.isRequired
}

export default CheckInList
