import React from 'react';
import { connect } from 'react-redux';
import { updateAvailability } from '../subscription/api/actions';

const ProfileForm = (props) => {


  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      {props.user.isEditMode === true ?
        (
          <article>  
            <img src={props.user.img}></img>
            <input onChange={event => props.updateAvailability(event.target.value)} type='address'>{props.user.address}</input>
            <input onChange={event => props.updateAvailability(event.target.value)} type='description'>{props.user.description}</input>
          </article>
        ) :
        (
          <article>  
            <img src={props.user.img}></img>
            <p>{props.user.address}</p>
            <p>{props.user.description}</p>
          </article>
        )}
    </section>
  )   
}

function availabilityState(state) {
    return {
      user: state.user
    }
  }

export default connect(availabilityState, { updateAvailability })(Availability)

/*
this.state = {
  img: '',
  address: '',
  email: '',
  bio: ''
}
*/