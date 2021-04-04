import { Container, Grid, Menu, Segment, TableFooter } from "semantic-ui-react";

const Footer = ({style}) => {
  return (
      <div style={style}>
      <Segment  inverted className="Footer-other">
      <Container textAlign="center">
        <Grid divided padded>
          <div style={{ textAlign: "center", display: "block", width: "100%" }}>
            About <span style={{ color: "#ddd" }}>|</span> Contact{" "}
            <span style={{ color: "#ddd" }}>|</span> &copy; copyright
          </div>
        </Grid>
      </Container>
    </Segment>
      </div>
    
  );
};
export default Footer;
