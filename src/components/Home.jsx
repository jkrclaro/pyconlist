import React from 'react';

import Header from './Header';
import Footer from './Footer';


class Home extends React.Component {

    state = {
        isDesktop: false,
        talks: require('../talks.json').data,
        categories: require('../categories.json').data,
        currentCategory: ''
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
        this.setState({ currentCategory: event.target.id });
    }

    render() {
        const { talks, categories, currentCategory } = this.state;

        let currentTalks = [];
        if (currentCategory) {
            for (let talk of talks) {
                if (talk.category.title.toLowerCase() === currentCategory) {
                    currentTalks.push(talk)
                }
            }
        } else {
            currentTalks = talks;
        }

        return (
            <div className='layout'>
                <div className='layout-Content'>
                    <Header />
                    <div className='invert-bg'>
                        <div className='container'>

                            <div className='col-lg-12 mb-3'>
                                {categories.map((category, categoryIndex) =>
                                    <span   style={{cursor: 'pointer'}}
                                            onClick={this.updateCategory}
                                            id={category.title.toLowerCase()}
                                            className={`badge badge-${category.badge} mr-1`}
                                            key={categoryIndex}>
                                        {category.title}
                                    </span>
                                )}
                            </div>

                            {currentTalks.map((talk, talkIndex) => 
                                <div className='col-lg-12 mb-2' key={talkIndex}>
                                        <span style={{color: 'gray'}}>{talkIndex + 1}.</span>
                                        <a data-toggle='collapse'
                                            href={`#talk-${talkIndex}`}
                                            role='button'
                                            aria-expanded='false'
                                            aria-controls={`talk-${talkIndex}`}
                                            style={{color: '#2B5B84', fontWeight: 700}}>
                                                {talk.title}
                                        </a>
                                        <div className='collapse' id={`talk-${talkIndex}`}>
                                            <iframe width='50%' height='300' src={talk.embed_url}></iframe>
                                        </div>
                                    <div>
                                        <small style={{color: 'gray'}}>by <a href='#' style={{color: '#CE9C57'}}>{talk.speakers}</a> | {talk.uploaded_at } | <span className={`badge badge-${talk.category.badge}`}>{talk.category.title}</span></small>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;
