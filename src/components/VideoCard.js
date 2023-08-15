import React, { useEffect, useState } from "react";
import { MdPoll } from "react-icons/md"
import { FaImdb, FaPlayCircle } from "react-icons/fa"
import ReactCardFlip from "react-card-flip"
import "./css/VideoCard.css"
import PreviewModal from "./utils/PreviewModal";
import { truncate } from "./utils/truncate"
import movieTrailer from "movie-trailer"

export const base_URL = "https://image.tmdb.org/t/p/original"

const VideoCard = ({data}) => {
    const [flipped, setFlipped] = useState(false)
    const [visible, setVisible] = useState(false)
    const [url, setUrl] = useState("")

    useEffect(() => {
        movieTrailer(data?.original_title || data?.title).then((res) => {
            setUrl(res)
        }).catch((err) => {
            console.log("Temporarily Unavailable");
        })
    }, [data?.original_title, data?.title])

    return(
        <>
            <ReactCardFlip isFlipped={!flipped} flipDirection="horizontal">
                {/* back side */}
                <div onClick={() => setFlipped(!flipped)} className="videoCard">
                    <h2>{truncate(data?.original_title || data?.title, 18)}</h2>
                    <p>{truncate(data?.overview, 150)}</p>
                    <span><MdPoll size={30} />{data?.vote_count} | {data?.release_date}</span>
                    <span className="v-imdb"><FaImdb size={30} />{data?.vote_average}</span>
                    <span onClick={() => setVisible(true)} className="v-play">
                        <FaPlayCircle color="#16DA8E" size={60} />
                        <strong>Watch Now</strong>
                    </span>
                </div>

                {/* front side */}
                <div onClick={() => setFlipped(!flipped)} className="videoCard">
                    <img src={`${base_URL}${data?.poster_path}`} alt="" />
                    <h3>{truncate(data?.original_title || data?.title, 18)}</h3>
                </div>
            </ReactCardFlip>
            <PreviewModal
                visible={visible}
                setVisible={setVisible}
                data={data}
                url={url}
            />
        </>
    )
}

export default VideoCard