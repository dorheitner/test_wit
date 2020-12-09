/** @format */

import React from "react";
import isEmpty from "lodash.isempty";
import { Image, Card } from "semantic-ui-react";
import styled from "styled-components";

const StyleCard = styled(Card)({
  display: "flex",
});

export default function ArtistInfo(props) {
  // Return a number with commas (1,000,000)
  function numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  return (
    <>
      {!isEmpty(props.results) ? (
        <Card>
          <Image src={props.results.image_url} wrapped size="medium" />
          <Card.Content>
            <Card.Header>{props.results.name}</Card.Header>
            <Card.Meta>
              <span className="date">
                {numberWithCommas(props.results.tracker_count)} Trackers
              </span>
            </Card.Meta>
          </Card.Content>
        </Card>
      ) : (
        <StyleCard>
          <Card.Content>
            <Card.Header>Let's Find amazing artists!</Card.Header>
          </Card.Content>
        </StyleCard>
      )}
    </>
  );
}
