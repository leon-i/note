import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState, SessionState } from '../reducers/root_reducer';
import { logout } from '../actions/user_actions';
import { Button, Breadcrumb } from 'antd';
import SessionButton from './session/session_button';

interface Props {
    session: SessionState;
    logout: typeof logout;
    location: any;
}

const Navbar : React.FC<Props> = ({ session, logout, location }) => {
    const [loadingState, setLoadingState] = React.useState<boolean>(false);
    const pathSnippets = location.pathname.split('/').filter((path : string) => path);
    const extraBreadcrumbItems = pathSnippets.map((snippet: string, index : number) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
        <Breadcrumb.Item key={index}>
            <Link to={url}>{snippet}</Link>
        </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <nav className='navbar'>
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb>
            <div className='session-btns'>
                {
                    (session.isAuthenticated && !loadingState) ? (
                        <Button onClick={logout}>Logout</Button>
                    ) : (
                        <>
                            <SessionButton formType={'register'}
                                loadingState={loadingState}
                                setLoadingState={setLoadingState} />
                            <SessionButton formType={'login'}
                                loadingState={loadingState}
                                setLoadingState={setLoadingState} />
                        </>
                    )
                }
            </div>
        </nav>
    )
}

const mapStateToProps = (state : RootState) => ({
    session: state.session
});

const mapDispatchToProps = ({
    logout
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));