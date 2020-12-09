/** @format */

import React from "react";
import isEmpty from "lodash.isempty";
import { Card, Item, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const ItemHeaderTitle = styled(Item.Header)({
  marginBottom: 20,
});

const ItemHeaderSubTitle = styled(Item.Header)({
  fontSize: "1rem !important",
  fontWeight: "100 !important",
});

const Offer = styled.div`
  display: flex;
  margin: 10px 10px 0 0;
`;
const StyleCard = styled(Card)({
  margin: 10,
});

export default function EventsList(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const events = props.events;

  // Events list for Destop
  const eventsOnPC = (
    <div>
      <Item.Group divided>
        {events.map((event, index) => (
          <StyleCard
            color={event.id === props.selectEvent ? "teal" : "grey"}
            key={index}
            onClick={() => props.selectedEvent(event.id)}
          >
            <Item.Content>
              <Item.Header as="a">{event.title}</Item.Header>
              <Item.Meta>
                <span className="cinema">
                  {moment(event.datetime).format("LL")}
                </span>
              </Item.Meta>
              <Item.Description>
                <p> {event.venue.location}</p>
              </Item.Description>
            </Item.Content>
          </StyleCard>
        ))}
      </Item.Group>
    </div>
  );

  // Events list for mobile
  const eventsOnMobile = (
    <div>
      <Item.Group divided>
        {!isEmpty(events) &&
          events.map((event, index) => (
            <StyleCard color={"teal"} key={index}>
              <Item.Content>
                <ItemHeaderTitle>{props.artistName}</ItemHeaderTitle>
                <ItemHeaderSubTitle>{event.title}</ItemHeaderSubTitle>
                <Item.Meta>
                  <span className="cinema">
                    {moment(event.datetime).format("LL")}
                  </span>
                </Item.Meta>
                <Item.Description>
                  <p> {event.venue.location}</p>
                </Item.Description>
              </Item.Content>

              <Item.Content>
                {event.offers.map((offer, index) => (
                  <Offer key={index}>
                    <Button
                      icon
                      onClick={(e) => {
                        props.favorite(
                          event,
                          e.target.className === "grey like icon"
                        );
                      }}
                    >
                      <Icon
                        name="like"
                        color={
                          props.favorites.hasOwnProperty(event.id)
                            ? "red"
                            : "grey"
                        }
                      />
                    </Button>
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
              </Item.Content>
            </StyleCard>
          ))}
      </Item.Group>
    </div>
  );

  return (
    <>
      {!isEmpty(props.events) ? (
        <>
          <StyleCard>
            <Card.Content>
              <Card.Header>Events</Card.Header>
            </Card.Content>
          </StyleCard>
          {isDesktopOrLaptop ? eventsOnPC : eventsOnMobile}
        </>
      ) : !isEmpty(props.searchResults) ? (
        <StyleCard>
          <Card.Content>
            <Card.Header>Sorry, We didn't found any event</Card.Header>
          </Card.Content>
        </StyleCard>
      ) : (
        []
      )}
    </>
  );
}
