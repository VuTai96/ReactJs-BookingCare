import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import './Sections.scss'

class About extends Component {
    render() {
        return (
            <div className='homepage-section first about'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2>Truyền thông</h2>
                    </div>
                    <div className='section-body-about'>
                        <div className='video'>
                            <iframe
                                src="https://www.youtube.com/embed/DeqZkLJYreI?list=RDDeqZkLJYreI"
                                title="Bruno Mars - Talking To The Moon (Lyrics)"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div className='information'>
                            <i>
                                Đối với bất kỳ ai đã mất người thân yêu, cho dù đó là mẹ, cha, bạn thân, chị gái, anh, dì, chú, bà, ông hay bất cứ ai trong cuộc đời bạn mà bạn đã mất chỉ cần biết rằng họ luôn ở trong trái tim bạn và dõi theo bạn và họ yêu bạn! Hãy nhớ rằng .... Họ không bao giờ rời bỏ bạn, họ vẫn ở đó, đi bên cạnh bạn ngay cả khi bạn không thể nhìn thấy hoặc nghe thấy họ. Tôi đã mất đi người bạn thân nhất của mình nhưng tôi biết cô ấy vẫn ở đó và đi bên cạnh tôi. Đau lắm nhưng một ngày nào đó bạn sẽ gặp lại họ ở cuối cầu vồng và họ sẽ đợi bạn. Hy vọng mọi người có một ngày / đêm tốt lành !! Hãy nhớ rằng bạn được yêu!❤
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
