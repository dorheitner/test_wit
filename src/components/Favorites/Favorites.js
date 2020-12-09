/** @format */

import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import isEmpty from "lodash.isempty";
import { favoriteState } from "../../store/atons";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const CardHeader = styled(Card.Header)({
  fontSize: "1rem !important",
  color: "#707070 !important",
  fontWeight: "200 !important",
  marginBottom: 5,
});

const CardHeaderTitle = styled(Card.Header)({
  fontSize: "1.3rem !important",
  fontWeight: "400 !important",
  marginBottom: 10,
});

const FavoriteColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteColumn = styled(Button)({
  margin: "0 0 30px 30px !important",
  height: "35px !important",
  width: "50px !important",
});

const FavoriteContainer = styled.div`
  display: flex;
`;

const CardWrapper = styled(Card)({
  "@media (max-width: 800px)": {
    marginTop: "20px !important",
  },
});

export default function Favorites(props) {
  const [favorites, setFavorites] = useRecoilState(favoriteState);

  // Remove from favorite list
  const handleRemoveFromFavorite = (id) => {
    const updateFavorite = { ...favorites };
    delete updateFavorite[id];
    setFavorites(updateFavorite);
    localStorage.setItem("favorites", JSON.stringify(updateFavorite));
  };
  return (
    <>
      <CardWrapper>
        <Card.Content>
          <Card.Header>Favorites</Card.Header>
        </Card.Content>

        {!isEmpty(favorites) &&
          Object.entries(favorites).map((favorite, index) => (
            <Card key={index}>
              <Card.Content>
                <FavoriteContainer>
                  <FavoriteColumn>
                    <CardHeaderTitle>{favorite[1].name}</CardHeaderTitle>
                    <CardHeader>{favorite[1].title}</CardHeader>
                    <CardHeader>
                      {moment(favorite[1].date).format("LL")}
                    </CardHeader>
                  </FavoriteColumn>
                  {props.event && props.event.id !== favorite[1].id && (
                    <DeleteColumn icon>
                      <Icon
                        name="trash"
                        onClick={() => handleRemoveFromFavorite(favorite[1].id)}
                      />
                    </DeleteColumn>
                  )}
                </FavoriteContainer>
              </Card.Content>
            </Card>
          ))}
      </CardWrapper>
    </>
  );
}
