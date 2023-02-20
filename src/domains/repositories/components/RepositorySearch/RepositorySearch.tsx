import { FormEvent, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Button } from "@app/components/Button/Button";
import { TextInput } from "@app/components/TextInput";
import { RepositoryListContainer } from "@app/domains/repositories/containers/RepositoryListContainer";

export const RepositorySearch = () => {
  const [searchText, setSearchText] = useState("");
  const [submittedSearchText, setSubmittedSearchText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedSearchText(searchText);
  };

  return (
    <div className="flex flex-col">
      <form className="flex gap-2 mb-3" onSubmit={handleSubmit}>
        <TextInput
          value={searchText}
          onChange={setSearchText}
          icon={<MagnifyingGlassIcon className="h-4 w-4" />}
          placeholder='Search (e.g. "react")'
          className="grow"
        />
        <Button type="submit">Search</Button>
      </form>
      <RepositoryListContainer search={submittedSearchText} />
    </div>
  );
};
