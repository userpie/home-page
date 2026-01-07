import {computed, Injectable, signal} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpeakService {
  private readonly defaultLang = 'nl-BE';
  voices = signal<SpeechSynthesisVoice[]>([]);
  defaultVoice = computed(() => {
    return this.voices().find(voice => voice.lang === "nl-BE");
  });

  private speechSynthesis = window.speechSynthesis;

  constructor() {
    this.speechSynthesis.onvoiceschanged = () => {
      this.voices.set(speechSynthesis.getVoices());
    }
  }

  public speak(text: string, lang = this.defaultLang, rate = 1): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    const voice = lang === this.defaultLang ? this.defaultVoice() : this.voices().find(voice => voice.lang === lang);

    console.log(voice);
    if (voice) {
      utterance.voice = voice;
    }
    this.speechSynthesis.speak(utterance);
  }

}
