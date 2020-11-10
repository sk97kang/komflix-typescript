import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, List, Rate, Space, Tabs, Tag, Typography } from "antd";

import styled from "styled-components";
import { tvApi } from "../../lib/api";
import { TvDetailType } from "../../lib/type";
import YouTube from "react-youtube";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function TvDetail() {
  const { tvId } = useParams<{ tvId: string }>();
  const [tv, setTv] = useState<TvDetailType>();
  const [loading, setLoading] = useState(true);
  const getTv = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await tvApi.showDetail(Number(tvId));
      setTv(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [tvId]);

  useEffect(() => {
    getTv();
  }, [getTv]);

  return loading || tv === undefined ? null : (
    <Container>
      <Backdrop
        alt="backdrop_poster"
        bgImage={`https://image.tmdb.org/t/p/w300/${tv.backdrop_path}`}
      />
      <Poster
        alt="poster"
        src={`https://image.tmdb.org/t/p/w300/${tv.poster_path}`}
      />
      <Content>
        <Space direction="vertical">
          <Space size="middle">
            <Title level={3} style={{ margin: 0 }}>
              {tv.name}
            </Title>
            <Tag color="#F5C518">
              <a href={tv.homepage} target="_blank" rel="noreferrer">
                Homepage
              </a>
            </Tag>
          </Space>
          <Space align="end">
            <Rate disabled defaultValue={tv.vote_average / 2} />
            <Text>{tv.vote_average}</Text>
          </Space>
          <Space>
            {tv.genres.map((genre) => (
              <Tag key={genre.id} color="purple">
                {genre.name}
              </Tag>
            ))}
          </Space>
          <Space>{tv.overview}</Space>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Seasons" key="1">
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={tv.seasons}
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
                    >
                      <Card.Meta
                        title={item.name}
                        description={item.air_date}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="Companies" key="2">
              <Space>
                {tv.production_companies.map((company) => (
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
            <TabPane tab="Networks" key="4">
              <Space style={{ flexWrap: "wrap" }}>
                {tv.networks.map((network) => (
                  <img
                    key={network.id}
                    width="100"
                    height="100"
                    alt={network.name}
                    src={`https://image.tmdb.org/t/p/w300/${network.logo_path}`}
                  />
                ))}
              </Space>
            </TabPane>
            <TabPane tab="Country" key="5">
              <Tag>{tv.origin_country}</Tag>
            </TabPane>
            <TabPane tab="Videos" key="6">
              {tv.videos.results.length > 0 ? (
                <YouTube videoId={tv.videos.results[0].key} />
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

export default TvDetail;

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
