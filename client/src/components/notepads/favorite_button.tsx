import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {createFavorite, deleteFavorite} from "../../actions/favorite_actions";
import {RootState} from "../../reducers/root_reducer";
import {Tooltip} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";

interface Props {
    isFavorite: boolean;
    userId: number | null;
    notepadId: number;
    createFavorite: typeof createFavorite;
    deleteFavorite: typeof deleteFavorite;
}

const FavoriteButton : React.FC<Props> = ({
isFavorite,
userId,
notepadId,
createFavorite,
deleteFavorite}) => {
    const [favoriteState, setFavoriteState] = useState<boolean>(false);

    useEffect(() => setFavoriteState(isFavorite), [isFavorite]);

    const handleClick = () => {
        if (!userId) return null;
        if (isFavorite) {
            deleteFavorite({ UserID: userId, NotepadID: notepadId });
            setFavoriteState(false);
        } else {
            createFavorite({ UserID: userId, NotepadID: notepadId });
            setFavoriteState(true);
        }
    }

    const Icon = favoriteState ? HeartFilled : HeartOutlined;

    return (
        <Tooltip title={userId ? 'Click to favorite!' : 'Log in to favorite!'}>
            <Icon onClick={handleClick}
                  onMouseOverCapture={() => setFavoriteState(true)}
                  onMouseLeave={() => {
                      if (!isFavorite) {
                          setFavoriteState(false);
                      }
                  }} />
        </Tooltip>
    )
};

const mapStateToProps = (state : RootState, ownProps : { notepadId: number}) => ({
    isFavorite: !!state.entities.favorites[ownProps.notepadId],
    userId: state.session.currentUserId
});

const mapDispatchToProps = ({
    createFavorite,
    deleteFavorite
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);