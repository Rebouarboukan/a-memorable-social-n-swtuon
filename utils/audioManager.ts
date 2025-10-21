
import { Audio } from 'expo-av';
import { Season } from './seasonTheme';

class AudioManager {
  private sound: Audio.Sound | null = null;
  private isPlaying = false;

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.log('Error initializing audio:', error);
    }
  }

  async playSeasonalMusic(season: Season) {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      const musicMap: Record<Season, string> = {
        spring: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        summer: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        autumn: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        winter: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      };

      this.sound = new Audio.Sound();
      await this.sound.loadAsync({ uri: musicMap[season] });
      await this.sound.setIsLoopingAsync(true);
      await this.sound.setVolumeAsync(0.3);
      await this.sound.playAsync();
      this.isPlaying = true;
    } catch (error) {
      console.log('Error playing seasonal music:', error);
    }
  }

  async stopMusic() {
    try {
      if (this.sound && this.isPlaying) {
        await this.sound.stopAsync();
        this.isPlaying = false;
      }
    } catch (error) {
      console.log('Error stopping music:', error);
    }
  }

  async toggleMusic() {
    try {
      if (this.sound) {
        if (this.isPlaying) {
          await this.sound.pauseAsync();
        } else {
          await this.sound.playAsync();
        }
        this.isPlaying = !this.isPlaying;
      }
    } catch (error) {
      console.log('Error toggling music:', error);
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  async cleanup() {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.log('Error cleaning up audio:', error);
    }
  }
}

export const audioManager = new AudioManager();
