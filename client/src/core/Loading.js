import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = () => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <Segment style={{ width: "100vw", height: "100vh" }}>
      <Dimmer active>
        <Loader indeterminate>Preparing data</Loader>
      </Dimmer>

      <Image src="/images/wireframe/short-paragraph.png" />
    </Segment>
  </div>
);

export default Loading;
