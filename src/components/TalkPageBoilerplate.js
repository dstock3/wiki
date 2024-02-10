import { Link } from 'react-router-dom';

const TalkPageBoilerplate = ({ articleTitle }) => {
    return (
        <div className="talk-page-boilerplate">
            <div className="talk-boiler-intro">
                <div className="talk-boiler">This is the talk page for <Link to="">{articleTitle}</Link>. This is not a forum for general discussion of the article's subject. Please use this page to discuss improvements to the article.</div>
                <div className="talk-boiler">This is a place for respectful discussion and debate. Please keep comments relevant to the topic at hand. By posting a comment, you agree to our <Link to="/wiki/terms">Terms of Service</Link>.</div>
            </div>

            <div className="guidelines-container">
                <ul className="guidelines-list">
                    <li className="guidelines-line-item">Be polite and avoid personal attacks.</li>
                    <li className="guidelines-line-item">Keep your comments focused on the topic at hand.</li>
                    <li className="guidelines-line-item">Do not post personal information.</li>
                    <li className="guidelines-line-item">Do not post links to other websites.</li>
                </ul>

                <ul className="guidelines-list">
                    <li className="guidelines-line-item">Do not post copyrighted material.</li>
                    <li className="guidelines-line-item">Do not post spam or advertising.</li>
                    <li className="guidelines-line-item">Do not post off-topic comments.</li>
                    <li className="guidelines-line-item">Do not post comments that are not your own work.</li>
                </ul>

                <div className="guidelines-contact">If you have any questions, please <Link to="/wiki/contact">contact us</Link>.</div>
            </div>
        </div>
    );
}

export default TalkPageBoilerplate;
