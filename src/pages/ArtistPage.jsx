import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AlbumSlider from '../Components/Slider/AlbumSlider/AlbumSlider';
import Slider from '../Components/Slider/Slider';
import { TopInfoArtist } from '../Components/TopInfo/TopInfoArtist/TopInfoArtist';
import { setPlayer } from '../helpers/functions/setPlayer';

export const ArtistPage = () => {
    const { id } = useParams();
    const artists = useSelector(state => state.artistSlice);
    const artist = artists.list.find((element) => element.id === parseInt(id));
    const tracks = useSelector(state => state.trackSlice);
    const tracksArtist = tracks.list.filter((track) => track.artist === artist.name);
    const albums = useSelector(state => state.albumSlice);
    const album = albums.list.filter((album) => album.artist === artist.name);

    let listGenreArtist = [];
    const genreSong = artist.genres.map((genre) => listGenreArtist = [...listGenreArtist, tracks.list.filter((track) => track.genre === genre)]);
    const similarSongs = listGenreArtist.flat()

    return (
        <>
            <TopInfoArtist data={artist} />
            <div className='container mb-4'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tracksArtist.map((track) => {
                                return (
                                    <tr className='cursor-pointer'>
                                        <td onClick={() => setPlayer(track)} className='cursor-pointer tdhover'><BsFillPlayFill /></td>
                                        <td>{track.name}</td>
                                        <td>{track.artist}</td>
                                        <td>{track.genre}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="container mt-2 mb-4">
                <AlbumSlider
                    slidesPerView={2}
                    size='small'
                    img='img__small'
                    array={album}
                    title='Artist albums'
                    breakpoints={{
                        600: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        992: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                        },
                        1400: {
                            slidesPerView: 8,
                            spaceBetween: 10,
                        }
                    }}
                />
            </div>
            <div className="container mt-2 mb-4">
                <Slider
                    slidesPerView={2}
                    size='small'
                    img='img__small'
                    array={similarSongs}
                    title='Similar songs'
                    breakpoints={{
                        600: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        992: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                        },
                        1400: {
                            slidesPerView: 8,
                            spaceBetween: 10,
                        }
                    }}
                />
            </div>
            {
                listGenreArtist.map((e) => {
                    const capitalizeGenre = e[0].genre.charAt(0).toUpperCase() + e[0].genre.slice(1);

                    return (
                        <div className="container mt-2 mb-4">
                            <Slider
                                slidesPerView={2}
                                size='small'
                                img='img__small'
                                array={e}
                                title={capitalizeGenre}
                                breakpoints={{
                                    600: {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                    },
                                    992: {
                                        slidesPerView: 5,
                                        spaceBetween: 10,
                                    },
                                    1200: {
                                        slidesPerView: 7,
                                        spaceBetween: 10,
                                    },
                                    1400: {
                                        slidesPerView: 8,
                                        spaceBetween: 10,
                                    }
                                }}
                            />
                        </div>
                    )
                })
            }

        </>
    )
}