import React, { useCallback, useEffect, useState } from "react";

import styled from "styled-components";

import { BackTop, Card, List, Typography } from "antd";
import { tvApi } from "../../lib/api";
import { TvType } from "../../lib/type";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

function TvTop() {
  const history = useHistory();
  const [tvShows, setTvShows] = useState<TvType[]>([]);
  const [loading, setLoading] = useState(true);
  const page = useInfiniteScroll();

  const getTv = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { results },
      } = await tvApi.topRated(page);
      setTvShows((prev) => [...prev, ...results]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getTv();
  }, [page, getTv]);

  const goDetail = (id: number) => {
    history.push(`/tv/${id}`);
  };

  return (
    <Container>
      <Title>Top Playing</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={tvShows}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  style={{ minWidth: 100, minHeight: 200 }}
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                />
              }
              onClick={() => goDetail(item.id)}
            >
              <Card.Meta title={item.name} description={item.first_air_date} />
            </Card>
          </List.Item>
        )}
      />
      <BackTop />
    </Container>
  );
}

export default TvTop;

const Container = styled.div`
  padding: 20px;
`;
