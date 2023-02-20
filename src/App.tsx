import React from "react";

import classNames from "classnames";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";

import { IssueContainer } from "@app/domains/issues/containers/IssueContainer";
import { RepositorySearch } from "@app/domains/repositories/components/RepositorySearch";

import { RepositoryIssuesList } from "./domains/repository/containers/RepositoryIssuesList";

export const App = () => (
  <div className="flex flex-col items-center w-screen h-screen">
    <header className="flex justify-center py-3 bg-slate-800 w-full text-white">
      <Link to="/" className="text-xl font-light">
        Issues Tracker
      </Link>
    </header>
    <main className="flex flex-col items-stretch justify-center my-4 px-4 max-w-screen-md w-full">
      <Routes>
        <Route path="/" element={<Navigate to="/repos" />} />
        <Route path="/repos" element={<RepositorySearch />} />
        <Route
          path="/repos/:repositoryOwner/:repositoryName/issues"
          element={<RepositoryIssuesList />}
        />
        <Route
          path="/repos/:repositoryOwner/:repositoryName/issues/:issueNumber"
          element={<IssueContainer />}
        />
      </Routes>
    </main>
  </div>
);
