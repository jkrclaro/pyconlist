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

        const youtube = document.querySelectorAll('.youtube');

        for (let index=0; index < youtube.length; index++) {
            const source = `https://img.youtube.com/vi/${youtube[index].dataset.embed}/sddefault.jpg`;
            
            const image = new Image();
            image.src = source;
            image.addEventListener('load', function() {
                youtube[index].appendChild(image);
            }(index))


            youtube[index].addEventListener('click', function() {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${this.dataset.embed}?rel=0&showinfo=0&autoplay=1`)
                this.innerHTML = '';
                this.appendChild(iframe);
            })
        }

    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePredicate);
    };

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 576 });
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
                                            className={`btn btn-${category.badge} mr-1 mb-1`}
                                            key={categoryIndex}>
                                        {category.title}
                                    </span>
                                )}
                            </div>

                            {currentTalks.map((talk, talkIndex) => 
                                <div className='col-lg-12 mb-2' key={talkIndex}>
                                    <div className='row'>
                                        <div className='col-1 text-sm-right'>
                                            <span className='mr-3' style={{color: 'gray'}}>{talkIndex + 1}.</span>
                                        </div>
                                        <div className='col-11'>
                                            {/* <a href={talk.video_url} style={{color: '#2B5B84', fontWeight: 700}}>{talk.title}</a> */}
                                            <a data-toggle='collapse'
                                                href={`#talk-${talkIndex}`}
                                                role='button'
                                                aria-expanded='false'
                                                aria-controls={`talk-${talkIndex}`}
                                                style={{color: '#2B5B84', fontWeight: 700}}>
                                                    {talk.title}
                                            </a>
                                            <div className='collapse' id={`talk-${talkIndex}`}>
                                                <div className='youtube' data-embed={talk.youtube_id}>
                                                    <div className='play-button'></div>
                                                </div>
                                            </div>
                                            <div>
                                                <small style={{color: 'gray'}}>by <a href='#' style={{color: '#CE9C57'}}>{talk.speakers}</a> | {talk.uploaded_at } | <span className={`badge badge-${talk.category.badge}`}>{talk.category.title}</span></small>
                                            </div>
                                        </div>
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
