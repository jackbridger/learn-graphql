import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function Navbar() {
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const [activeItem, setActiveItem] = React.useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <div>
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={handleItemClick}
                        as={Link}
                    />
                </Menu.Menu>
            </Menu>

            <Segment>
                <img src='/images/wireframe/media-paragraph.png' />
            </Segment>
        </div>
    )
}

export default Navbar