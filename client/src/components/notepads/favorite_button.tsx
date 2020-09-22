import React, {useState} from 'react';
import {connect} from "react-redux";
import {createFavorite, deleteFavorite} from "../../actions/favorite_actions";
import {RootState} from "../../reducers/root_reducer";
import {Tooltip} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";
import {Notepad} from "../../interfaces";

interface Props {
    favorite: Notepad;
    userId: number | null;
    notepadId: number;
    createFavorite: typeof createFavorite;
    deleteFavorite: typeof deleteFavorite;
}

const FavoriteButton : React.FC<Props> = ({
favorite,
userId,
notepadId,
createFavorite,
deleteFavorite}) => {
    const [favoriteState, setFavoriteState] = useState<boolean>(!!favorite);
    const [hoverState, setHoverState] = useState<boolean>(favoriteState);

    const handleClick = () => {
        if (!userId) return null;
        if (!!favorite) {
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
                  onMouseOverCapture={() => setHoverState(true)}
                  onMouseLeave={() => {
                      if (!favoriteState) {
                          setHoverState(false);
                      }
                  }} />
        </Tooltip>
    )
};

const mapStateToProps = (state : RootState, ownProps : { notepadId: number}) => ({
    favorite: state.entities.favorites[ownProps.notepadId],
    userId: state.session.currentUserId
});

const mapDispatchToProps = ({
    createFavorite,
    deleteFavorite
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);