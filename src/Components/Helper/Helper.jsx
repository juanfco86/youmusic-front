import { useEffect } from "react";

// redux
import { fetchGet } from "../../Api/Api";
import { useDispatch } from 'react-redux';
import { setTracksList } from "../../redux/features/tracks/tracksSlice";
import { setArtistsList } from "../../redux/features/artists/artistsSlice";
import { setPlaylistsList } from "../../redux/features/playlist/playlistSlice";
import { setUserLogged } from "../../redux/features/user/userSlice";
import { useAuth0 } from '@auth0/auth0-react';

export const Helper = () => {
    const dispatch = useDispatch();
    const { getAccessTokenSilently, user } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    
    useEffect(() => {
        // fetchGet(dispatch, "user", setUserList);
        fetchGet(dispatch, "track", setTracksList);
        // fetchGetAlbums(dispatch);
        fetchGet(dispatch, "playlist", setPlaylistsList);
        fetchGet(dispatch, "artist", setArtistsList);
        // fetchGetGenresList(dispatch);
    }, [dispatch])
    
    useEffect(() => {
        if (user) {
            checkUser();
        }
    }, [user]);

    const checkUser = async () => {
        // PETICION AL BACKEND
        const token = await getAccessTokenSilently();
        const response = await fetch(`${serverUrl}/api/user/checkuser/${user.email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const responseData = await response.json()
        console.log(responseData.info[0]);
        // CONDICIONAL - EL BACK NOS DEVUELVE TRUE O FALSE
        if (!!responseData.user) {
            console.log('El usuario existe en la bbdd');
            // console.log(responseData.user[0]);
            await dispatch(setUserLogged(responseData.info[0]));
            // setuserLoged(responseData.user[0])
        } //else {
        //     // SI NO EXISTE, CREAR USER CON POST
        //     console.log('El usuario no existe en la bbdd');
        //     // TENEMOS QUE CREAR ESTE USUARIO
        //     const $user = {
        //         email: user.email,
        //         userData: {
        //             username: user.nickname,
        //             first_name: user.given_name,
        //             last_name: user.family_name,
        //             profilePicture: user.picture 
        //         }
        //     }

        // const request = await fetch(`${serverUrl}/api/user/createuser`, {
        //     method: "POST",
        //     body: JSON.stringify($user),
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`
        //     }
        // });
        // const data = await request.json()
        // console.log(data.post);
        // setuserLoged(data.post)
        // setMessage(data.mensaje);
    }
}