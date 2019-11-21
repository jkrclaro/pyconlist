import React from 'react';

import Header from './Header';
import Footer from './Footer';

const INITIAL_STATE = {
    talks: require('../talks.json').data,
    categories: require('../categories.json').data,
    currentCategory: ''
}


class Home extends React.Component {

    state = {
        isDesktop: false,
        talks: INITIAL_STATE.talks,
        categories: INITIAL_STATE.categories,
        currentCategory: INITIAL_STATE.currentCategory
    };

    updatePredicate = this.updatePredicate.bind(this);

    componentDidMount() {
        document.title = 'PyTalks';
        this.updatePredicate();
        window.addEventListener('resize', this.updatePredicate);
        window.scrollTo(0 ,0);

        this.updateYoutubeFrames();

    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePredicate);
    };

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 576 });
    };

    closeAllYoutubeFrames() {
        const iframes = document.getElementsByTagName("iframe");

        for (let index=0; index < iframes.length; index++) {
            const iframe = iframes[index];
            iframe.setAttribute('src', '#')
        }
    }

    updateYoutubeFrames = (event) => {
        const youtubeList = document.querySelectorAll('.youtube');

        for (let index=0; index < youtubeList.length; index++) {
            const youtube = youtubeList[index];
            const source = `https://img.youtube.com/vi/${youtube.dataset.embed}/sddefault.jpg`;

            const image = new Image();
            image.src = source;
            image.addEventListener('load', function() {
                youtube.appendChild(image);
            }(index))


            youtube.addEventListener('click', function() {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${this.dataset.embed}?rel=0&showinfo=0&autoplay=1`)
                this.innerHTML = '';
                this.appendChild(iframe);
            })
        }
    }

    resetCategory(category) {
        const { talks, categories, currentCategory } = INITIAL_STATE;
        this.setState({ talks, categories, currentCategory });

        let categoryTalks = [];
        for (let talk of INITIAL_STATE.talks) {
            if (talk.category.title.toLowerCase() === category) {
                categoryTalks.push(talk)
            }
        }
        this.setState({ talks: categoryTalks }, function() {
            this.updateYoutubeFrames();
        });
    }

    handleChange = (event) => {
        const { currentCategory } = this.state;
        window.scrollTo(0 ,0);

        const category = event.target.value.toLowerCase();

        if (category === currentCategory) {
            this.resetCategory(category)
        } else {
            this.setState({ currentCategory: category });
        }

        this.closeAllYoutubeFrames()

        let categoryTalks = [];
        for (let talk of INITIAL_STATE.talks) {
            if (talk.category.title.toLowerCase() === category) {
                categoryTalks.push(talk)
            }
        }
        this.setState({ talks: categoryTalks }, function() {
            this.updateYoutubeFrames();
        });
    }

    render() {
        const { talks, categories, currentCategory } = this.state;

        return (
            <div className='layout'>
                <div className='layout-Content'>
                    <Header />
                    <div className='invert-bg'>
                        <div className='container'>

                            <div className='col-lg-12 mb-3'>
                                <select onChange={this.handleChange} value={currentCategory}>
                                    {categories.map((category, categoryIndex) =>
                                        <option key={categoryIndex} value={category.title.toLowerCase()}>{category.title}</option>
                                    )}
                                </select>
                            </div>

                            {talks.map((talk, talkIndex) =>
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
