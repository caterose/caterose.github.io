import React, { useContext, useCallback, useState } from 'react';
import { CursorContext } from '../../context/cursor-context';
import { useSpring, animated } from '@react-spring/web';

import './nav-bar.css';

interface NavBarProps {
  onNavigate: (pageKey: string) => void;
}

const pages = [
  { label: 'ABOUT.', key: 'about' },
  { label: 'RESEARCH.', key: 'research' },
  { label: 'PROJECTS.', key: 'projects' },
  { label: 'ART.', key: 'art' },
  { label: 'CONTACT.', key: 'contact' },
];

const WiggleLink: React.FC<{ label: string; pageKey: string; onClick: () => void }> = ({
  label,
  pageKey,
  onClick,
}) => {
  const [, setCursor] = useContext(CursorContext);
  const [hovered, setHovered] = useState(false);

  const styles = useSpring({
    to: async (next) => {
      if (hovered) {
        while (hovered) {
          await next({ rotate: 3 });
          await next({ rotate: -3 });
          await next({ rotate: 0 });
        }
      } else {
        await next({ rotate: 0 });
      }
    },
    from: { rotate: 0 },
    config: { tension: 200, friction: 8 },
  });

  const activateCursor = useCallback(() => {
    setHovered(true);
    setCursor({ active: true });
  }, [setCursor]);

  const deactivateCursor = useCallback(() => {
    setHovered(false);
    setCursor({ active: false });
  }, [setCursor]);

  return (
    <div
      className="nav-item"
      onMouseEnter={activateCursor}
      onMouseLeave={deactivateCursor}
      onClick={onClick}
    >
      <animated.span style={{ display: 'inline-block', ...styles }}>{label}</animated.span>
    </div>
  );
};

const NavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
  return (
    <div className="nav-bar">
      {pages.map(({ label, key }) => (
        <WiggleLink key={key} label={label} pageKey={key} onClick={() => onNavigate(key)} />
      ))}
    </div>
  );
};

export default NavBar;

// import React, { useContext, useCallback, useState } from "react";
// import { CursorContext } from "../../context/cursor-context";
// import { useSpring, animated } from "@react-spring/web";

// import "./nav-bar.css";

// const pages = [
//   { label: "about.", path: "#about" },
//   { label: "experience.", path: "#experience" },
//   { label: "projects.", path: "#projects" },
//   { label: "contact.", path: "#contact" },
//   { label: "resume.", path: "#resume" },
// ];

// const WiggleLink: React.FC<{ label: string; path: string }> = ({
//   label,
//   path,
// }) => {
//   const [, setCursor] = useContext(CursorContext);
//   const [hovered, setHovered] = useState(false);

//   const styles = useSpring({
//     to: async (next) => {
//       if (hovered) {
//         while (hovered) {
//           await next({ rotate: 3 });
//           await next({ rotate: -3 });
//           await next({ rotate: 0 });
//         }
//       } else {
//         await next({ rotate: 0 });
//       }
//     },
//     from: { rotate: 0 },
//     config: { tension: 200, friction: 8 },
//   });

//   const activateCursor = useCallback(() => {
//     setHovered(true);
//     setCursor({ active: true });
//   }, [setCursor]);

//   const deactivateCursor = useCallback(() => {
//     setHovered(false);
//     setCursor({ active: false });
//   }, [setCursor]);

//   return (
//     <div
//       className="nav-item"
//       onMouseEnter={activateCursor}
//       onMouseLeave={deactivateCursor}
//     >
//       <a href={path}>
//         <animated.span style={{ display: "inline-block", ...styles }}>
//           {label}
//         </animated.span>
//       </a>
//     </div>
//   );
// };

// function NavBar() {
//   return (
//     <div className="nav-bar">
//       {pages.map(({ label, path }) => (
//         <WiggleLink key={label} label={label} path={path} />
//       ))}
//     </div>
//   );
// }

// export default NavBar;
