import { useDispatch, useSelector } from 'react-redux';
import { BsFillPlayCircleFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import '../Card.css'
import { setPlayer } from '../../../helpers/functions/setPlayer';
import { likedArtist } from '../../../helpers/functions/likeTrack';
import { useAuth0 } from '@auth0/auth0-react';

const ArtistCard = ({ data, size, img }) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const tracks = useSelector(state => state.trackSlice);
    const tracksArtist = tracks.list.filter((track) => track.artist === data.name);

    const openSong = (data) => {
        navigate(`/artist/${data._id}`)
    }

    return (

        <div className={size} >
            {
                usersData.isLogged ? <button className='btnheart btn' onClick={() => likedArtist(data, usersData, dispatch, getAccessTokenSilently, serverUrl)}>{
                    usersData.userLogged.liked_artist.find((like) => like._id === data._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                }</button> : ""
            }
            <button className='btn btnplay' onClick={() => setPlayer(tracksArtist, dispatch, usersData)}><BsFillPlayCircleFill /></button>

            <img onClick={() => openSong(data)} className={img} src={data.thumbnail} alt={data.artist} />

            <div className="card-text imghover card-body">
                <h5 className="card-title mt-2 grid-center">{data.name}</h5>
            </div>
        </div>

    )
}

export default ArtistCard