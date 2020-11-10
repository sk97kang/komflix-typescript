import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rate, Space, Tabs, Tag, Typography } from "antd";

import styled from "styled-components";
import { moviesApi } from "../../lib/api";
import { MovieDetailType } from "../../lib/type";
import YouTube from "react-youtube";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailType>();
  const [loading, setLoading] = useState(true);

  const getMovie = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await moviesApi.movieDetail(Number(movieId));
      setMovie(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return loading || movie === undefined ? null : (
    <Container>
      <Backdrop
        alt="backdrop_poster"
        bgImage={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
      />
      <Poster
        alt="poster"
        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
      />
      <Content>
        <Space direction="vertical">
          <Space size="middle">
            <Title level={3} style={{ margin: 0 }}>
              {movie.title}
            </Title>
            <Tag color="#F5C518">
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                target="_blank"
              >
                IMDB
              </a>
            </Tag>
          </Space>
          <Space align="end">
            <Rate disabled defaultValue={movie.vote_average / 2} />
            <Text>{movie.vote_average}</Text>
          </Space>
          <Space>
            {movie.genres.map((genre) => (
              <Tag key={genre.id} color="purple">
                {genre.name}
              </Tag>
            ))}
          </Space>
          <Space>{movie.overview}</Space>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Companies" key="1">
              <Space>
                {movie.production_companies.map((company) => (
                  <img
                    key={company.id}
                    width="100"
                    height="100"
                    alt={company.name}
                    src={`https://image.tmdb.org/t/p/w300/${company.logo_path}`}
                  />
                ))}
              </Space>
            </TabPane>
            <TabPane tab="Countries" key="2">
              {movie.production_countries.map((country) => (
                <Tag key={country.iso_3166_1} color="geekblue">
                  {country.name}
                </Tag>
              ))}
            </TabPane>
            <TabPane tab="Videos" key="3">
              {movie.videos.results.length > 0 ? (
                <YouTube videoId={movie.videos.results[0].key} />
              ) : (
                <Text>Not Videos</Text>
              )}
            </TabPane>
          </Tabs>
        </Space>
      </Content>
    </Container>
  );
}

export default MovieDetail;

const Container = styled.div`
  padding: 30px;
  display: flex;
`;

const Backdrop = styled.img<{ bgImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(4px);
  opacity: 0.5;
  z-index: -1;
`;

const Poster = styled.img`
  width: 30%;
  height: 100%;
  border-radius: 8px;
`;

const Content = styled.div`
  width: 70%;
  max-width: 700px;
  margin-left: 30px;
`;
