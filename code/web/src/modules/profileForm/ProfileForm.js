import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../ui/button';
import { saveProfile } from '../user/api/actions';
import { changeEditMode } from '../user/api/actions';

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

  updateProfileState(e) {
    console.log('this, updateProfileState', this)
    this.setState({ [e.target.name]: e.target.value })
  }

  updateProfile() {
    saveProfile(this.state)
    changeEditMode(this.props.user)
  }

  render() {
      return (
        <section style={{ display: 'flex', justifyContent: 'center' }}>
        {this.props.user.isEditMode ?
          (
            <article>  
              {/* look into image file/upload */}
              <input onChange={e => this.updateProfileState(e)} name='img' value={this.props.user.details.img} />
              <input onChange={e => this.updateProfileState(e)} name='address' value={this.props.user.details.address} />
              <input onChange={e => this.updateProfileState(e)} name='email' value={this.props.user.details.email} />
              <input onChange={e => this.updateProfileState(e)} name='description' value={this.props.user.details.description} />
              {/* change the name of changeEditMode or use conditionals */}
              <Button onClick={this.updateProfile} theme="secondary">Save Profile</Button>
            </article>
          ) :
          (
            <article>  
              <img src={this.props.user.details.img}></img>
              <p>{this.props.user.details.address}</p>
              <p>{this.props.user.details.email}</p>
              <p>{this.props.user.details.description}</p>
            </article>
          )}
        </section>
      )   
    }
  }

function profileFormState(state) {
    return {
      user: state.user
    }
  }


export default connect(profileFormState, { saveProfile, changeEditMode })(ProfileForm)

/*
this.state = {
  img: '',
  address: '',
  email: '',
  bio: ''
}
*/