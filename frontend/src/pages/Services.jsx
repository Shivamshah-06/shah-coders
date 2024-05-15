import React from 'react'
import "../App.css"
import img from '../images/Web-Developer-skill.jpg'
import { useAuth } from '../store/auth'
const Services = () => {
  const {service} =useAuth();
  return (
    <section className='section-services'>
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {service?.map((data,index)=>{return (<div className="card" key={index}>
          <div className="card-img">
            <img src="https://media.istockphoto.com/id/1265041897/vector/business-team-working-together-on-web-page-design-people-building-website-interface-on.jpg?s=612x612&w=0&k=20&c=0nwzJe_VQNlN94Own93LE5pqnYG5g8E1ez7M4u0NWvk=" alt="our servies"width="100"  />
          </div>
          <div className="card-details">
            <div className="grid grid-two-cols">
              <p>{data.provider}</p>
              <p>{data.price}</p>

            </div>
            <h2>{data.service}</h2>
            <p>{data.description}</p>
          </div>
        </div>)})}
      </div>
    </section>
  )
}

export default Services
