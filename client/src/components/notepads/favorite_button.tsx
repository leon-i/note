import React, {useState} from 'react';
import {connect} from "react-redux";
import {createFavorite, deleteFavorite} from "../../actions/favorite_actions";
import {RootState} from "../../reducers/root_reducer";
import {FavoriteState} from "../../reducers/entities/entities_reducer";
import {Notepad} from "../../interfaces";
import {Tooltip} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";

interface Props {
    favorites: FavoriteState;
    userId: number | null;
    notepadId: number;
    createFavorite: typeof createFavorite;
    deleteFavorite: typeof deleteFavorite;
}

const FavoriteButton : React.FC<Props> = ({ favorites,
userId,
notepadId,
createFavorite,
deleteFavorite}) => {
    const [favoriteState, setFavoriteState] = useState<boolean>(!!favorites[notepadId]);
    const [hoverState, setHoverState] = useState<boolean>(favoriteState);

    const handleClick = () => {
        if (!userId) return null;
        if (!!favorites[notepadId]) {
            deleteFavorite({ UserID: userId, NotepadID: notepadId });
            setFavoriteState(false);
        } else {
            createFavorite({ UserID: userId, NotepadID: notepadId });
            setFavoriteState(true);
        }
    }

    const Icon = hoverState ? HeartFilled : HeartOutlined;

    return (
        <Tooltip title={userId ? 'Click to favorite!' : 'Log in to favorite!'}>
            <Icon onClick={handleClick}
                  onMouseEnter={() => setHoverState(true)}
                  onMouseLeave={() => {
                      if (!favoriteState) {
                          setHoverState(false);
                      }
                  }} />
        </Tooltip>
    )
};

const mapStateToProps = (state : RootState) => ({
    favorites: state.entities.favorites,
    userId: state.session.currentUserId
});

const mapDispatchToProps = ({
    createFavorite,
    deleteFavorite
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);