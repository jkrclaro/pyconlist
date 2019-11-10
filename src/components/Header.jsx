import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    menuBar: {fontSize: '1.5em', cursor: 'pointer'},
}

class Header extends React.Component {

    state = {
        isDesktop: false
    }
    updatePredicate = this.updatePredicate.bind(this);

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener('resize', this.updatePredicate);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePredicate);
    };

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 992 });
    };

    openNav() {
        document.getElementById("overlay-nav").style.width = "100%";
    }

    closeNav() {
        document.getElementById("overlay-nav").style.width = "0%";
    }

    render() {
        const theme = this.props.theme;
        const logo = require('../imgs/logo.png');
        return (
            <div className={`${theme}-bg`}>
                <div id="overlay-nav" className="overlay">
                    <span className="closebtn" onClick={this.closeNav}>&times;</span>
                    <div className="overlay-content">
                        <div className='container'>
                            <Link to='/' className='overlay-link' onClick={this.closeNav}>Home</Link>
                            <a href="mailto:jkrclaro@gmail.com" className='overlay-link' rel='nofollow'>Contact</a>
                        </div>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-light bg__nav--white" style={{paddingTop: 50, paddingBottom: 20}}>
                    <div className='container mb-2 mt-2'>
                        <Link to='/' className='nav-link'><img src={logo} alt='logo' height='50' width='50'></img></Link>
                        {this.state.isDesktop ? (
                            <ul className="navbar-nav mx-auto">
                                <li className='nav-item'></li>
                                <li className='nav-item mr-3'><Link to='/' className={`nav-link ${theme}-text`}>PyTalks provides you with all Python related talks</Link></li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ml-auto">
                                <li className='nav-item mr-3'><span className={`nav-link ${theme}-text`} onClick={this.openNav}><i className='fas fa-bars' style={styles.menuBar}></i></span></li>
                            </ul>
                        )}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;