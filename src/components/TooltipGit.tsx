import { Link2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const TooltipGit = () => {
    return (
        <StyledWrapper>
            <div className="tooltip-container">
                <div className="tooltip">
                    <div className="profile">
                        <div className="user">
                            <div className="img"><Image src={'/dev.jpg'} width={50} height={50} className='overflow-hidden' alt='ceo'/></div>
                            <div className="details">
                                <div className="name uppercase">Inam</div>
                                <div className="username"><Link href="https://github.com/MANI-WEBDEVE/" target='_blank'>@MANI-WEBDEVE</Link></div>
                            </div>
                        </div>
                        <div className="about">22+ Followers</div>
                    </div>
                </div>
                <div className="text">
                    <div className="icon" >
                        <div className="layer">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span className="instagramSVG">
                                <svg fill="white" className="svgIcon" viewBox="0 0 24 24" height="1.5em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.006.403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.577C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                            </span>
                        </div>
                        <div className="text upperace font-medium">GitHub</div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .tooltip-container {
        position: relative;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 17px;
        border-radius: 10px;
    }

    .tooltip {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
        border-radius: 15px;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
            inset -5px -5px 15px rgba(255, 255, 255, 0.1),
            5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
    }

    .profile {
        background: #fff;
        border-radius: 10px 15px;
        padding: 10px;
        border: 1px solid #000;
    }

  .tooltip-container:hover .tooltip {
    top: -150px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .icon {
    text-decoration: none;
    color: #000;
    display: block;
    position: relative;
  }
  .layer {
    width: 55px;
    height: 55px;
    transition: transform 0.3s;
  }
  .icon:hover .layer {
    transform: rotate(-35deg) skew(20deg);
  }
  .layer span {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid #000;
    border-radius: 15px;
    transition: all 0.3s;
  }

  .layer span,
  .text {
    color: #fff;
    border-color: #000;
  }

  .icon:hover.layer span {
    box-shadow: -1px 1px 3px #000;
  }
  .icon .text {
    position: absolute;
    left: 50%;
    bottom: -5px;
    opacity: 0;
    font-weight: 500;
    transform: translateX(-50%);
    transition: bottom 0.3s ease, opacity 0.3s ease;
  }
  .icon:hover .text {
    bottom: -35px;
    opacity: 1;
  }

  .icon:hover .layer span:nth-child(1) {
    opacity: 0.2;
  }
  .icon:hover .layer span:nth-child(2) {
    opacity: 0.4;
    transform: translate(5px, -5px);
  }
  .icon:hover .layer span:nth-child(3) {
    opacity: 0.6;
    transform: translate(10px, -10px);
  }
  .icon:hover .layer span:nth-child(4) {
    opacity: 0.8;
    transform: translate(15px, -15px);
  }
  .icon:hover .layer span:nth-child(5) {
    opacity: 1;
    transform: translate(20px, -20px);
  }

  .instagramSVG {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
  }
  .user {
    display: flex;
    gap: 10px;
  }
  .img {
    width: 70px;
    height: 50px;
    font-size: 25px;
    font-weight: 700;
    border: 1px solid #000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    overflow: hidden;
  }
  .name {
    font-size: 17px;
    font-weight: 700;
    color: #000;
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 0;
    color: #000;
  }
  .about {
    color: #000;
    padding-top: 5px;
  }`;

export default TooltipGit;
