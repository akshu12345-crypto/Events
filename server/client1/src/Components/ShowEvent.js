import React, { useEffect, useState } from "react";
import NavbarMenu from "./NavbarMenu";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { format } from "date-fns";
import { Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ShowEvent = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [clickedCardId, setClickedCardId] = useState(null);

  const handleHover = (id) => {
    setHoveredCardId(id); // Set the hovered card ID
  };

  const handleClick = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/update-like-status/${id}/`
      );

      console.log(response.data); // Assuming backend returns some data
    } catch (error) {
      console.error("Error:", error);
    }
    setClickedCardId(id); // Set the clicked card ID
  };

  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const res = await axios.get("http://localhost:8000/api/events");
    console.log(res.data[0].date);
    setEvents(res.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1
        style={{
          fontWeight: 600,
          fontSize: "2.25rem",
          display: "flex",
          marginBottom: "50px",
          marginTop: "10px",
          marginLeft: "120px",
        }}
      >
        Events for you
      </h1>
      <Grid
        container
        spacing={1}
        style={{ display: "flex", marginLeft: "120px" }}
      >
        {events.map((eve, index) => (
          <div style={{ display: "flex" }}>
            <Card
              sx={{
                maxWidth: "286px",
                height: "369px",
                padding: "2px",
                margin: 2,
                borderRadius: "0px 0px 15px 15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <CardHeader
                    titleTypographyProps={{ fontSize: "1.1rem" }}
                    title={eve.event_name}
                    sx={{
                      display: "flex",
                      fontSize: "1.5rem",
                      textAlign: "start",
                      lineHeight: "1.5rem",
                      padding: 0,
                    }}
                  />
                  <Typography color="red">
                    {format(new Date(eve.date), "EEE, MMM d, h:mm a")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {eve.location}
                  </Typography>
                </div>
                <div>
                  <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "165px" }}
                    image={eve.image}
                    alt={eve.event_name}
                  />

                  <CardActions
                    disableSpacing
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <IconButton
                      href={`${eve.id}`}
                      type="submit"
                      onMouseEnter={() => handleHover(eve.id)}
                      onMouseLeave={() => handleHover(null)}
                      onClick={() => handleClick(eve.id)}
                      sx={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "#dbdae3",
                        borderRadius: "50%",
                      }}
                    >
                      {/* Apply red color based on hovered/clicked state of the card */}
                      {eve.is_liked ||
                      clickedCardId === eve.id ||
                      hoveredCardId === eve.id ? (
                        <FavoriteIcon style={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                    <IconButton aria-label="share">
                      <FileUploadOutlinedIcon
                        fontSize="large"
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "#dbdae3",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </CardActions>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default ShowEvent;
