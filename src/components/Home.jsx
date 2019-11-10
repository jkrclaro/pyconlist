import React from 'react';

import Header from './Header';
import Footer from './Footer';


class Home extends React.Component {

    state = {
        isDesktop: false
    }
    updatePredicate = this.updatePredicate.bind(this);

    componentDidMount() {
        document.title = 'PyTalks - List of all Python talks';
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
        return (
            <div className='layout'>
                <div className='layout-Content'>
                    <Header />
                    <div className='invert-bg'>
                        <div className='container'>
                            <div className='row'>
                                {talks.map((talk, talkIndex) => 
                                    <div className='col-lg-3 col-md-4 col-sm-6 mb-3' key={talkIndex}>
                                        <div className='card h-100' style={{border: '0'}}>
                                            <div className='card-body d-flex flex-column'>
                                                <img src={talk.thumbnail} alt={talk.title} className='img-fluid mb-3' style={{border: '1px solid lightgray', borderRadius: '0%'}}></img>
                                                <h6><b><a href={talk.video_url} style={{color: '#333'}}>{talk.title}</a></b></h6>
                                                <div className='mt-auto'>
                                                    <div><i className="fas fa-user mr-2" style={{color: 'gray'}}></i>{talk.speakers}</div>
                                                    <div>
                                                        <span className="badge badge-pill badge-primary">
                                                            <a href={talk.channel_url} style={{textDecoration: 'none', color: '#FFF'}}>
                                                                {talk.convention}
                                                            </a>
                                                        </span>
                                                        <small className='float-right text-muted' style={{paddingTop: 7}}>
                                                            {talk.uploaded_at}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
