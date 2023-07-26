import React from 'react';
import { useState, useRef } from 'react';
import { importCSS, randomId } from './utils.js'

importCSS('components.css')

export function Container({ className = '', children }) {
    className += ' component container'
    return (
        <div className={ className }>{ children }</div>
    )
}

export function Button({ className = '', onClick, type = 'none', children }) {
    className += ' component button ' + type
    return (
        <button className={ className } onClick={onClick}>{ children }</button>
    )
}

export function Link({ className = '', href = '#', target = '_blank', children }) {
    className += ' component a'
    return (
        <a className={ className } href={ href } target={ target }>{ children }</a>
    )
}

export function ProgressBar({ className = '', progress = 0 }) {
    className += 'component progress-bg'
    progress = parseInt(progress)
    return (
        <div className={className}>
            <div className='progress-fg' style={{'width': progress + '%'}}></div>
            <label>{progress + '%'}</label>
        </div>
    );
}

export function Page({ selected, name, children }) {
    return <div style={selected == name? { 'display': 'block' } : { 'display': 'none' }}>{ children }</div>
}

export function PlaceRight({ className = '', children }) {
    className += ' component place-right'
    return (
        <div className={className}>{ children }</div>
    )
}

export function CheckBox({ id = randomId(), className = '', value = false, onChange, children }) {
    className += 'component checkbox'

    const checkBoxRef = useRef(null)
    const [checked, setChecked] = useState(value)
    
    const handleChange = (value) => {
        setChecked(value)
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className={className}>
            <label htmlFor={id}>
                <div className="checkbox-bg">
                    <input
                        id={id}
                        ref={checkBoxRef}
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => handleChange(event.target.checked)}/>
                    <span 
                        className={ 'checkbox-fg ' + (checked? 'checked' : '') }>
                    </span>
                </div>
                <span className="unselectable">{children}</span>
            </label>
        </div>
    )
}