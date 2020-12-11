import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../ui/button';
import { saveProfile } from '../user/api/actions';
import { changeEditMode } from '../user/api/actions';
import Availability from '../availability/Availability';
import { getListByUser } from '../subscription/api/actions'


// import { updateAvailability } from '../subscription/api/actions';

class ProfileForm extends Component{
  constructor(props) {
    super(props)

      this.state = {
        img: '',
        address: '',
        email: '',
        description: ''
      }
  }
  componentDidMount() {
    this.props.getListByUser()
  }

  updateProfileState(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateProfile = () => {
    let newState = {
          id: this.props.user.details.id,
          image: this.state.img || this.props.user.details.img || '',
          address: this.state.address || this.props.user.details.address || '',
          email: this.state.email || this.props.user.details.email || '',
          description: this.state.description || this.props.user.details.description || ''
        }
    let newDate = {
      id: this.props.subscriptionsByUser.list[0].id,
      nextDeliveryDate: this.props.subscriptionsByUser.nextDeliveryDate
    }
    this.props.saveProfile(newState, newDate)
    this.props.changeEditMode(this.props.user)
  }

  render() {
      return (
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '2em'}}>
        {this.props.user.isEditMode ?
          (
            <article style={{ display: 'flex', flexDirection: 'row', padding: '2em', height: '15em'  }}>  
              {/* look into image file/upload */}
              <label htmlFor='img-input'>
                Image
                <input id='img-input' style={{display: 'block'}} onChange={e => this.updateProfileState(e)} name='img' placeholder={this.props.user.details.img || 'no image'} value={this.state.img} />
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingLeft: '2em', paddingRight: '2em' }}>
                <label htmlFor='address-input'>
                  Address
                  <input id='address-input' style={{ display: 'block'}} onChange={e => this.updateProfileState(e)} name='address' placeholder={this.props.user.details.address || 'no address'} value={this.state.address} />
                </label>
                <label htmlFor='email-input' style={{ display: 'block', margin: '2em' }}>
                  Email
                  <input id='email-input' style={{ display: 'block' }} onChange={e => this.updateProfileState(e)} name='email'  placeholder={this.props.user.details.email || 'no email'} value={this.state.email} />
                </label>
              <Availability />
              </div>
              <label htmlFor='description-input'>
                Description
                <input id='description-input' style={{display: 'block'}} onChange={e => this.updateProfileState(e)} name='description' placeholder={this.props.user.details.description || 'no description'} value={this.state.description} />
              </label>
              {/* change the name of changeEditMode or use conditionals */}
            </article>
          ) :
          (
            <article style={{ display: 'flex', flexDirection: 'row', padding: '2em', height: '15em'  }}>  
              <img style={{ width: '10em', height: '15em', objectFit: 'cover' }} src={this.props.user.details.img}></img>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingLeft: '2em', paddingRight: '2em' }}>
                <p>Address: {this.props.user.details.address}</p>
                <p style={{ display: 'block', margin: '2em' }}>Email: {this.props.user.details.email}</p>
                <Availability />
              </div>
              <p style={{ width: '10em', height: 'auto', border: '1px solid black', overflow: 'scroll' }}>Description: {this.props.user.details.description}</p>
            </article>
          )}
          {this.props.user.isEditMode ?
          <Button onClick={this.updateProfile} theme="secondary">Save Profile</Button> :
          <Button onClick={() => this.props.changeEditMode(this.props.user)} theme="secondary">Edit Profile</Button>}
        </section>
      )   
    }
  }
  
  function profileFormState(state) {
    return {
      user: state.user,
      subscriptionsByUser: state.subscriptionsByUser
    }
  }


export default connect(profileFormState, { getListByUser, saveProfile, changeEditMode })(ProfileForm)

/*
this.state = {
  img: '',
  address: '',
  email: '',
  bio: ''
}
*/
