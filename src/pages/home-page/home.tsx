import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import NavBar from '../../components/nav-bar/nav-bar';
import WiggleText from '../../components/wiggle-text/wiggle-text';
import ImageSwapSpring from '../../components/image-swap/image-swap';
import ProjectPage from '../project-page/project-page';
import TVResponsive from '../../sections/tv-responsive/tv-responsive';
import AboutPage from '../about-page/about-page';
import ContactPage from '../contact-page/contact-page';
import ExperiencePage from '../experience-page/experience-page';
import ResumePage from '../art-page/art-page';
import { DilloApp } from '../../sections/project-page/dillo-app/dillo-app';
import { MayfestSite } from '../../sections/project-page/mayfest-site/mayfest-site';
import type { ProjectData } from '../project-page/project-page';
import Hello from '../../sections/about-page/hello/hello';
import HeroSection from '../../sections/hero/hero';
import type { PageItem } from '../../components/page-mapping/page-mapping';

import './home.css';
import GallerySection from '../../sections/about-page/gallery/gallery';
import ArtPage from '../art-page/art-page';
import PenDrawingGallery from '../../sections/about-page/bic-pen/bic-pen';

interface HomePageProps {
  text: string;
  // ADD IN
}

const aboutItems: PageItem[] = [
  // {
  //   key: 'hero',
  //   component: Hero,
  //   props: {
  //     bkgdImages: ['/hero/1.jpeg', '/hero/2.jpeg', '/hero/3.jpeg', '/hero/4.jpeg', '/hero/5.jpeg'],
  //   },
  //   // bg: 'var(--secondary-green)' // optional background behind the panel
  // },

  {
    key: 'hero',
    component: PenDrawingGallery,
    props: {
      images: [
        'public/art/pen-drawings/1.jpeg',
        'public/art/pen-drawings/2.jpeg',
        'public/art/pen-drawings/3.jpeg',
        'public/art/pen-drawings/4.jpeg',
        'public/art/pen-drawings/5.jpeg',
        'public/art/pen-drawings/6.jpeg',
        'public/art/pen-drawings/7.jpeg',
        'public/art/pen-drawings/8.jpeg',
        'public/art/pen-drawings/9.jpeg',
        'public/art/pen-drawings/10.jpeg',
        'public/art/pen-drawings/11.jpeg',
        'public/art/pen-drawings/12.jpeg',
        'public/art/pen-drawings/13.jpeg',
        'public/art/pen-drawings/14.jpeg',
        'public/art/pen-drawings/15.jpeg',
        'public/art/pen-drawings/16.jpeg',
        'public/art/pen-drawings/17.jpeg',
        'public/art/pen-drawings/18.jpeg',
      ],
      captions: ['caption1', 'caption2', 'caption3'],
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'hello',
    component: Hello,
    props: {
      interests: [
        ['interest1', 'interest2', 'interest3', 'interest4', 'interest5'],
        ['interest1', 'interest2', 'interest3', 'interest4', 'interest5'],
        ['interest1', 'interest2', 'interest3', 'interest4', 'interest5'],
      ],
    },
    bg: 'var(--neutral-white)', // optional background behind the panel
  },
  {
    key: 'gallery',
    component: GallerySection,
    props: {
      images: [
        // 'public/gallery/artClass.jpeg',
        // 'public/gallery/artInstitute.jpeg',
        // 'public/gallery/DIY.jpeg',
        // 'public/gallery/exploreChi.jpeg',
        // 'public/gallery/firstSnow.jpeg',
        // 'public/gallery/homeMeadow.jpeg',
        // 'public/gallery/mkgee.jpeg',
        // 'public/gallery/PA.jpeg',
        // 'public/gallery/paintProgress.jpeg',
        // 'public/gallery/ravyn.jpeg',
        // 'public/gallery/skating.jpeg',
        // 'public/gallery/tidepool.jpeg',
        // 'public/gallery/tourism.jpeg',
        // 'public/gallery/trevorNoah.jpeg',
        // 'public/gallery/workingDillo.jpeg',
      ],
      captions: ['caption1', 'caption2', 'caption3'],
    },
    bg: 'var(--neutral-white)',
  },
  // you can add more pages below (any components)
];

// import { DilloApp } from '../../sections/project-page/dillo-app/dillo-app';
// import { MayfestSite } from '../../sections/project-page/mayfest-site/mayfest-site';
// import type { PageItem } from './PageMapping';

export const projectItems: PageItem[] = [
  {
    key: 'dillo-app',
    component: DilloApp,
    props: {
      title: 'Dillo Day: Mobile Application',
      job: 'Co-director of Technology, Lead UI/UX and Graphics Designer, Front-end Engineer',
      description:
        'Mobile application for the Dillo Day festival, attended by over 12,000 participants every year in Evanston, IL. App includes artist lineups, real-time announcements, a festival map, a Spotify integration feature (‘Find Your Cabin Mate’), and a contact section.',
      images: ['/phone.png', '/phone2.jpeg'],
      nodes: ['X', 'XX'],
      link: '',
    },
    bg: 'var(--secondary-green)',
  },
  {
    key: 'mayfest-site',
    component: MayfestSite,
    props: {
      title: 'Mayfest Productions: Website',
      job: '',
      description:
        'Website for Mayfest Productions, the Northwestern Student organization that organizes and runs the annual Dillo Day music festival, amongst other events. Information includes an organization overview, information about the team, upcoming events, and more.',
      images: ['mayfest-website.png'],
      nodes: ['X', 'XX'],
      link: '',
    },
    bg: 'var(--secondary-green)',
  },
  {
    key: 'dillo-site',
    component: MayfestSite,
    props: {
      title: 'Dillo Day: Website',
      job: '',
      description:
        'Website for Dillo Day, the US’s largest student-run music festival hosting ~12,000 attendees every year. Information includes lineup information, rules and logistics for entry, photos from past festivals, links to the mobile application, and more.',
      images: [],
      nodes: ['X', 'XX'],
      link: '',
    },
    bg: 'var(--secondary-green)',
  },
];

const artItems: PageItem[] = [
  {
    key: 'hero',
    component: HeroSection,
    props: {
      title: 'ART.',
      images: [
        'public/art/pen-drawings/1.jpeg',
        'public/art/pen-drawings/2.jpeg',
        'public/art/pen-drawings/3.jpeg',
        'public/art/pen-drawings/4.jpeg',
        'public/art/pen-drawings/5.jpeg',
        'public/art/pen-drawings/6.jpeg',
        'public/art/pen-drawings/7.jpeg',
        'public/art/pen-drawings/8.jpeg',
        'public/art/pen-drawings/9.jpeg',
        'public/art/pen-drawings/10.jpeg',
        'public/art/pen-drawings/11.jpeg',
        'public/art/pen-drawings/12.jpeg',
        'public/art/pen-drawings/13.jpeg',
        'public/art/pen-drawings/14.jpeg',
        'public/art/pen-drawings/15.jpeg',
        'public/art/pen-drawings/16.jpeg',
        'public/art/pen-drawings/17.jpeg',
        'public/art/pen-drawings/18.jpeg',
      ],
    },
    bg: 'var(--neutral-black)',
  },
];

// const projects: ProjectData[] = [
//   {
//     type: 'dillo',
//     title: 'Dillo Day: Mobile Application',
//     // className: "dillo-app",
//     job: 'Co-director of Technology, Lead UI/UX and Graphics Designer, Front-end Engineer',
//     description:
//       'Mobile application for the Dillo Day festival, attended by over 12,000 participants every year in Evanston, IL. App includes artist lineups, real-time announcements, a festival map, a Spotify integration feature (‘Find Your Cabin Mate’), and a contact section.',
//     images: ['/phone.png', '/phone2.jpeg'],
//     nodes: ['X', 'XX'],
//     link: '',
//     bg: 'var(--secondary-green)',
//     // bg: '#ff6b6b',
//   },
//   {
//     type: 'mayfest',
//     title: 'Mayfest Productions: Website',
//     // className: "mayfest-website",
//     job: '',
//     description:
//       'Website for Mayfest Productions, the Northwestern Student organization that organizes and runs the annual Dillo Day music festival, amongst other events. Information includes an organization overview, information about the team, upcoming events, and more. ',
//     images: ['mayfest-website.png'],
//     nodes: ['X', 'XX'],
//     link: '',
//     bg: 'var(--secondary-green)',
//     // bg: '#6bc1ff',
//   },
//   {
//     type: 'mayfest',
//     title: 'Dillo Day: Website',
//     job: '',
//     description:
//       'Website for Dillo Day, the US’s largest student-run music festival hosting ~12,000 attendees every year. Information includes lineup information, rules and logistics for entry, photos from past festivals, links to the mobile application, and more.',
//     nodes: ['X', 'XX'],
//     images: [],
//     link: '',
//     bg: 'var(--secondary-green)',
//     // bg: '#c86bff',
//   },
// ];

const COMPONENT_MAP = {
  about: <AboutPage pages={aboutItems} />,
  experience: <ExperiencePage />,
  projects: <ProjectPage projects={projectItems} />,
  art: <ArtPage pages={artItems} />,
  contact: <ContactPage />,
};

const HomePage: React.FC<HomePageProps> = ({ text }: HomePageProps) => {
  const [activePage, setActivePage] = useState<keyof typeof COMPONENT_MAP>('about');
  const [rotationCount, setRotationCount] = useState(0);

  const rotationStyles = useSpring({
    transform: `rotate(${rotationCount * 45}deg)`,
    config: { tension: 200, friction: 30 },
  });

  // When a new page is selected
  const handleNavigate = (page: keyof typeof COMPONENT_MAP) => {
    setActivePage(page);
    setRotationCount((prev) => prev + 1); // Triggers rotation update
  };

  // const [expanded, setExpanded] = useState(false);

  // const styles = useSpring({
  //   width: expanded ? 300 : 100,
  //   height: expanded ? 300 : 100,
  //   backgroundColor: expanded ? "#6bc1ff" : "#ff6b6b",
  //   config: { tension: 250, friction: 20 },
  // });

  // const styles = useSpring({
  //   width: expanded ? 300 : 100,
  //   height: expanded ? 300 : 100,
  //   backgroundColor: expanded ? "#6bc1ff" : "#ff6b6b",
  //   config: { tension: 250, friction: 20 },
  // });

  return (
    <div className="home">
      <NavBar onNavigate={handleNavigate} />

      <TVResponsive
        child={COMPONENT_MAP[activePage]}
        dial={
          <animated.div style={rotationStyles} className="dial">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="110"
              height="110"
              viewBox="0 0 118 118"
              fill="none"
            >
              <path
                d="M57.7402 2.87402C58.3311 1.95902 59.6689 1.95902 60.2598 2.87402L64.8721 10.0186C65.6799 11.2699 67.3958 11.5411 68.5508 10.6006L75.1455 5.23145C75.9903 4.54375 77.2629 4.95775 77.542 6.01074L79.7207 14.2305C80.1023 15.6703 81.6509 16.4585 83.04 15.9209L90.9707 12.8525C91.9867 12.4595 93.0697 13.2463 93.0098 14.334L92.541 22.8242C92.459 24.3115 93.6885 25.541 95.1758 25.459L103.666 24.9902C104.754 24.9303 105.541 26.0133 105.147 27.0293L102.079 34.96C101.542 36.3491 102.33 37.8977 103.77 38.2793L111.989 40.458C113.042 40.7371 113.456 42.0097 112.769 42.8545L107.399 49.4492C106.459 50.6042 106.73 52.3201 107.981 53.1279L115.126 57.7402C116.041 58.3311 116.041 59.6689 115.126 60.2598L107.981 64.8721C106.73 65.6799 106.459 67.3958 107.399 68.5508L112.769 75.1455C113.456 75.9903 113.042 77.2629 111.989 77.542L103.77 79.7207C102.33 80.1023 101.542 81.6509 102.079 83.04L105.147 90.9707C105.541 91.9867 104.754 93.0697 103.666 93.0098L95.1758 92.541C93.6885 92.459 92.459 93.6885 92.541 95.1758L93.0098 103.666C93.0697 104.754 91.9867 105.541 90.9707 105.147L83.04 102.079C81.6509 101.542 80.1023 102.33 79.7207 103.77L77.542 111.989C77.2629 113.042 75.9903 113.456 75.1455 112.769L68.5508 107.399C67.3958 106.459 65.6799 106.73 64.8721 107.981L60.2598 115.126C59.6689 116.041 58.3311 116.041 57.7402 115.126L53.1279 107.981C52.3201 106.73 50.6042 106.459 49.4492 107.399L42.8545 112.769C42.0097 113.456 40.7371 113.042 40.458 111.989L38.2793 103.77C37.8977 102.33 36.3491 101.542 34.96 102.079L27.0293 105.147C26.0133 105.541 24.9303 104.754 24.9902 103.666L25.459 95.1758C25.541 93.6885 24.3115 92.459 22.8242 92.541L14.334 93.0098C13.2463 93.0697 12.4595 91.9867 12.8525 90.9707L15.9209 83.04C16.4585 81.6509 15.6703 80.1023 14.2305 79.7207L6.01074 77.542C4.95775 77.2629 4.54375 75.9903 5.23145 75.1455L10.6006 68.5508C11.5411 67.3958 11.2699 65.6799 10.0186 64.8721L2.87402 60.2598C1.95902 59.6689 1.95902 58.3311 2.87402 57.7402L10.0186 53.1279C11.2699 52.3201 11.5411 50.6042 10.6006 49.4492L5.23145 42.8545C4.54375 42.0097 4.95775 40.7371 6.01074 40.458L14.2305 38.2793C15.6703 37.8977 16.4585 36.3491 15.9209 34.96L12.8525 27.0293C12.4595 26.0133 13.2463 24.9303 14.334 24.9902L22.8242 25.459C24.3115 25.541 25.541 24.3115 25.459 22.8242L24.9902 14.334C24.9303 13.2463 26.0133 12.4595 27.0293 12.8525L34.96 15.9209C36.3491 16.4585 37.8977 15.6703 38.2793 14.2305L40.458 6.01074C40.7371 4.95775 42.0097 4.54375 42.8545 5.23145L49.4492 10.6006C50.6042 11.5411 52.3201 11.2699 53.1279 10.0186L57.7402 2.87402Z"
                stroke="#1A53E6"
              />
              <circle cx="59" cy="59" r="40.5" stroke="#1A53E6" />
              <rect
                x="54"
                y="12.5"
                width="10"
                height="46"
                rx="4.5"
                fill="#FBF6F3"
                stroke="#1A53E6"
              />
            </svg>
          </animated.div>
        }
      />
      {/* </div> */}

      {/* <TVResponsive child={<h1>Hello</h1>}/> */}

      {/* <ProjectPage projects={projects} /> */}

      {/* //! IGNORE THE REST HERE */}
      {/* <ExpandableCard /> */}
      {/* <Parallax pages={2} className="animation">
        <ParallaxLayer offset={0} speed={0}>
          <div className="welcome">
            <WiggleText className="h1" text="H" />
            <WiggleText className="h1" text="e" />
            <WiggleText className="h1" text="l" />
            <WiggleText className="h1" text="l" />
            <WiggleText className="h1" text="o" />
            <WiggleText className="h1" text="." />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0}>
          <h1 style={{ fontSize: "5rem" }}>my name is cate rose.</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1}>
          <img src="picture-of-me.svg" alt="doodle profile of cate rose" />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: "red" }}>
          <p style={{ fontSize: "5rem" }}>{text}</p>
        </ParallaxLayer>
      </Parallax> */}
    </div>
  );
};

export default HomePage;
