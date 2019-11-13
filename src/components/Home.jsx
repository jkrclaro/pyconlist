import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';


class Home extends React.Component {

    state = {
        isDesktop: false,
        talks: require('../talks.json').data.slice(0, 30)
    }
    updatePredicate = this.updatePredicate.bind(this);

    componentDidMount() {
        document.title = 'PyTalks';
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
        return (
            <div className='layout'>
                <div className='layout-Content'>
                    <Header />
                    <div className='invert-bg'>
                        <div className='container'>

                            {this.state.talks.map((talk, talkIndex) => 
                                <div className='col-lg-12 mb-2' key={talkIndex}>
                                    <span style={{color: 'gray'}}>{talkIndex + 1}.</span> <a href={talk.video_url} style={{color: '#2B5B84', fontWeight: 700}}>{talk.title}</a>
                                    <div>
                                        <small style={{color: 'gray'}}>by <a href='#' style={{color: '#CE9C57'}}>{talk.speakers}</a> | {talk.uploaded_at } | <span className={`badge badge-${talk.category.badge}`}>{talk.category.title}</span></small>
                                    </div>
                                </div>
                            )}
                            <div className='col-lg-12 mt-4'>
                                <Link to='/talks?page=2'>More</Link>
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
