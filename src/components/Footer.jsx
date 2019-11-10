import React from 'react';
import { Link } from 'react-router-dom';


class Footer extends React.Component {

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

    render() {
        return (
            <div>
                <div className='container mt-5 mb-5'>
                    <div className='col-lg-12'>
                        <div className='row'>
                            <div className='col-lg-6 mb-3'>
                                <a href='mailto:jkrclaro@gmail.com'>Contact</a>
                            </div>
                            <div className='col-lg-6 text-lg-right'>
                                <span>Made by <a href='https://www.jkrclaro.com'>John Claro</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
