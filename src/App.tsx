import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Fragment, useEffect } from "react";
import styled from "styled-components";

// config
import { navItems } from "./config";

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
      v{__APP_VERSION__}
    </NavComponent>
  );
}

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
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;

  background: rgba(255, 255, 255, 0.85);

  padding: 5px;
  width: 100%;

  box-sizing: border-box;
`;
