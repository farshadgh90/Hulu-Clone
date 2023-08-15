import React, { useEffect, useState } from "react";
import { Modal, Tooltip } from "antd"
import ReactPlayer from "react-player"
import { MdPoll } from "react-icons/md";
import { FaImdb } from "react-icons/fa";
import "./PreviewModal.css"
import { base_URL } from "../VideoCard";
import axios from "axios";
import request, { API_KEY } from "../../request"

const PreviewModal = ({visible, setVisible, data, url}) => {
    const [movieD, setMovieD] = useState()

    useEffect(() => {
        axios.get(request.getMovieDetails + `/${data?.id}?api_key=${API_KEY}&language=en-us`)
        .then((res) => {
            setMovieD(res?.data)
        })
    })

    return(
        <Modal
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            onOk={() => setVisible(false)}
            width={1060}
            footer={null}
            destroyOnClose
        >
            <div className="modal-container">
                {/* left side */}
                <div className="modal-container-left">
                    <ReactPlayer
                        height={400}
                        width="100%"
                        light={`${base_URL}${data?.backdrop_path}`}
                        url={url}
                        controls={true}
                        pip={true}
                    />
                </div>

                {/* right side */}
                <div className="modal-container-right">
                    <h2>{data?.original_title || data?.title}</h2>
                    <span>
                        <small>{movieD?.tagline}</small>
                    </span>
                    <p>{data?.overview}</p>
                    <p>Run Time : {movieD?.runtime} Mins</p>
                    <p>
                        Genre :
                        {
                            movieD?.genres?.map((_data, id) => <span key={id}> {_data?.name}</span>)
                        }
                    </p>
                    <span className="vote-count"><MdPoll /> {data?.vote_count} | {data?.release_date}</span>
                    <span className="vote-average"><FaImdb /> {data?.vote_average}</span>
                    <span className="production">
                        Production Houses:
                        {
                            movieD?.production_companies?.map((_,id) =>
                                <Tooltip
                                    title={_?.name}
                                    placement={""}
                                    key={id}
                                >
                                    <img
                                        src={`${base_URL}${_?.logo_path}`}
                                        alt=""
                                        height={30}
                                        width={100}
                                        style={{
                                            margin: "0 10px"
                                        }}
                                    />
                                </Tooltip>
                            )
                        }

                    </span>
                </div>
            </div>
        </Modal>
    )
}

export default PreviewModal