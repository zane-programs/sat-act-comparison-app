import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Fragment } from "react";
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
      <main style={{ marginTop: "15px" }}>
        <Outlet />
      </main>
    </>
  );
}

const NavLink = styled(Link)`
  color: #00f;
  text-decoration: none;

  &:hover,
  &.selectedLink {
    text-decoration: underline;
  }
`;

function AppNav() {
  const { pathname } = useLocation();

  return (
    <nav>
      {navItems.map(({ name, path }, index) => (
        <Fragment key={name + path}>
          <NavLink
            to={path}
            // underlined when selected
            className={pathname === path ? "selectedLink" : undefined}
          >
            {name}
          </NavLink>{" "}
          {/* nav link separator */}
          {index === navItems.length - 1 ? "" : "| "}
        </Fragment>
      ))}
    </nav>
  );
}
