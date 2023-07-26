import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { importCSS } from './utils.js';
import { Button, Container, Link, ProgressBar, Page, PlaceRight, CheckBox } from './components.js';

importCSS('app.css')

function App({ children }) {
    const [currentPage, setPage] = useState('home')

    return (
        <div className="app">
            <Header page={currentPage} pageHandler={setPage}/>
            <Main page={currentPage}/>
            <Footer/>
        </div>
    )
}

function Header({ page, pageHandler }) {
    return (
        <header className="header">
            <h1 id="page-title"><span id="easteregg" className="">Coffee</span></h1>
            <Menu page={page} pageHandler={pageHandler}/>
        </header>
    )
}

function Menu({ page, pageHandler }) {
    const pageItems = [
        ["Home", "home"],
        ["About", "about"],
        ["Support", "support"],
        ["Contributors", "contributors"],
    ]

    return (
        <nav id="menu">
           <ul>
                {
                    pageItems.map(item => {
                        const [ label, name ] = item 
                        return <li className={page == name? "selected": ""} key={label} onClick={() => pageHandler(name)}>{label}</li>
                    })
                }
           </ul>
        </nav>
    )
}

function RandomProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => { //So executa quando o componente é *rederizado* pela primeira vez
        setInterval(() => {
            setProgress(parseInt(Math.random() * 100))
        }, 500)
    }, [])

    return <ProgressBar progress={progress}/>
}

function Main({ page }) {
    const toggleLightMode = (light) => {
        if (light) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }
    
    return (
        <main className="main">
            <Page selected={page} name="home">
                <h2>This is the home page</h2>
                <p>This is a little paraph.</p>
                <p className="m10 p-left-10">This can be a normal or almost normal paraph.</p>
                <Link>This is a link</Link>
                <Container>
                    <h3>I'm a container</h3>
                    <p>I'm a simple and cool paragraph made only for test layout.</p>
                    <Button className="fill-line" type="none">None</Button>
                    <Container>
                        <h3>Sucess</h3>
                        <p>Your task is sucessfully finished!</p>
                        <Button type="positive">Positive</Button> 
                    </Container>
                    <Container>
                        <h3>Warning</h3>
                        <p>Your task is waiting for configuration</p>
                        <Button type="neutral"> Neutral </Button>
                    </Container>
                    <Container>
                        <h3>Error</h3>
                        <p>Error on create task</p>
                        <RandomProgress/>
                        <Button type="negative"> Negative </Button>
                    </Container>
                </Container>
                <Container>
                    <h2>Choose color</h2>
                    <Button onClick={() => document.body.className="blue"}>🔵</Button>
                    <Button onClick={() => document.body.className="orange"}>🟠</Button>
                    <Button onClick={() => document.body.className="green"}>🟢</Button>
                    <CheckBox onChange={(light) => toggleLightMode(light)} value={false}>Toggle light mode</CheckBox>
                </Container>
            </Page>
            <Page selected={page} name="about">
                <h2>About</h2>
                <p>This project in a <Link href="https://react.dev">React</Link> playground for layout tests.</p>
                <p>With React is easy to make wellsome layouts!</p>
                <Button onClick={() => document.body.innerHTML = '<p style="color: white; padding: 10px;">Thanks for donate your time!</p>'}>Donate</Button>
                <Container>
                    <h3>📌 This can be a tip</h3>
                    <p>
                        These containers has a cool highlight when mouse hover.<br/>
                        It can make more sense for more complex cases. 
                    </p>
                    <Container>
                        <CheckBox value={false}>Enable optimization</CheckBox>
                        <CheckBox value={false}>Enable debug mode</CheckBox>
                        <CheckBox value={false}>Enable some thing</CheckBox>
                    </Container>
                    <Container>
                        <CheckBox value={false}>Toggle option</CheckBox>
                        <CheckBox value={false}>Toggle another option</CheckBox>
                    </Container>
                    <Container>
                        <CheckBox value={false}>Check it</CheckBox>
                    </Container>
                    <PlaceRight>
                        <Button>Submit</Button>
                    </PlaceRight>
                </Container>
            </Page>
            <Page selected={page} name="support">
                <h2>Your browser doesn't support the support page 😋.</h2>
                <p>This problem occurs when the programmer haven't content enough to fill the page.</p>
                <PlaceRight><Button>Report bug</Button></PlaceRight>
            </Page>
            <Page selected={page} name="contributors">
                <Container>
                    <h2>Project contributors</h2>
                    <p>Content: me</p>
                    <p>Code: me more one time</p>
                    <p>Design: me another time</p>
                    <Container>
                        <h3>Title</h3>
                        <p>Content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content</p>
                        <PlaceRight><Link href="https://google.com">Random link</Link></PlaceRight>
                    </Container>
                </Container>
            </Page>
        </main>
    )
}

function Footer() {
    return (
        <footer className="footer">
            <p>Powered by Coffee</p>
        </footer>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('react-app')
);