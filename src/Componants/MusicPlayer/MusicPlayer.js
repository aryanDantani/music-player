import React, { useState, useRef, useEffect } from "react";
import "./musicPlayer.scss"; // Ensure you have relevant styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faBackward,
  faPlay,
  faPause,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused || audio.ended) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const changeSong = (index) => {
    setCurrentSong(index);
    setIsPlaying(false);
    const audio = audioRef.current;
    audio.pause();
    audio.load();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong, isPlaying]);

  const songs = [
    {
      title: "Latch",
      artist: "Disclosure",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Leo%20-%20Trying.mp3",
      cover: "https://i.ibb.co/ZS3wRSh/cover.jpg",
      duration: "04:30",
    },
    {
      title: "Bad Liar",
      artist: "Imagine Dragons",
      cover: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
      src: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    },
    {
      title: "Faded",
      artist: "Alan Walker",
      cover: "https://samplesongs.netlify.app/album-arts/faded.jpg",
      src: "https://samplesongs.netlify.app/Faded.mp3",
    },
    {
      title: "Hate Me",
      artist: "Ellie Goulding",
      cover: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
      src: "https://samplesongs.netlify.app/Hate%20Me.mp3",
      id: "4",
    },
    {
      title: "Solo",
      artist: "Clean Bandit",
      cover: "https://samplesongs.netlify.app/album-arts/solo.jpg",
      src: "https://samplesongs.netlify.app/Solo.mp3",
    },
    {
      title: "Without Me",
      artist: "Halsey",
      cover: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
      src: "https://samplesongs.netlify.app/Without%20Me.mp3",
    },
    // Add more songs as needed
  ];

  return (
    <>
    <div className={`container song-${currentSong}`}>
      <div className="player">
        <div className="player__controls">
          <div className="player__btn player__btn--small" id="previous">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h5 className="player__title">playing now</h5>
          <div className="player__btn player__btn--small" id="icon-menu">
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
        <div className="player__album">
          <img
            src={songs[currentSong].cover}
            alt="Album Cover"
            className="player__img"
            loading="lazy"
          />
        </div>

        <h2 className="player__artist">{songs[currentSong].artist}</h2>
        <h3 className="player__song">{songs[currentSong].title}</h3>

        <input
          type="range"
          value={currentTime}
          max={duration}
          className="player__level"
          id="range"
          onChange={(e) => audioRef.current.currentTime = e.target.value}
        />
        <div className="audio-duration">
          <div className="start">{formatTime(currentTime)}</div>
          <div className="end">{formatTime(duration)}</div>
        </div>

        <audio className="player__audio" controls id="audio" ref={audioRef}>
          <source src={songs[currentSong].src} type="audio/mpeg" />
        </audio>

        <div className="player__controls">
          <div className="player__btn player__btn--medium" id="backward" onClick={() => changeSong((currentSong - 1 + songs.length) % songs.length)}>
            <FontAwesomeIcon icon={faBackward} />
          </div>

          <div
            className="player__btn player__btn--medium blue play"
            id="play"
            onClick={togglePlayPause}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className={`play-btn ${isPlaying ? "hide" : ""}`}
            />
            <FontAwesomeIcon
              icon={faPause}
              className={`pause-btn ${isPlaying ? "" : "hide"}`}
            />
          </div>

          <div className="player__btn player__btn--medium" id="forward" onClick={() => changeSong((currentSong + 1) % songs.length)}>
            <FontAwesomeIcon icon={faForward} />
          </div>
        </div>
      </div>
      <div className="songs-list">
      <div className="player__song-list">
        <h4 className="player__song-list-title">Songs</h4>
        <ul className="player__song-list-items">
          {songs.map((song, index) => (
            <li
              key={index}
              className={`player__song-list-item ${
                currentSong === index ? "active" : ""
              }`}
              onClick={() => changeSong(index)}
            >
              {song.title} - {song.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </>
  );
};

export default MusicPlayer;
