import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import "./VibeHunter.css";
import Grid from "@mui/material/Grid";
import { duration, IconButton, Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { IoPlayCircleSharp, IoPauseCircleSharp } from "react-icons/io5";

function VibeHunter({ height = "30rem", image = "./image/kgf-tufan.jpg" }) {
  const audioPlayer = useRef();
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState("0");
  const [currentTime, setCurrentTime] = useState("0");
  const [seekValue, setSeekValue] = useState(0);

  useEffect(() => {
    play ? audioPlayer.current.play() : audioPlayer.current.pause();
  }, [play]);

  const onPlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setSeekValue(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
  };

  return (
    <>
      <audio
        src="https://file-examples.com/storage/feddb42d8762894ad9bbbb0/2017/11/file_example_MP3_700KB.mp3"
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <Box
        className="backdrop"
        style={{
          backgroundColor: "black",
          minHeight: height,
          backgroundImage: `url(${image})`,
        }}
      >
        <div
          style={{
            backdropFilter: "blur(5px)",
            width: "100%",
            minHeight: height,
            display: "flex",
          }}
        >
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Grid container>
              <Grid
                item
                sx={{ display: "flex", height: "359px" }}
                xs={12}
                md={6}
              >
                <Box
                  className="cover"
                  component="img"
                  src={image}
                  maxHeight="100%"
                  maxWidth="90%"
                  height="auto"
                  margin="auto"
                  sx={{ boxShadow: 1, borderRadius: "16px" }}
                ></Box>
              </Grid>
              <Grid
                item
                sx={{ display: "flex", height: "359px" }}
                xs={12}
                md={6}
              >
                <Box
                  className="controlPanel"
                  sx={{ width: "100%", height: "359px" }}
                >
                  <Stack>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div
                        style={{
                          margin: "auto",
                          width: "80%",
                          display: "flex",
                        }}
                      >
                        <Typography sx={{ paddingRight: 5 }} color="white">
                          {`${Math.floor(currentTime / 60)}:${Math.floor(
                            currentTime
                          )}`}
                        </Typography>
                        <Slider
                          size="small"
                          sx={{ color: "white" }}
                          max={100}
                          min={0}
                          value={seekValue}
                          onChange={(e) => {
                            const seekto =
                              audioPlayer.current.duration *
                              (+e.target.value / 100);
                            audioPlayer.current.currentTime = seekto;
                            setSeekValue(e.target.value);
                          }}
                        ></Slider>
                        <Typography color="white" sx={{ paddingLeft: 5 }}>
                          {`${duration}`}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ margin: "auto" }}>
                        <IconButton onClick={() => setPlay((prev) => !prev)}>
                          {play ? (
                            <IoPauseCircleSharp color="white" size={60} />
                          ) : (
                            <IoPlayCircleSharp color="white" size={60} />
                          )}
                        </IconButton>
                      </div>
                    </div>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </>
  );
}

export default VibeHunter;
