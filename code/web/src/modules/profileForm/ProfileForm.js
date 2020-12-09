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
    this.setState({ [e.target.name]: e.target.value })
  }

  updateProfile = () => {
    let newState = {
          img: this.state.img || this.props.user.details.img || '',
          address: this.state.address || this.props.user.details.address || '',
          email: this.state.email || this.props.user.details.email || '',
          description: this.state.description || this.props.user.details.description || ''
        }
    this.props.saveProfile(newState)
    this.props.changeEditMode(this.props.user)
  }

  render() {
      return (
        <section style={{ display: 'flex', justifyContent: 'center' }}>
        {this.props.user.isEditMode ?
          (
            <article>  
              {/* look into image file/upload */}
              <input onChange={e => this.updateProfileState(e)} name='img' placeholder={this.props.user.details.img || 'no image'} value={this.state.img} />
              <input onChange={e => this.updateProfileState(e)} name='address' placeholder={this.props.user.details.address || 'no address'} value={this.state.address} />
              <input onChange={e => this.updateProfileState(e)} name='email'  placeholder={this.props.user.details.email || 'no email'} value={this.state.email} />
              <input onChange={e => this.updateProfileState(e)} name='description' placeholder={this.props.user.details.description || 'no description'} value={this.state.description} />
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