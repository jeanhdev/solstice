import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

import { Dropdown } from "@nebula/ui/svgs";

interface ComboboxProps<T> {
  disabled?: boolean;
  label?: string;
  entities: T[] | [];
  selectedEntity: T | undefined;
  onChange: (value: T) => void;
  attributeToFilterOn: keyof T & string;
  attributeToDisplay: keyof T & string;
  item: (props: {
    entity: T;
    active: boolean;
    selected: boolean;
  }) => JSX.Element;
}

export default function Combobox<T>({
  disabled,
  label,
  entities,
  selectedEntity,
  onChange,
  attributeToFilterOn,
  attributeToDisplay,
  item: Item,
}: ComboboxProps<T>) {
  const [query, setQuery] = useState("");

  const filteredEntities =
    query === ""
      ? entities
      : entities.filter((entity: T) => {
          return (entity[attributeToFilterOn] as string)
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  return (
    <HeadlessCombobox
      disabled={disabled}
      as="div"
      value={selectedEntity}
      onChange={onChange}
    >
      {label && (
        <HeadlessCombobox.Label className="paragraph-small-regular block capitalize text-content-weak">
          {label}
        </HeadlessCombobox.Label>
      )}{" "}
      <div className={clsx("relative", label && "mt-1")}>
        <HeadlessCombobox.Input
          className={clsx({
            "flex w-full items-center rounded-6 border bg-interactive-fill-utility-input px-3 focus:outline-none focus:ring-0":
              true,
            "border-interactive-outline-secondary-enabled focus:border-interactive-outline-primary-selected-hover":
              // !error
              true,
            // 'border-interactive-outline-negative-selected-enabled focus:border-interactive-outline-negative-selected-enabled':
            //   error,
            "label-default-regular text-content-default": true,
          })}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(entity: T) =>
            (entity[attributeToDisplay] as string) || ""
          }
        />
        <HeadlessCombobox.Button className="cursor-pointer absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Dropdown
              className="h-5 w-5 text-content-weak"
              aria-hidden="true"
            />
          </span>
        </HeadlessCombobox.Button>

        {filteredEntities.length > 0 && (
          <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-6 bg-static-surface-raised p-2 focus:outline-none">
            {filteredEntities.map((entity) => (
              <HeadlessCombobox.Option
                key={entity[attributeToFilterOn] as string}
                value={entity}
                className={({ active }) =>
                  clsx(
                    active
                      ? "rounded-6 label-regular-default text-content-default hover:cursor-pointer hover:bg-static-surface-elevated"
                      : "",
                    "label-default-regular relative select-none py-2 pl-3 pr-9",
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <Item active={active} selected={selected} entity={entity} />
                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-content-default" : "text-orange-600",
                        )}
                      >
                        <CheckIcon
                          className="h-4 w-4 text-content-default"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </>
                )}
              </HeadlessCombobox.Option>
            ))}
          </HeadlessCombobox.Options>
        )}
      </div>
    </HeadlessCombobox>
  );
}

interface ComboboxWithCategoriesProps<T> {
  disabled?: boolean;
  label?: string;
  entities: T[] | [];
  categories: string[];
  selectedEntity: T | undefined;
  onChange: (value: T | undefined) => void;
  attributeToFilterOn: keyof T & string;
  attributeToDisplay: keyof T & string;
  item: (props: {
    entity: T;
    active: boolean;
    selected: boolean;
  }) => JSX.Element;
}

export function ComboboxWithCategories<T extends { entityCategory: string }>({
  disabled,
  label,
  entities,
  categories,
  selectedEntity,
  onChange,
  attributeToFilterOn,
  attributeToDisplay,
  item: Item,
}: ComboboxWithCategoriesProps<T>) {
  const [query, setQuery] = useState("");

  const filteredEntities = !query.length
    ? entities
    : entities.filter((entity: T) => {
        return (entity[attributeToFilterOn] as string)
          .toLowerCase()
          .includes(query.toLowerCase());
      });

  const entitiesByCategory = categories.map((category) => ({
    categoryName: category,
    entities: filteredEntities.filter(
      (entity: T) =>
        entity.entityCategory === category &&
        (entity[attributeToFilterOn] as string)
          .toLowerCase()
          .includes(query.toLowerCase()),
    ),
  }));

  return (
    <HeadlessCombobox
      disabled={disabled}
      as="div"
      value={selectedEntity}
      onChange={onChange}
    >
      {label && (
        <HeadlessCombobox.Label className="paragraph-small-regular block capitalize text-content-weak">
          {label}
        </HeadlessCombobox.Label>
      )}{" "}
      <div className={clsx("relative", label && "mt-1")}>
        <HeadlessCombobox.Input
          className={clsx({
            "flex w-full items-center rounded-6 border bg-interactive-fill-utility-input px-3 focus:outline-none focus:ring-0":
              true,
            "border-interactive-outline-secondary-enabled focus:border-interactive-outline-primary-selected-hover":
              // !error
              true,
            // 'border-interactive-outline-negative-selected-enabled focus:border-interactive-outline-negative-selected-enabled':
            //   error,
            "label-default-regular text-content-default": true,
          })}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(entity: T) =>
            (entity[attributeToDisplay] as string) || ""
          }
        />
        <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <span>
            <Dropdown
              className="h-5 w-5 text-content-weak"
              aria-hidden="true"
            />
          </span>
        </HeadlessCombobox.Button>

        {filteredEntities.length > 0 && (
          <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-6 bg-static-surface-raised p-2 focus:outline-none">
            {categories.map((category, idx) => {
              const categoryData = entitiesByCategory.find(
                (c) => c.categoryName === category,
              )?.entities;

              if (!categoryData || categoryData.length === 0) {
                return null;
              }

              return (
                <div key={category}>
                  <span className="label-default-regular block select-none py-3 pl-3 pr-9 uppercase text-content-weak">
                    {category}
                  </span>
                  {/* <div className="pb-2" /> */}
                  {categoryData.map((entity, entityIdx) => (
                    <>
                      <HeadlessCombobox.Option
                        key={entity[attributeToFilterOn] as string}
                        value={entity}
                        className={({ active }) =>
                          clsx(
                            active
                              ? "rounded-6 text-content-default hover:cursor-pointer hover:bg-static-surface-elevated"
                              : "",
                            "relative select-none py-2 pl-3 pr-9",
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <Item
                              active={active}
                              selected={selected}
                              entity={entity}
                            />
                            {selected && (
                              <span
                                className={clsx(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active
                                    ? "text-content-default"
                                    : "text-orange-600",
                                )}
                              >
                                <CheckIcon
                                  className="h-4 w-4 text-content-default"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </HeadlessCombobox.Option>
                      {entityIdx === categoryData.length - 1 &&
                        idx !== categories.length - 1 && (
                          <div className="mb-1 ml-3 mr-6 mt-2 border-b border-divider-weak" />
                        )}
                    </>
                  ))}
                </div>
              );
            })}
          </HeadlessCombobox.Options>
        )}
      </div>
    </HeadlessCombobox>
  );
}
