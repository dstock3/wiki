import { useEffect } from 'react';
import SideMenu from '../../components/SideMenu';
import '../../styles/ContributePage.css'

const ContributePage = ({title}) => {
    useEffect(() => {
        document.title = `${title} | Contribute`;
    }, [title]);
    
    return(
        <div className="contribute-page">
            <SideMenu />
            <div className="contribute-container">
                <h1>How to Contribute to {title}</h1>
                
                <p>Thank you for your interest in contributing to {title}! As a community-driven platform, we rely on users like you to help expand, update, and improve our content.</p>
                
                <section className="contribution-guidelines">
                    <h2>Contribution Guidelines</h2>
                    <ul>
                        <li><strong>Be Respectful:</strong> Always approach topics with a neutral point of view and respect the contributions of others.</li>
                        <li><strong>Verify Information:</strong> Ensure that any information you add is accurate and cite your sources whenever possible.</li>
                        <li><strong>Stay Relevant:</strong> Ensure your contributions are relevant to the topic at hand. Off-topic or promotional content may be removed.</li>
                        <li><strong>Report Issues:</strong> If you come across incorrect information or technical issues, please report them so they can be addressed.</li>
                    </ul>
                </section>
                
                <section className="getting-started">
                    <h2>Getting Started</h2>
                    <p>If you're new to {title}, here are some steps to get you started:</p>
                    <ol>
                        <li>Create an account or log in.</li>
                        <li>Search for the topic you're interested in. If it doesn't exist, consider creating a new page.</li>
                        <li>When editing or adding information, always use the editor provided and follow our formatting guidelines.</li>
                        <li>Review your changes, preview them, and then submit.</li>
                        <li>Join the discussion on Talk Pages to collaborate with other contributors.</li>
                    </ol>
                </section>
                
                <section className="contribution-tools">
                    <h2>Contribution Tools & Resources</h2>
                    <p>Here are some tools and resources to help you contribute effectively:</p>
                    <ul>
                        <li><strong>Editor Guide:</strong> A guide to using our page editor, including formatting tips and shortcuts.</li>
                        <li><strong>Discussion Boards:</strong> Collaborate with other contributors, ask questions, and share insights.</li>
                        <li><strong>Templates:</strong> Use predefined templates for common page types to maintain consistency across the platform.</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default ContributePage;
