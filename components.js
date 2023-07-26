import React from 'react';
import importCSS from './utils.js'

importCSS('components.css')

export function Container({ className = "", children }) {
    className += " component container"
    return (
        <div className={ className }>{ children }</div>
    )
}

export function Button({ className = "", onClick, type = "none", children }) {
    className += " component button " + type
    return (
        <button className={ className } onClick={onClick}>{ children }</button>
    )
}

export function Link({ className = "", href = "#", target = "_blank", children }) {
    className += " component a"
    return (
        <a className={ className } href={ href } target={ target }>{ children }</a>
    )
}

export function ProgressBar({ progress = 0 }) {
    progress = parseInt(progress)
    return (
        <div className="component progress-bg">
            <div className="progress-fg" style={{"width": progress + "%"}}></div>
            <label>{progress + "%"}</label>
        </div>
    );
}

export function Page({ selected, name, children }) {
    return <div style={selected == name? { "display": "block" } : { "display": "none" }}>{ children }</div>
}

export function PlaceRight({ className = "", children }) {
    className += " component place-right"
    return (
        <div className={className}>{ children }</div>
    )
}