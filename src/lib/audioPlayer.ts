let currentAudio: HTMLAudioElement | null = null;

export const playAudio = (src: string) => {
  stopAudio();
  currentAudio = new Audio(src);
  currentAudio.play().catch(() => {});
};

export const stopAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

export const toggleAudio = (src: string) => {
  if (currentAudio && !currentAudio.paused) {
    stopAudio();
  } else {
    playAudio(src);
  }
};
