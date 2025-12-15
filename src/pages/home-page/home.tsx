import React, { useState, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';
import NavBar from '../../components/nav-bar/nav-bar';
import ProjectPage from '../project-page/project-page';
import TVResponsive from '../../sections/tv-responsive/tv-responsive';
import AboutPage from '../about-page/about-page';
import ContactPage from '../contact-page/contact-page';
import ResearchPage from '../research-page/research-page';
import StaticTransition from '../../sections/transitions/static/static';
import type { PageItem } from '../../components/page-mapping/page-mapping';

import './home.css';
import ArtPage from '../art-page/art-page';
import { ProjectStandard } from '../../sections/project-page/project-standard/project-standard';
import { GalleryStandard } from '../../sections/project-page/gallery-standard/gallery-standard';
import PenDrawingGallery from '../../sections/about-page/bic-pen/bic-pen';
import Hello from '../../sections/about-page/hello/hello';
import HeroSection from '../../sections/hero/hero';

interface HomePageProps {
  text: string;
}

const aboutItems: PageItem[] = [
  {
    key: 'hero',
    component: PenDrawingGallery,
    props: {
      images: [
        '/art/pen-drawings/1.jpeg',
        '/art/pen-drawings/2.jpeg',
        '/art/pen-drawings/3.jpeg',
        '/art/pen-drawings/4.jpeg',
        '/art/pen-drawings/5.jpeg',
        '/art/pen-drawings/6.jpeg',
        '/art/pen-drawings/7.jpeg',
        '/art/pen-drawings/8.jpeg',
        '/art/pen-drawings/9.jpeg',
        '/art/pen-drawings/10.jpeg',
        '/art/pen-drawings/11.jpeg',
        '/art/pen-drawings/12.jpeg',
        '/art/pen-drawings/13.jpeg',
        '/art/pen-drawings/14.jpeg',
        '/art/pen-drawings/15.jpeg',
        '/art/pen-drawings/16.jpeg',
        '/art/pen-drawings/17.jpeg',
        '/art/pen-drawings/18.jpeg',
        '/art/pen-drawings/19.jpeg',
      ],
      // captions: ['caption1', 'caption2', 'caption3'],
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'hello',
    component: Hello,
    props: {
      interests: [
        [
          'Human-Centered Design',
          'JavaScript',
          'Accessibility',
          'Python',
          'History of Technology',
          'TypeScript',
          'Responsible AI',
        ],
        [
          'Figma',
          'Visual Art',
          'Machine Learning',
          'Human–Computer Interaction',
          'Student Mentorship',
          'Music & Community',
          'Design Systems',
        ],
      ],
    },
    bg: 'var(--neutral-white)',
  },
];

// ! =============

const researchItems: PageItem[] = [
  {
    key: 'hero',
    component: HeroSection,
    props: {
      title: 'RESEARCH.',
      images: [],
    },
    bg: 'var(--neutral-black)',
  },
  {
    key: 'history-research',
    component: ProjectStandard,
    props: {
      title: 'Leopold Research Fellow',
      job: 'Prof. Daniel Immerwahr, Northwestern Department of History',
      description:
        "Researching fire and capitalism in American history for US Foreign Relations expert Prof. Daniel Immerwahr's upcoming book and writing research reports to summarize key findings. Revised the Past & Present journal article 'All That is Solid Bursts into Flame: Capitalism and Fire in the Nineteenth-Century United States' and the New Yorker article 'Beyond the Myth of Rural America'",
      images: ['/research/rural-america.png'],
      nodes: ['Archival Research', 'Research Synthesis', 'Scholarly Writing', 'Editorial Revision'],
      link: '',
      otherLinks: [
        {
          label:
            'All That is Solid Bursts into Flame: Capitalism and Fire in the Nineteenth-Century United States',
          url: 'https://faculty.wcas.northwestern.edu/daniel-immerwahr/Immerwahr_Capitalism_Fire.pdf',
        },
        {
          label: 'Beyond the Myth of Rural America',
          url: 'https://www.newyorker.com/magazine/2023/10/23/beyond-the-myth-of-rural-america',
        },
      ],
      date: '2024',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'cs-research',
    component: ProjectStandard,
    props: {
      title: 'AI Student Researcher',
      job: 'Prof. Mohammed Alam, Northwestern Department of Computer Science',
      description: [
        "With Prof. Mohammed Alam (Deputy Director of Northwestern MS in AI), I’m building TechnoPsychology—a research project at the intersection of computation and cognitive science. Using Python tooling and LLM APIs, we're studying the structuring of knowledge within large language models, focusing on how these systems store, retrieve, and combine information. The work aims to make AI interactions more understandable and empowering for users.",
      ],
      images: [],
      nodes: ['Python', 'OpenAI API', 'AI'],
    },
    bg: 'var(--neutral-white)',
  },
];

// ! =============

const projectItems: PageItem[] = [
  {
    key: 'hero',
    component: HeroSection,
    props: {
      title: 'PROJECTS.',
      images: [],
    },
    bg: 'var(--neutral-black)',
  },
  {
    key: 'edtech-startup',
    component: ProjectStandard,
    props: {
      title: 'Stealth Startup (EdTech): Redesigning the Internship Process',
      job: 'Design & Development Lead',
      description:
        "Lead UI/UX design and front-end development for the startup's MVP (web platform), focused on aiding workforce augmentation through crowd-sourced problem solving. Responsibilities included creating a comprehensive design system in Figma to support accessibility and responsiveness and building/implementing a reusable component library. Collaborated closely with senior mentors at ArcTouch throughout the process, receiving training in engineering best practices, code reviews, Jira, Storybook, and GitHub workflows.",
      images: [
        '/projects/prw_web/browse_projects.png',
        '/projects/prw_web/find_project.png',
        '/projects/prw_web/find_people.png',
      ],
      nodes: ['TypeScript', 'React', 'Figma', 'Storybook', 'REST APIs', 'Accessibility', 'UI/UX'],
      link: '',
      date: '2024',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'dillo-app-24',
    component: ProjectStandard,
    props: {
      title: 'Dillo Day 2024: Mobile Application',
      job: 'Co-Director of Design & Development, Mayfest Productions',
      description:
        "Mobile application built for Northwestern University's Dillo Day festival, attended by over 12,000 people each year in Evanston, IL. App includes artist lineups, real-time announcements, a festival map, a Spotify integration feature (e.g. ‘Find Your Cabin Mate’), and a contact section.",
      images: [
        '/projects/dillo-app/23_artists.png',
        '/projects/dillo-app/23_help.png',
        '/projects/dillo-app/23_home.png',
      ],
      nodes: ['TypeScript', 'React', 'Figma', 'Mobile App', 'UI/UX'],
      link: 'https://apps.apple.com/us/app/dillo-day-2024/id6502626702',
      date: '2024',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'dillo-app-25',
    component: ProjectStandard,
    props: {
      title: 'Dillo Day 2025: Mobile Application',
      job: 'Co-Director of Design & Development, Mayfest Productions',
      description:
        'Mobile application for the Dillo Day festival, attended by over 12,000 participants every year in Evanston, IL. App includes artist lineups, real-time announcements, an interactive festival map, a ‘Tarot reading’ feature, food truck menus, and more.',
      images: [
        '/projects/dillo-app/24_home.jpeg',
        '/projects/dillo-app/24_artist.png',
        '/projects/dillo-app/24_nav.png',
      ],
      nodes: ['TypeScript', 'React', 'Figma', 'Mobile App', 'UI/UX'],
      link: 'https://apps.apple.com/us/app/dillo-day-2025/id6745717280',
      date: '2025',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'dillo-site',
    component: ProjectStandard,
    props: {
      title: 'Dillo Day: Website',
      job: 'Co-Director of Design & Development, Mayfest Productions',
      description:
        'Website for Dillo Day, the US’s largest student-run music festival hosting ~12,000 attendees every year. Information includes lineup information, rules and logistics for entry, photos from past festivals, links to the mobile application, and more.',
      images: [
        '/projects/dillo-web/dillo_home.png',
        '/projects/dillo-web/meet_mayfest.png',
        '/projects/dillo-web/past_lineups.png',
      ],
      nodes: ['TypeScript', 'React', 'Figma', 'Web Development', 'UI/UX'],
      link: 'https://www.dilloday.com/',
      date: '2024',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'mayfest-site',
    component: ProjectStandard,
    props: {
      title: 'Mayfest Productions: Website Mockups',
      job: 'Co-Director of Design & Development, Mayfest Productions',
      description:
        'Assorted Figma mockups for Mayfest Productions website, the Northwestern Student organization that organizes and runs the annual Dillo Day music festival, amongst other events. Information includes an organization overview, information about the team, upcoming events, and more.',
      images: [
        '/projects/dillo-web/mayfest_page.png',
        '/projects/dillo-web/mayfest_events.png',
        '/projects/dillo-web/mayfest_past.png',
      ],
      nodes: ['TypeScript', 'React', 'Figma', 'Web Development', 'UI/UX'],
      link: '',
      date: '2025',
    },
    bg: 'var(--neutral-white)',
  },
];

// ! ==================================

const artItems: PageItem[] = [
  {
    key: 'hero',
    component: HeroSection,
    props: {
      title: 'ART.',
      images: ['/art/pen-drawings/3.jpeg'],
    },
    bg: 'var(--neutral-black)',
  },
  {
    key: 'sketches',
    component: GalleryStandard,
    props: {
      title: 'Assorted illustrations',
      job: 'Ballpoint pen',
      description: '',
      images: [
        '/art/pen-drawings/21.jpeg',
        '/art/pen-drawings/20.jpeg',
        '/art/pen-drawings/23.png',
        '/art/pen-drawings/24.png',
        '/art/pen-drawings/22.jpeg',
        '/art/pen-drawings/1.jpeg',
        '/art/pen-drawings/2.jpeg',
        '/art/pen-drawings/3.jpeg',
        '/art/pen-drawings/4.jpeg',
        '/art/pen-drawings/5.jpeg',
        '/art/pen-drawings/6.jpeg',
        '/art/pen-drawings/7.jpeg',
        '/art/pen-drawings/8.jpeg',
        '/art/pen-drawings/9.jpeg',
        '/art/pen-drawings/10.jpeg',
        '/art/pen-drawings/11.jpeg',
        '/art/pen-drawings/12.jpeg',
        '/art/pen-drawings/13.jpeg',
        '/art/pen-drawings/14.jpeg',
        '/art/pen-drawings/15.jpeg',
        '/art/pen-drawings/16.jpeg',
        '/art/pen-drawings/17.jpeg',
        '/art/pen-drawings/18.jpeg',
        '/art/pen-drawings/19.jpeg',
      ],
      nodes: [],
      link: '',
      date: '2025',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'c_table',
    component: GalleryStandard,
    props: {
      title: 'Mid-Century C-Table',
      job: 'Flatpack furniture design',
      description: '',
      images: ['/art/c_table/pic1.png', '/art/c_table/pic2.png', '/art/c_table/pic3.png'],
      nodes: ['CNC', 'CAD', 'Plywood'],
      link: '',
      date: '2021',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'multimedia',
    component: GalleryStandard,
    props: {
      title: 'Assorted Multimedia Projects',
      job: '',
      description: '',
      images: [
        '/art/multimedia/pic1.png',
        '/art/multimedia/pic2.png',
        '/art/multimedia/pic4.png',
        '/art/multimedia/pic6.jpeg',
        '/art/multimedia/pic3.png',
        '/art/multimedia/pic7.jpeg',
        '/art/multimedia/pic5.jpeg',
      ],
      nodes: ['Acrylic Painting', 'Sculpture', 'Clay', 'Photography'],
      link: '',
      date: '2021',
    },
    bg: 'var(--neutral-white)',
  },
  {
    key: 'pinecone_lamp',
    component: GalleryStandard,
    props: {
      title: 'Mid-Century Pinecone Lamp',
      job: 'Flatpack furniture design',
      description: '',
      images: ['/art/lamp/pic1.png', '/art/lamp/pic2.png'],
      nodes: ['CNC', 'CAD', 'Laser cutter', 'Plywood'],
      link: '',
      date: '2021',
    },
    bg: 'var(--neutral-white)',
  },
];

const COMPONENT_MAP = {
  about: <AboutPage pages={aboutItems} />,
  research: <ResearchPage pages={researchItems} />,
  projects: <ProjectPage projects={projectItems} />,
  art: <ArtPage pages={artItems} />,
  contact: <ContactPage />,
};

const HomePage: React.FC<HomePageProps> = () => {
  const [activePage, setActivePage] = useState<keyof typeof COMPONENT_MAP>('about');
  const [rotationCount, setRotationCount] = useState(0);

  // const [activePage, setActivePage] = useState<keyof typeof COMPONENT_MAP>('about');
  const [showStatic, setShowStatic] = useState(false);
  const [staticKey, setStaticKey] = useState(0); // to restart the animation on each switch
  const hideTimer = useRef<number | null>(null);

  useSpring({
    transform: `rotate(${rotationCount * 45}deg)`,
    config: { tension: 200, friction: 30 },
  });

  const handleNavigate = (pageKey: string) => {
    const page = pageKey as keyof typeof COMPONENT_MAP;
    if (!(page in COMPONENT_MAP)) return;
    // show overlay and change page
    setShowStatic(true);
    setStaticKey((k) => k + 1); // remount StaticTransition to replay animation
    setActivePage(page);

    setRotationCount((prev) => prev + 1);

    // clear any previous timer
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setShowStatic(false);
    }, 450); // duration that matches your CSS animation
  };

  useEffect(
    () => () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    },
    [],
  );

  return (
    <div className="home">
      <NavBar onNavigate={handleNavigate} />

      <TVResponsive
        // child={COMPONENT_MAP[activePage]}
        child={
          // IMPORTANT: position this wrapper relative, so the overlay can be absolute inside it
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {COMPONENT_MAP[activePage]}
            {showStatic && <StaticTransition key={staticKey} />}
          </div>
        }
      />
    </div>
  );
};

export default HomePage;
