import { createContext } from "react";

const noop = () => {};

export const VideosOrchestratorContext = createContext({
  videos: [],
  add: noop,
  resume: noop,
  next: noop,
  suspend: noop,
  notifyPlaying: noop,
  notifyCompleted: noop,
  onVideoChanged: noop,
  changing: false,
  playingVideoId: null,
  isSuspended: false,
});

export const VideosOrchestratorContext2 = createContext({
  currentUrl: null,
  play: noop,
  resume: noop,
  suspend: noop,
  notifyPlaying: noop,
  notifyCompleted: noop,
  isSuspended: false,
  videoChanged: false,
  playing: false,
  onMediaAvailable: noop,
  hasPending: false,
  empty: true,
});

export const MessagePlayerContext = createContext({
  current: null,
  stopped: false,
  play: noop,
  stop: noop,
});
