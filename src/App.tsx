import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Fragment, useEffect } from "react";
import styled from "styled-components";

// config
import { isEmbed, navItems } from "./config";

// pages
import Home from "./pages/Home";
import CollegeView from "./pages/CollegeView";
import GroupList from "./pages/GroupList";
import GroupView from "./pages/GroupView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="groups" element={<GroupList />} />
        <Route path="college/:uuid" element={<CollegeView />} />
        <Route path="group/:id" element={<GroupView />} />
        <Route path="group/:id/:dummySlug" element={<GroupView />} />
      </Route>
    </Routes>
  );
}

function AppLayout() {
  return (
    <>
      <AppNav />
      <AppMain>
        <Outlet />
      </AppMain>
    </>
  );
}

function AppNav() {
  const { pathname } = useLocation();

  // scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <NavComponent>
      {/* show navigation buttons if embedded */}
      {isEmbed ? <NavigationButtons /> : null}
      {navItems.map(({ name, path }) => (
        <Fragment key={name + path}>
          <NavLink
            to={path}
            // underlined when selected
            className={pathname === path ? "selectedLink" : undefined}
          >
            {name}
          </NavLink>
          {" | "}
        </Fragment>
      ))}{" "}
      {/* app version and commit hash (with github link) */}
      v{__APP_VERSION__} (
      {process.env.NODE_ENV === "development" ? (
        "dev"
      ) : (
        <a
          href={
            "https://github.com/zane-programs/sat-act-comparison-app/commit/" +
            __COMMIT_HASH__
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>{__COMMIT_HASH__.substring(0, 7)}</code>
        </a>
      )}
      )
    </NavComponent>
  );
}

function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <NavigationButtonsContainer>
      <button onClick={() => navigate(-1)} title="Back" aria-label="Back">
        &lt;
      </button>
      <button onClick={() => navigate(1)} title="Forward" aria-label="Forward">
        &gt;
      </button>
    </NavigationButtonsContainer>
  );
}

const NavigationButtonsContainer = styled.div`
  display: inline-block;
  margin-right: 7px;
`;

const AppMain = styled.main`
  margin-top: 40px;
`;

const NavLink = styled(Link)`
  color: #00f;
  text-decoration: none;

  &:hover,
  &.selectedLink {
    text-decoration: underline;
  }
`;

const NavComponent = styled.nav`
  z-index: 9997;

  position: fixed;
  top: 0;
  left: 0;
  height: 30px;

  background: rgba(255, 255, 255, 0.85);

  padding: 5px;
  width: 100%;

  box-sizing: border-box;
`;
