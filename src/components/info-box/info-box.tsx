import React, { useState, useContext } from 'react';
// import { SvgIconProps } from "@mui/material/SvgIcon";
import { useIsMobile } from '../../hooks/use-is-mobile';
import { CursorContext } from '../../context/cursor-context';
import './info-box.css';

export interface InfoBoxProps {
  // icon: React.ComponentType<SvgIconProps>;
  color: string;
  title: string;
  description: string;
}

export default function InfoBox({
  // icon: Icon,
  // color,
  title,
  description,
}: InfoBoxProps) {
  const [, setCursor] = useContext(CursorContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showPullout, setShowPullout] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    if (isOpen) {
      setFadingOut(true);
      setShowPullout(false);
      setTimeout(() => {
        setIsOpen(false);
        setFadingOut(false);
      }, 300);
    } else {
      setIsOpen(true);
      setTimeout(() => {
        setShowPullout(true);
      }, 300);
      //   setTimeout(() => setShowPullout(true), 300);
    }
  };

  // const status =
  //   color === "power"
  //     ? "var(--primary-green)"
  //     : color === "hard"
  //       ? "var(--primary-yellow)"
  //       : "var(--primary-pink)"; // default

  return (
    <div className="outer-card">
      {isMobile ? (
        <div
          className="card"
          onClick={handleClick}
          onMouseEnter={() => setCursor({ active: true })}
          onMouseLeave={() => setCursor({ active: false })}
          style={{
            width: isOpen ? '300px' : '150px',
            minWidth: '150px',
            maxWidth: '300px',
            height: '150px',
            transition: 'width 0.25s ease',
          }}
        >
          <div className={`card-front`}>
            {/* <div className="icon-div">
              <Icon
                className="icon"
                sx={{ color: status, width: "75px", height: "75px" }}
              />
            </div> */}
            <h3 className="title body-text-3">{title}</h3>
          </div>
          <div
            className={`card-pullout ${showPullout ? 'visible' : fadingOut ? 'fading-out' : ''}`}
          >
            {description}
          </div>
        </div>
      ) : (
        <div
          className="card"
          onClick={handleClick}
          onMouseEnter={() => setCursor({ active: true })}
          onMouseLeave={() => setCursor({ active: false })}
          style={{
            width: isOpen ? '470px' : '200px',
            minWidth: '200px',
            maxWidth: '470px',
            height: '200px',
            transition: 'width 0.25s ease',
          }}
        >
          <div className={`card-front`}>
            {/* <div className="icon-div">
              <Icon
                className="icon"
                sx={{ color: status, width: "100px", height: "100px" }}
              />
            </div> */}
            <h3 className="title body-text-3">{title}</h3>
          </div>
          <div
            className={`card-pullout ${showPullout ? 'visible' : fadingOut ? 'fading-out' : ''}`}
          >
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
