import React from 'react';
import { connect } from 'react-redux';
import { RootState, SessionState } from '../reducers/root_reducer';
import { logout } from '../actions/user_actions';
import { Button } from 'antd';
import SessionButton from './session/session_button';

interface Props {
    session: SessionState;
    logout: typeof logout;
}

const Navbar : React.FC<Props> = ({ session, logout }) => {
    const [loadingState, setLoadingState] = React.useState<boolean>(false);

    return (
        <nav className='navbar'>
            <h2>
                note
            </h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);