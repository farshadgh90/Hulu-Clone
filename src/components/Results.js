import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import "./css/Results.css"
import axios from "../axios"
import { Skeleton } from "antd";

const Results = ({selectedOption}) => {
    const [movies, setMovies] = useState()

    useEffect(() => {
        async function fetchData () {
            setMovies()
            const request = await axios.get(selectedOption)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    },[selectedOption])

    console.log("movies", movies);

    return(
        <div className="results">
            {!movies &&
                [...Array(20)].map((_, id) => (
                    <>
                        <div className="skeleton" key={id}>
                            <Skeleton.Input active />
                        </div>
                    </>
                ))
            }
            {
                movies?.map((data, id) => <VideoCard key={id} data={data} />)
            }
        </div>
    )
}

export default Results