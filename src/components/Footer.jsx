import React from 'react';


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
                    <hr/>
                    <div className='col-lg-12 text-center'>
                        <small> 
                            Made by <a href='https://www.jkrclaro.com'>John Claro</a> | <a href='mailto:jkrclaro@gmail.com'>Contact</a>
                        </small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
