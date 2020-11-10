import React from "react";

import styled from "styled-components";
import { Tabs } from "antd";
import Now from "./Now";
import Popular from "./Popular";
import Upcoming from "./Upcoming";

const { TabPane } = Tabs;

function Movie() {
  return (
    <Container>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Now Playing" key="1">
          <Now />
        </TabPane>
        <TabPane tab="Upcoming Playing" key="2">
          <Upcoming />
        </TabPane>
        <TabPane tab="Popular Playoing" key="3">
          <Popular />
        </TabPane>
      </Tabs>
    </Container>
  );
}

export default Movie;

const Container = styled.div`
  max-width: 1080px;
  margin: 0px auto;
  padding: 0px 10px;
`;
