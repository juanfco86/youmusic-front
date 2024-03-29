
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import ModalEditedPlaylist from '../Modals/ModalEditedPlaylist/ModalEditedPlaylist';
import { addSongToPlaylist, setPlaylistEdit } from '../../redux/features/playlist/playlistSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchEdit } from '../../Api/putApi';

const DropdownDot = ({ data }) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice)
    const playlists = useSelector(state => state.playlistSlice.list);
    const playlist = usersData.isLogged ? playlists.filter((element) => element.userId === (usersData.userLogged._id)) : '';
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const token = getAccessTokenSilently();
    
    const addToPlaylist = (song, playlist) => {
        const selectedPlaylist = playlist.tracks.find((e) => e._id === song._id)
        if (!selectedPlaylist) {
            const playlistAdded = {
                ...playlist,
                'tracks': [...playlist.tracks, song]
            }
            const playlistTotal = playlists.map(p => playlistAdded._id === p._id ? {
                ...p,
                tracks: [...playlist.tracks, song]
            } : p)
            dispatch(addSongToPlaylist(playlistTotal))
            fetchEdit("playlist", serverUrl, playlistAdded, token, dispatch, setPlaylistEdit)
        } else {
            const removeTrackPlaylist = playlist.tracks.filter((e) => e._id !== song._id)
            const playlistAdded = {
                ...playlist,
                'tracks': removeTrackPlaylist
            }

            const playlistTotal = playlists.map(p => playlistAdded._id === p._id ? {
                    ...p,
                    tracks: removeTrackPlaylist
            } : p)
            dispatch(addSongToPlaylist(playlistTotal))
            fetchEdit("playlist", serverUrl, playlistAdded, token, dispatch, setPlaylistEdit)
        }
    }

    return (
        <>
            <DropdownButton
                className='my-dropdown-toggle dot'
                title=<BsThreeDots />
            >

                <Dropdown.Item > <ModalEditedPlaylist /> </Dropdown.Item>

                <NavDropdown.Divider />
                {usersData.isLogged && 
                    playlist.map((p) => {
                        const songExist = p.tracks.find((track) => track._id === data._id)
                        return (
                                !!songExist ? 
                                <NavDropdown.Item key={uuidv4()} onClick={() => addToPlaylist(data, p)} eventKey="1"> Delete from {p.name} </NavDropdown.Item> :
                                <NavDropdown.Item key={uuidv4()} onClick={() => addToPlaylist(data, p)} eventKey="1" > {p.name} </NavDropdown.Item>
                        )
                    })
                }

            </DropdownButton>
        </>
    )
}

export default DropdownDot