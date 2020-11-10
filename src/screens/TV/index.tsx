import React from "react";

import styled from "styled-components";
import { Tabs } from "antd";
import TvTop from "./TvTop";
import TvPopular from "./TvPopular";
import TvAiring from "./TvAiring";

const { TabPane } = Tabs;

function TV() {
  return (
    <Container>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Top Rated Shows" key="1">
          <TvTop />
        </TabPane>
        <TabPane tab="Popular Shows" key="2">
          <TvPopular />
        </TabPane>
        <TabPane tab="Airing Today" key="3">
          <TvAiring />
        </TabPane>
      </Tabs>
    </Container>
  );
}

export default TV;

const Container = styled.div`
  max-width: 1080px;
  margin: 0px auto;
  padding: 0px 10px;
`;
