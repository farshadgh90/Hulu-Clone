import React from "react";
import { MdHome, MdTrendingUp, MdLiveTv, MdCollectionsBookmark, MdSearch, MdPerson } from "react-icons/md"
import huluLogo from "../assets/Hulu-Logo.svg"
import request from "../request"
import "./css/Header.css"
import { Dropdown, Input } from "antd";

const Header = ({setSelectedOption}) => {
    const onSearch = (value) => {
        let val = String(value).replace(" " , "+")
        setSelectedOption(request.searchMovies + val)
    }

    return(
        <div className="header">
            <div className="header__icons">
                <div onClick={() => setSelectedOption(request.fetchAnimation)} className="header__icon">
                    <MdHome size={30} />
                    <p>Home</p>
                </div>
                <div onClick={() => setSelectedOption(request.fetchTrending)} className="header__icon">
                    <MdTrendingUp size={30} />
                    <p>Trending</p>
                </div>
                <div onClick={() => setSelectedOption(request.fetchTV)} className="header__icon">
                    <MdLiveTv size={30} />
                    <p>Verified</p>
                </div>
                <div className="header__icon">
                    <MdCollectionsBookmark size={30} />
                    <p>Collections</p>
                </div>
                <div className="header__icon">
                    <Dropdown
                        overlay={
                            <Input.Search
                                placeholder="Search Movies, Collection, TV..."
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch}
                            />
                        }
                        placement={"bottomLeft"}
                        overlayStyle={{
                            background:"transparent",
                        }}
                    >
                        <MdSearch size={30} />
                    </Dropdown>
                </div>
                <div className="header__icon">
                    <MdPerson size={30} />
                    <p>Account</p>
                </div>
            </div>
            <img src={huluLogo} alt="" />
        </div>
    )
}

export default Header