import React, { Component } from 'react'
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'


class Drawer extends Component {

    handleClick = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        className={classes.active}
                        onClick={this.handleClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        let links = [
            { to: '/', label: 'Список', exact: true }
        ]
        if (this.props.isAuthenticated) {
            links.push({ to: '/quiz-creator', label: 'Создать тест', exact: true })
            links.push({ to: '/logout', label: 'Выйти', exact: true })
        } else {
            links.push({ to: '/auth', label: 'Авторизация', exact: true })
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        <React.Fragment>{this.renderLinks(links)}</React.Fragment>
                    </ul>
                </nav>

                {this.props.isOpen
                    ? <Backdrop
                        onClick={this.props.onClose}
                    />
                    : null
                }
            </>
        )
    }
}

export default Drawer