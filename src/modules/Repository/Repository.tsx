import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import RepositoriesList from "./components/RepositoriesList";
import Pagination from "./components/Pagination";
import Controls from "./components/Controls";

import Loader from "../../shared/components/Loader";

import { getUserRepos } from "./api/getUserRepos";

import type { RootState } from "../../store";

const Repository = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state: RootState) => state.user.token);

  const { data, isLoading, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["repos", page],
    queryFn: () => getUserRepos(token, page),
    placeholderData: (prev) => prev,
  });

  const isDisabled = isLoading || (isFetching && isPlaceholderData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-100">
        Repositories
      </h1>
      {!isLoading ? (
        <div className="mx-auto w-full max-w-4xl rounded-xl bg-gray-100 p-8 shadow-lg">
          <Controls isDisabled={isDisabled} />
          <RepositoriesList
            repositories={data?.repos}
            isDisabled={isDisabled}
          />
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.totalPages}
            disabled={isDisabled}
          />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-4xl justify-center rounded-xl bg-gray-100 p-8 shadow-lg">
          <Loader className="relative z-10 h-20 w-20 text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default Repository;
