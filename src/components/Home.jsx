import React from 'react';

import Header from './Header';
import Footer from './Footer';


class Home extends React.Component {

    state = {
        isDesktop: false
    }
    updatePredicate = this.updatePredicate.bind(this);

    componentDidMount() {
        document.title = 'Pytalks - List of all Python talks';
        this.updatePredicate();
        window.addEventListener('resize', this.updatePredicate);
        window.scrollTo(0 ,0);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePredicate);
    };

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 768 });
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const talks = require('../talks.json');
        console.log(talks);
        return (
            <div className='layout'>
                <div className='layout-Content'>
                    <Header />
                    <div className='invert-bg'>
                        <div className='container'>
                            <div className='col-lg-12'>
                                <div className='row'>
                                    {talks.map((talk, talkIndex) => 
                                        <div className='col-lg-3 col-sm-6 mb-3' key={talkIndex}>
                                            <img src={talk.thumbnail} alt={talk.title} className='img-fluid' style={{border: '1px solid lightgray'}}></img>
                                            <div><b>{talk.title}</b></div>
                                            <div><i className="fas fa-users"></i> {talk.speakers}</div>
                                            <div><span className="badge badge-pill badge-primary">{talk.conference}</span></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;
