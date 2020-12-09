/** @format */

import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import isEmpty from "lodash.isempty";
import moment from "moment";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import EventMap from "./EventMap";

const EventInfo = styled.section`
  display: flex;
`;

const EventInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 30px 0 0;
  margin: 10px 0;
`;

const Offer = styled.div`
  display: flex;
  margin: 10px 10px 0 0;
`;

const ArtistInfo = styled.div`
  margin: 0.5rem 0 1rem 0;
  font-size: 25px;
  display: flex;
`;

const ArtistInfoChild = styled.div`
  flex-direction: column;
`;

const ArtistInfoChildTitle = styled(ArtistInfoChild)({
  padding: 8,
  fontSize: "2rem",
});

const StyledCard = styled(Card)({
  width: "100% !important",
});

const CardHeader = styled(Card.Header)({
  fontSize: "1.5rem !important",
  color: "#707070 !important",
  fontWeight: "200 !important",
  marginBottom: 5,
});

const BigIcon = styled(Icon)({
  fontSize: "1.5em !important",
});

export default function Event(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const currentEvent = props.event;

  return (
    <>
      {!isEmpty(props.event) && isDesktopOrLaptop && (
        <StyledCard>
          <Card.Content>
            <ArtistInfo>
              <ArtistInfoChild
                onClick={() => {
                  if ("like" in currentEvent) {
                    currentEvent.like = !currentEvent.like;
                  } else {
                    currentEvent.like = true;
                  }
                  props.favorite(currentEvent, currentEvent.like);
                }}
              >
                <Button icon>
                  <Icon
                    name="like"
                    color={currentEvent.like ? "red" : "grey"}
                  />
                </Button>
              </ArtistInfoChild>
              <ArtistInfoChildTitle>{props.artistName}</ArtistInfoChildTitle>
            </ArtistInfo>

            <CardHeader>{currentEvent.venue.name}</CardHeader>
            <CardHeader>
              <span className="cinema">
                {moment(currentEvent.datetime).format("LL")}
              </span>
            </CardHeader>

            <Card.Description>
              <EventInfo>
                <EventInfoBox>
                  <div>
                    <BigIcon name="location arrow" />
                  </div>
                  <p>
                    {currentEvent?.venue?.name}, {currentEvent?.venue.location}
                  </p>
                </EventInfoBox>
                <EventInfoBox>
                  <BigIcon name="clock outline" />
                  <p>
                    {moment(currentEvent.datetime).format("LL")},{" "}
                    {moment(currentEvent.datetime).format("LT")}
                  </p>
                </EventInfoBox>
              </EventInfo>
              <EventMap
                lat={currentEvent?.venue?.latitude}
                long={currentEvent?.venue?.longitude}
                location={currentEvent?.venue?.name}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {props.event.offers.map((offer, index) => (
              <Offer key={index}>
                <Button
                  disabled={offer.status !== "available"}
                  primary
                  floated="right"
                  onClick={() => window.open(offer.url)}
                >
                  Buy tickets
                  <Icon name="right chevron" />
                </Button>
              </Offer>
            ))}
          </Card.Content>
        </StyledCard>
      )}
    </>
  );
}
