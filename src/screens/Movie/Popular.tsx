import React, { useCallback, useEffect, useState } from "react";

import styled from "styled-components";

import { BackTop, Card, List, Typography } from "antd";
import { moviesApi } from "../../lib/api";
import { MovieType } from "../../lib/type";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

function Popular() {
  const history = useHistory();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const page = useInfiniteScroll();

  const getMovies = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { results },
      } = await moviesApi.popular(page);
      setMovies((prev) => [...prev, ...results]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getMovies();
  }, [page, getMovies]);

  const goDetail = (id: number) => {
    history.push(`/movie/${id}`);
  };

  return (
    <Container>
      <Title>Popular Playing</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={movies}
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
              <Card.Meta title={item.title} description={item.release_date} />
            </Card>
          </List.Item>
        )}
      />
      <BackTop />
    </Container>
  );
}

export default Popular;

const Container = styled.div`
  padding: 20px;
`;
