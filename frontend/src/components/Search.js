import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
import CitySearch from "./shared/CitySearch";
// import FormGroup from "react-bootstrap/FormGroup";
// import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import UseTextInput from "../hooks/UseTextInput";
import "../css/Search.css";

const Search = props => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [author, setAuthor] = UseTextInput("");
  const [text, setText] = UseTextInput("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);

  function selectCity(city) {
    setCity(city.full_name);
  }

  function selectRating(e) {
    setRating(e.target.value);
  }

  async function Send(e) {
    e.preventDefault();
    props.history.push({
      pathname: "/search",
      search: `?city=${city}&name=${author}&text=${text}&rating=${rating}`
    });
  }

  return (
    <form
      className="search-form"
      onSubmit={Send}
      onKeyPress={e => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <Grid container justify="center" spacing={1} direction="column">
        <Grid container item justify="center" alignItems="center" spacing={1}>
          <Grid item xs={10} sm={10}>
            <CitySearch onSelected={selectCity} clearAfterSelected={false} />
          </Grid>
          <Grid item xs={6} sm={1}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <FontAwesomeIcon icon={showAdvanced ? faArrowUp : faArrowDown} />
            </Button>
          </Grid>
          <Grid item xs={6} sm={1}>
            <Button
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {showAdvanced && (
          <div className="advanced-container">
            <Grid
              container
              item
              spacing={2}
              justify="center"
              direction="column"
            >
              <Grid item>
                <TextField
                  label="Text"
                  fullWidth
                  placeholder="Enter a text"
                  value={text}
                  onChange={setText}
                />
              </Grid>
              <Grid container item justify="flex-start" spacing={2}>
                <Grid item md={8}>
                  <TextField
                    label="Author"
                    placeholder="Author name"
                    fullWidth
                    value={author}
                    onChange={setAuthor}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    select
                    fullWidth
                    label="Rating"
                    onChange={selectRating}
                    defaultValue={-1}
                    helperText="Select a minimum rating"
                  >
                    <MenuItem key={2} value={2}>
                      2
                    </MenuItem>
                    <MenuItem key={3} value={3}>
                      3
                    </MenuItem>
                    <MenuItem key={4} value={4}>
                      4
                    </MenuItem>
                    <MenuItem key={5} value={5}>
                      5
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    </form>
    // <Form
    //   onSubmit={Send}
    //   onKeyPress={e => {
    //     if (e.key === "Enter") e.preventDefault();
    //   }}
    // >
    //   <Form.Row>
    //     <Col lg={9}>
    //       <Form.Group controlId="formGridCity">
    //         <CitySearch onSelected={selectCity} clearAfterSelected={false} />
    //       </Form.Group>
    //     </Col>
    //     <Col lg={1}>
    //       <Form.Group controlId="formGridSearch">
    //         <Button
    //           style={{ width: "100%", margin: 0 }}
    //           onClick={() => setShowAdvanced(!showAdvanced)}
    //           block
    //           type="button"
    //         >
    //           <FontAwesomeIcon icon={faArrowDown} />
    //         </Button>
    //       </Form.Group>
    //     </Col>
    //     <Col lg={2}>
    //       <Form.Group controlId="formGridSearch">
    //         <Button
    //           style={{ width: "100%", margin: "0" }}
    //           type="submit"
    //           className={showAdvanced ? "bottom" : ""}
    //         >
    //           Search
    //         </Button>
    //       </Form.Group>
    //     </Col>
    //   </Form.Row>
    //   {showAdvanced ? (
    //     <div className="advanced-container">
    //       <FormGroup controlId="text">
    //         <Form.Label>Text</Form.Label>
    //         <FormControl
    //           placeholder="Enter a text"
    //           value={text}
    //           onChange={setText}
    //           autoFocus
    //         />
    //       </FormGroup>
    //       <Form.Row>
    //         <Col lg={8}>
    //           <FormGroup controlId="authorName">
    //             <Form.Label>Author name</Form.Label>
    //             <FormControl
    //               name="author"
    //               placeholder="Author name"
    //               value={author}
    //               onChange={setAuthor}
    //             />
    //           </FormGroup>
    //         </Col>
    //         <Col>
    //           <FormGroup controlId="minRating">
    //             <Form.Label>Minimum rating</Form.Label>
    //             <FormControl
    //               name="rating"
    //               as="select"
    //               onChange={selectRating}
    //               defaultValue={-1}
    //             >
    //               <option value="-1" disabled hidden>
    //                 Select a rating
    //               </option>
    //               <option value={2}>2</option>
    //               <option value={3}>3</option>
    //               <option value={4}>4</option>
    //               <option value={5}>5</option>
    //             </FormControl>
    //           </FormGroup>
    //         </Col>
    //       </Form.Row>
    //     </div>
    //   ) : null}
    // </Form>
  );
};

export default withRouter(Search);
