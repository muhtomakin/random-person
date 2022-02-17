import React, { useEffect, useState } from 'react';
import {ReactComponent as NameIcon} from '../svgs/name.svg'
import {ReactComponent as MailIcon} from '../svgs/email.svg'
import {ReactComponent as AgeIcon} from '../svgs/age.svg'
import {ReactComponent as StreetIcon} from '../svgs/street.svg'
import {ReactComponent as PhoneIcon} from '../svgs/phone.svg'
import {ReactComponent as PasswordIcon} from '../svgs/password.svg'

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

const Main = () => {
    
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState(null)
    const [value, setValue] = useState('random person')
    const [title, setTitle] = useState('name')

    const getPerson = async () => {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        const person = data.results[0]
        const {phone, email} = person
        const {large: image} = person.picture
        const {password} = person.login
        const {first, last} = person.name
        const {dob : {age}} = person
        const {street: {number, name}} = person.location

        const newPerson = {
            image, 
            phone,
            email,
            password,
            age,
            street: `${number} ${name}`,
            name: `${first} ${last}`
        }
        setPerson(newPerson)
        setLoading(false)
        setTitle('name')
        setValue(newPerson.name)
    }

    useEffect(() => {
        getPerson()
      }, [])

    const handleValue = (e) => {
        //console.log(e.target.classList.contains('icon'))
        if (e.target.classList.contains('icon')) {
            const newValue = e.target.dataset.label
            setTitle(newValue)
            setValue(person[newValue])
        }
    }

    return (
        <main>
            <div className='block bcg-black'></div>
            <div className='block'>
                <div className='container'>
                    <img src={(person && person.image) || defaultImage} alt='random user' className='user-img' />
                    <p className='user-title'>My {title} is</p>
                    <p className='user-value'>{value}</p>
                    <div className='value-list'>
                        <button className='icon' data-label='name' onMouseOver={handleValue}><NameIcon /></button>
                        <button className='icon' data-label='email' onMouseOver={handleValue}><MailIcon /></button>
                        <button className='icon' data-label='age' onMouseOver={handleValue}><AgeIcon /></button>
                        <button className='icon' data-label='street' onMouseOver={handleValue}><StreetIcon /></button>
                        <button className='icon' data-label='phone' onMouseOver={handleValue}><PhoneIcon /></button>
                        <button className='icon' data-label='password' onMouseOver={handleValue}><PasswordIcon /></button>
                    </div>
                    <button className='btn' onClick={getPerson}>
                        {loading ? 'loading...' : 'random user'}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Main;
