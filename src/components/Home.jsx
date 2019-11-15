import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';


class Home extends React.Component {

    state = {
        isDesktop: false,
        talks: require('../talks.json').data,
        currentPageNumber: 1,
        talksPerPage: 30,
        category: ''
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

    handleClick = (event) => {
        this.setState({ currentPageNumber: event.target.id})
    }

    updateCategory = (event) => {
        console.log(event);
    }

    render() {
        const { talks, currentPageNumber, talksPerPage } = this.state;

        const indexOfLastTalk = currentPageNumber * talksPerPage;
        const indexOfFirstTalk = indexOfLastTalk - talksPerPage;
        const currentTalks = talks.slice(indexOfFirstTalk, indexOfLastTalk);

        const pageNumbers = [];
        for (let pageNumber = 1; pageNumber <= Math.ceil(talks.length / talksPerPage); pageNumber++) {
            pageNumbers.push(pageNumber)
        }

        const categories = require('../categories.json').data;

        return (
            <div className='layout'>
                <div className='layout-Content'>
                    <Header />
                    <div className='invert-bg'>
                        <div className='container'>

                            <div className='col-lg-12 mb-3'>
                                {categories.map((category, categoryIndex) =>
                                    <Link to={`/c/${category.title.toLowerCase()}`} className={`badge badge-${category.badge} mr-1`} key={categoryIndex}>
                                        {category.title}
                                    </Link>
                                )}
                            </div>

                            {currentTalks.map((talk, talkIndex) => 
                                <div className='col-lg-12 mb-2' key={talkIndex}>
                                    <span style={{color: 'gray'}}>{talkIndex + 1}.</span> <a href={talk.video_url} style={{color: '#2B5B84', fontWeight: 700}}>{talk.title}</a>
                                    <div>
                                        <small style={{color: 'gray'}}>by <a href='#' style={{color: '#CE9C57'}}>{talk.speakers}</a> | {talk.uploaded_at } | <span className={`badge badge-${talk.category.badge}`}>{talk.category.title}</span></small>
                                    </div>
                                </div>
                            )}

                            <div className='col-lg-12 text-center mt-4'>
                                {pageNumbers.map(pageNumber => {
                                    return (
                                        <a key={pageNumber}
                                            id={pageNumber}
                                            href='#'
                                            onClick={this.handleClick}
                                            className={`btn btn-python mr-3 mb-3 ${pageNumber == currentPageNumber ? 'btn-active' : null}`}>
                                            {pageNumber}
                                        </a>
                                    )
                                })}
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
