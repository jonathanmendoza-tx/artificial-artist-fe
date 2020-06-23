import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getSingleVideo } from "../store/actions";
import Video from "./Video";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Thumbnail from "./Thumbnail";
import style from "styled-components";

const PageAlign = style.div`
  display: flex;
`;

const VideoWrapper = style.div`
  background-color: #0E0429;
  width: 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = style.div`
  width: 80%;
  background-color: #FCFC0B;
  border: 4px solid #FCFC0B;
  margin: 80px;
  box-shadow: 0 20px 40px 0 rgba(0,0,0,.8);
  margin-bottom: 80px;
`;

const PageContent = style.div`
  margin: 0 auto;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  color: #2FBCD4;
  text-shadow: 1px 1px 0 #0E0429;
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 0.30px; 
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 20px;
  }
`;

const SingleVideoPage = (props) => {
  const { videoId } = useParams();
  console.log(videoId);

  useEffect(() => {
    props.getSingleVideo(localStorage.getItem("token"), videoId);
  }, [videoId]);

  return (
    <>
      {props.singleVideo.video_status === "creating" ? (
        <>
          <h2>
            We're crunching the numbers on this one, STILL, check back in a few
            minutes...
          </h2>
        </>
      ) : props.singleVideo.video_status === "successful" ? (
        <>
          <PageAlign>
            <VideoWrapper>
              <VideoContainer>
                <Video heroVideo={true} video={props.singleVideo} />
              </VideoContainer>
            </VideoWrapper>

            <PageContent>
              <h2>{props.singleVideo.video_title}</h2>
              <h3>{props.singleVideo.title}</h3>
              <h3>{props.singleVideo.artist_name}</h3>
            </PageContent>
          </PageAlign>
        </>
      ) : props.singleVideo.video_status === "failed" ? (
        <>
          <h2>Something failed, we're so, so, so deeply sorry</h2>
        </>
      ) : (
        console.log("end of ternary????")
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  singleVideo: state.singleVideo,
  getSingleVideoStart: state.getSingleVideoStart,
  getSingleVideoSuccess: state.getSingleVideoSuccess,
  getSingleVideoError: state.getSingleVideoError,
});

export default connect(mapStateToProps, { getSingleVideo })(
  withRouter(SingleVideoPage)
);
