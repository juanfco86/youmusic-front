import { Tab, Table, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { UploadSong } from '../Components/Modals/UploadSong/UploadSong';
import { setPlayer } from '../helpers/functions/setPlayer';
import { BsFillPlayFill } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';

export const AdminArtistPanel = () => {
    // Buscar el artista con el id del user, mostrar sus propiedades
    const dispatch = useDispatch();

    const usersData = useSelector(state => state.userSlice);
    const artistRedux = useSelector(state => state.artistSlice.list);
    const tracks = useSelector(state => state.trackSlice.list);

    const artist = artistRedux.find(e => usersData.userLogged._id === e.userId);
    const song_artist = tracks.filter(e => artist.name === e.artist);



    return (
        <div className="container mb-5">
            <div className="row no-gutters">
                <div className="img-panel col-md-4 col-lg-4"><img src={artist.thumbnail} /></div>
                <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                            <h3 className="display-5">{usersData.userLogged.userData.complete_name}</h3></div>
                        <div className="p-3 bg-black text-white">
                            <h6><UploadSong artist={artist} /></h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Tabs
                    defaultActiveKey="song"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="song" title="Song">

                        <div className="table-panel table-responsive">
                            <table className="table table-borderless mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                        </th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">ARTIST</th>
                                        <th scope="col">GENRE</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        song_artist.map((track) => {
                                            return (
                                                <tr key={uuidv4()}>
                                                    <th scope="row" onClick={() => setPlayer([track], dispatch, usersData)} className='cursor-pointer tdhover' >
                                                        <BsFillPlayFill />
                                                    </th>
                                                    <td>{track.name}</td>
                                                    <td>{track.artist}</td>
                                                    <td>{track.genre}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-outline-success btn-sm px-3">
                                                            <AiOutlineEdit />
                                                        </button>
                                                        {' '}
                                                        <button type="button" className="btn btn-outline-danger btn-sm px-3">
                                                            <AiFillDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                    <Tab eventKey="album" title="Album">
                        <div className="table-panel table-responsive">
                            <table className="table table-borderless mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                        </th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">ARTIST</th>
                                        <th scope="col">GENRE</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                        </th>
                                        <td>Tiger Nixon</td>
                                        <td>System Architect</td>
                                        <td>61</td>
                                        <td>
                                            <button type="button" className="btn btn-outline-success btn-sm px-3">
                                                <AiOutlineEdit />
                                            </button>
                                            {' '}
                                            <button type="button" className="btn btn-outline-danger btn-sm px-3">
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        </div>
    )
}
