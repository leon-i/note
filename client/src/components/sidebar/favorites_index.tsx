import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {getFavorites, deleteFavorite} from "../../actions/favorite_actions";
import {RootState} from "../../reducers/root_reducer";
import {FavoriteState} from "../../reducers/entities/entities_reducer";
import {Notepad} from "../../interfaces";
import {FavoritesMenuWrapper} from "./styles";
import {Menu, Typography} from 'antd';

interface Props {
    loggedIn: boolean | null;
    userId: number | null;
    favorites: FavoriteState;
    getFavorites: typeof getFavorites;
    deleteFavorite: typeof deleteFavorite;
}

const FavoritesIndex : React.FC<Props> = ({ loggedIn,
userId,
favorites,
getFavorites,
deleteFavorite}) => {
    useEffect(() => {
        const retrieveFavorites = async() => {
            await getFavorites(userId)
        }

        if (loggedIn) retrieveFavorites();
    }, [loggedIn])
    return (
        <FavoritesMenuWrapper>
            <Typography.Title level={4}>Favorites</Typography.Title>
            {
                !loggedIn &&
                <Typography.Title level={5}>Sign up to favorite notepads!</Typography.Title>
            }
            <Menu
                mode="inline"
                theme='dark'
                selectable={false}
                style={{ borderRight: 0 }}
            >
                {
                    Object.values(favorites).map((favorite : Notepad) => (
                        <Menu.Item>
                            <Link to={`/notepads/${favorite.ID}`}>
                                {`#${favorite.name}`}
                            </Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        </FavoritesMenuWrapper>
    )
}

const mapStateToProps = (state : RootState) => ({
    loggedIn: state.session.isAuthenticated,
    userId: state.session.currentUserId,
    favorites: state.entities.favorites
});

const mapDispatchToProps = ({
    getFavorites,
    deleteFavorite
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesIndex);