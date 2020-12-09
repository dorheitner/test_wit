/** @format */

import React, { useCallback, useState } from "react";
import axios from "../../axios-instance";
import { Input } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { errorState } from "../../store/atons";

const appId = process.env.REACT_APP_API_KEY;

export default function SearchComponent(props) {
  const [, setError] = useRecoilState(errorState);
  const [loading, setLoading] = useState(false);

  const timeoutRef = React.useRef();

  // Get Search typing
  const handleSearchChange = useCallback(
    (e, data) => {
      console.log(data.value);
      setError({});
      clearTimeout(timeoutRef.current);
      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          setLoading(false);
          return;
        }

        axios
          .get(`/artists/${data.value}`, {
            params: {
              app_id: appId,
            },
          })
          .then(function (response) {
            if (response.data) {
              props.results(response.data);
            } else {
              setError({
                message:
                  "ON! We didn't found this artist, Please try another one",
                error: null,
              });
            }
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
            setError({
              message:
                "ON! We didn't found this artist, Please try another one",
              error: error,
            });
          });
      }, 500);
    },
    [props, setError]
  );

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <Input
        size="large"
        loading={loading}
        icon="search"
        placeholder="Find Artist..."
        onChange={handleSearchChange}
      />
    </>
  );
}
