import React, {MouseEvent} from "react";
import { useSearchBar } from "./useSearchbar";
import { Input } from "../Input/Input";
// import { Select } from "../Select/Select";
import { Text } from "../Text/Text";
import { ImageTag } from "../ImageTag/ImageTag";
import { LoaderPartial } from "../LoaderPartial/LoaderPartial";
import searchIcon from "../../assets/icons/search.svg";
import styles from "./Searchbar.module.css";

export const Searchbar = (props: any) => {
  const {
    isLoading,
    submitSearch,
    onChangeSingleSearchInput,
    singleSearchInput,
    leaveInput,
    isSuggestion,
    searchSuggestion,
    handleSuggestionBox
  } = useSearchBar(props);
  return (
    <div className={styles["search_frame"]}>
      <form onSubmit={e => submitSearch(e)}>
        <div className={styles["search_bar_container"]}>
          <div className={styles["search_bar_input"]}>
            <Input
              type="text"
              placeholder="Search or jump to"
              id="movie"
              value={singleSearchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeSingleSearchInput(e.target.value)
              }
              onFocus={() => !!singleSearchInput ? handleSuggestionBox(true): undefined}
              onBlur={leaveInput}
              // cy="input_search"
            />
            <span
              className={styles["search_bar_icon"]}
              onClick={e => submitSearch(e)}
            >
              <img src={searchIcon} alt="search" onClick={undefined} />
            </span>
          </div>
        </div>
      </form>
      <div>
        {isSuggestion && (
          <div
            className={styles["search_suggestion_container"]}
            data-cy="search_suggestion_container"
          >
            {searchSuggestion.map((data: any, index: number) => (
              <div
                className={styles["suggestion_item"]}
                key={index}
                onClick={(e) => submitSearch(e, data.type)}
                data-cy={"suggestion_item_" + index}
              >
                <Text>Search <strong>{singleSearchInput}</strong></Text>
                <span className={styles["label-suggestion"]}>{data.label}</span>
              </div>
            ))}
            {isLoading && (
              <div className={styles["loader_suggestion"]}>
                <LoaderPartial />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};