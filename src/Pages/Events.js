/** @format */

import React, { useState, useEffect } from "react";
import isEmpty from "lodash.isempty";
import styled from "styled-components";
import axios from "../axios-instance";
import { Menu } from "semantic-ui-react";
import { favoriteState, errorState } from "../store/atons";
import { useRecoilState } from "recoil";

import SearchComponent from "../components/SearchComponent/SearchComponent";
import ArtistInfo from "../components/ArtistInfo/ArtistInfo";
import EventsList from "../components/Events/EventsList/EventsList";
import Event from "../components/Events/Event/Event";
import Favorites from "../components/Favorites/Favorites";

const appId = process.env.REACT_APP_API_KEY;
export default function Events() {
  const [searchResults, setSearchResults] = useState({});
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState();
  const [favorites, setFavorites] = useRecoilState(favoriteState);
  const [, setError] = useRecoilState(errorState);

  const Container = styled.div`
    display: flex;
    @media (max-width: 800px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  `;
  const InfoBox = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 340px;
  `;

  const EventInfoBox = styled.section`
    display: Block;
    width: 60rem;
  `;

  const FavoriteBox = styled.section`
    display: flex;
    flex-grow: 1;
    height: auto;
    align-items: flex-start;
    margin: 0 20px;
  `;

  // Get Artist Info
  useEffect(() => {
    if (!isEmpty(searchResults)) {
      axios
        .get(`/artists/${searchResults.name}/events`, {
          params: {
            app_id: appId,
          },
        })
        .then(function (response) {
          setEvents(response.data);
          setSelectEvent(response.data[0]);
        })
        .catch(function (error) {
          setError({
            message: "ON! We didn't found Any Event",
            error: error,
          });
        });
    }
  }, [searchResults, setError]);

  // Handle Search results
  const handleSearchResult = (results) => {
    setSearchResults(results);
  };

  // Handle selected event from the events list
  const handleSelectedEvent = (id) => {
    const findEvent = events.find((event) => event.id === id);

    setSelectEvent(findEvent);
  };

  // Handle new favorites
  const handleFavorites = (favorite, add) => {
    if (add && isEmpty(favorites[favorite.id])) {
      const updateFavorites = {
        ...favorites,
        [favorite.id]: {
          id: favorite.id,
          title: favorite.title,
          date: favorite.datetime,
          name: favorite.lineup[0],
        },
      };

      setFavorites(updateFavorites);
      localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    }

    if (!add && !isEmpty(favorites[favorite.id])) {
      const updateFavoritesList = { ...favorites };
      delete updateFavoritesList[favorite.id];

      setFavorites(updateFavoritesList);
      localStorage.setItem("favorites", JSON.stringify(setFavorites));
    }
  };

  return (
    <>
      <Menu fixed="top" inverted>
        <Menu.Item header>Who's In Town</Menu.Item>
        <Menu.Item header>
          <SearchComponent results={handleSearchResult} />
        </Menu.Item>
      </Menu>

      <Container>
        <InfoBox>
          <ArtistInfo results={searchResults} />
          <EventsList
            events={events}
            selectedEvent={handleSelectedEvent}
            selectEvent={selectEvent?.id}
            searchResults={searchResults}
            artistName={searchResults?.name}
            favorites={favorites}
            favorite={handleFavorites}
          />
        </InfoBox>
        <EventInfoBox>
          <Event
            event={selectEvent}
            artistName={searchResults?.name}
            favorite={handleFavorites}
          />
        </EventInfoBox>
        <FavoriteBox>
          <Favorites event={selectEvent} searchResults={searchResults} />
        </FavoriteBox>
      </Container>
    </>
  );
}
