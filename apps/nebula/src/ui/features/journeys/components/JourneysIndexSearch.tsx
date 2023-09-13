import Link from "next/link";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/outline";
import { Journey } from "@solstice/cosmos/tables/journeys";
import { useState } from "react";

import {
  CapitalAvatar,
  LoadingCard,
  MissingDataPlaceholder,
  SearchTextInput,
} from "@nebula/ui/components";
import { ApiResponse, SetState, hasErrorKey } from "@nebula/types";

interface JourneysIndexSearchProps {
  isLoading: boolean;
  data: ApiResponse<Journey[]>;
}

export default function JourneysIndexSearch({
  data,
  isLoading,
}: JourneysIndexSearchProps) {
  const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>([]);

  if (isLoading || !data) return <LoadingCard />;

  if (hasErrorKey(data)) {
    return (
      <div className="pt-6 lg:pt-12">
        <MissingDataPlaceholder
          icon={<GlobeAsiaAustraliaIcon className="w-8 h-8" />}
          placeholder={data.errorKey}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="my-5">
        <JourneySearchWrapper
          journeys={data}
          setFilteredJourneys={setFilteredJourneys}
        />
      </div>
      <div className="max-h-80 overflow-auto rounded-12 border border-divider-default p-3">
        <div className="grid w-full grid-flow-row grid-cols-1 gap-3">
          {filteredJourneys.map((journey) => (
            <Link href={`/journeys/${journey.id}`}>
              <div
                key={journey.id}
                className="flex w-full justify-between items-center rounded-6 bg-interactive-fill-secondary-enabled px-4 py-2 text-interactive-fill-secondary-enabled shadow-none hover:cursor-pointer hover:bg-interactive-fill-secondary-hover active:bg-interactive-fill-secondary-pressed"
              >
                <div className="flex gap-4 items-center">
                  <CapitalAvatar name={journey.name} />
                  <span className="label-default-regular text-content-default">
                    {journey.name}
                  </span>
                </div>
                <span className="label-small-regular text-content-moderate">
                  {journey.stage}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function JourneySearchWrapper({
  journeys,
  setFilteredJourneys,
}: {
  journeys: Journey[];
  setFilteredJourneys: SetState<Journey[]>;
}) {
  const [query, setQuery] = useState<string>("");

  const handleSetFilteredJourneys = (newQuery: string) => {
    setQuery(newQuery);
    if (!newQuery) return setFilteredJourneys(journeys);
    setFilteredJourneys(
      journeys.filter((journey) =>
        journey.name.toLowerCase().includes(newQuery.toLowerCase()),
      ),
    );
  };

  return (
    <SearchTextInput
      fullWidth
      name="search"
      value={query}
      handleChange={(newQuery) => handleSetFilteredJourneys(newQuery)}
      placeholder="Search your channel"
    />
  );
}
