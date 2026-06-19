// Gerenciador de Áudio e Sintetizador para "ApenasCorrer"
// Fornece um treinador por voz (Text-to-Speech) e batidas eletrônicas geradas em tempo real

class RunningAudioEngine {
  constructor() {
    this.ctx = null;
    this.musicGainNode = null;
    this.masterGainNode = null;
    this.isPlaying = false;
    this.bpm = 135; // Batidas por minuto ideal para trote/corrida
    this.schedulerTimer = null;
    this.nextNoteTime = 0.0;
    this.currentBeat = 0;
    this.lookahead = 25.0; // Milissegundos entre agendamentos
    this.scheduleAheadTime = 0.1; // Segundos de áudio agendados antes do tempo
    this.musicVolume = 0.4;
    this.voiceVolume = 1.0;
    
    // Lista de vozes disponíveis
    this.voice = null;
    this.speechSynthesis = window.speechSynthesis;
    
    // Configuração de sintetizador
    this.selectedBeatType = 'electro'; // 'electro', 'lofi', 'none'
  }

  // Inicializa o AudioContext após interação do usuário
  init() {
    if (this.ctx) return;
    
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    this.masterGainNode = this.ctx.createGain();
    this.masterGainNode.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.masterGainNode.connect(this.ctx.destination);
    
    this.musicGainNode = this.ctx.createGain();
    this.musicGainNode.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    this.musicGainNode.connect(this.masterGainNode);

    // Carrega vozes de síntese de fala
    this.loadVoice();
    if (this.speechSynthesis.onvoiceschanged !== undefined) {
      this.speechSynthesis.onvoiceschanged = () => this.loadVoice();
    }
  }

  // Seleciona a melhor voz em português disponível
  loadVoice() {
    const voices = this.speechSynthesis.getVoices();
    // Procura por vozes pt-BR ou pt-PT
    const ptVoices = voices.filter(v => v.lang.startsWith('pt'));
    if (ptVoices.length > 0) {
      // Prioriza vozes pt-BR do Google se disponíveis
      const googlePt = ptVoices.find(v => v.name.includes('Google') || v.name.includes('Microsoft'));
      this.voice = googlePt || ptVoices[0];
    }
  }

  // Fala comandos para o usuário
  speak(text) {
    if (!this.speechSynthesis) return;
    
    // Cancela falas anteriores imediatas
    this.speechSynthesis.cancel();
    
    // Abaixa a música temporariamente para o usuário ouvir o treinador (Ducking)
    this.duckMusic(true);

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.lang = 'pt-BR';
    utterance.volume = this.voiceVolume;
    utterance.rate = 1.0; // Velocidade de fala

    utterance.onend = () => {
      // Restaura o volume da música após o fim da fala
      this.duckMusic(false);
    };

    utterance.onerror = () => {
      this.duckMusic(false);
    };

    this.speechSynthesis.speak(utterance);
  }

  // Reproduz arquivo de áudio MP3 gravado com fallback para síntese de voz (TTS)
  playVoiceFile(type, fallbackText) {
    this.init();

    // Cancela síntese de fala em andamento para não encavalar
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }

    // Mapeamento dos nomes de arquivo em português
    const fileNameMap = {
      warmup: 'aquecimento',
      walk: 'caminhar',
      run: 'correr',
      challenge: 'desafio',
      cooldown: 'desaquecimento',
      stretch: 'alongar',
      finish: 'fim'
    };

    const fileName = fileNameMap[type] || type;
    const audioPath = `./assets/audio/${fileName}.mp3`;
    const audio = new Audio(audioPath);
    audio.volume = this.voiceVolume;

    // Efeito de Ducking na música
    this.duckMusic(true);

    audio.onended = () => {
      this.duckMusic(false);
    };

    audio.onerror = () => {
      // Caso o arquivo MP3 não exista no servidor/celular (Erro 404), usa o TTS de fallback
      console.warn(`[AudioEngine] Áudio real não encontrado em ${audioPath}. Usando voz de síntese (TTS) de segurança.`);
      this.speak(fallbackText);
    };

    audio.play().catch(err => {
      console.warn("[AudioEngine] Reprodução do MP3 bloqueada ou com erro. Usando TTS.", err);
      this.speak(fallbackText);
    });
  }

  // Abaixa o volume da música (Ducking effect)
  duckMusic(isDucked) {
    if (!this.ctx || !this.musicGainNode) return;
    const targetVolume = isDucked ? this.musicVolume * 0.25 : this.musicVolume;
    this.musicGainNode.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + 0.3);
  }

  // Ajusta o volume da música
  setMusicVolume(vol) {
    this.musicVolume = parseFloat(vol);
    if (this.ctx && this.musicGainNode) {
      this.musicGainNode.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  // Inicia a música de batida
  startMusic() {
    this.init();
    if (this.isPlaying) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.isPlaying = true;
    this.nextNoteTime = this.ctx.currentTime;
    this.currentBeat = 0;
    
    this.schedulerLoop();
  }

  // Pausa a música de batida
  stopMusic() {
    this.isPlaying = false;
    clearTimeout(this.schedulerTimer);
  }

  // Loop de agendamento de áudio profissional (A Tale of Two Clocks)
  schedulerLoop() {
    if (!this.isPlaying) return;
    
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.currentBeat, this.nextNoteTime);
      this.advanceBeat();
    }
    
    this.schedulerTimer = setTimeout(() => this.schedulerLoop(), this.lookahead);
  }

  advanceBeat() {
    const secondsPerBeat = 60.0 / this.bpm;
    // Agendamos colcheias (subdivisão de 1/8 do compasso)
    // O compasso tem 4 tempos, dividimos cada tempo por 2. 8 batidas no total por compasso.
    this.nextNoteTime += 0.5 * secondsPerBeat; 
    this.currentBeat = (this.currentBeat + 1) % 8;
  }

  scheduleNote(beat, time) {
    if (this.selectedBeatType === 'none') return;
    
    // Estruturas de ritmo baseadas no tipo de música selecionado
    if (this.selectedBeatType === 'electro') {
      this.playElectroBeat(beat, time);
    } else if (this.selectedBeatType === 'lofi') {
      this.playLofiBeat(beat, time);
    }
  }

  // Bumbo (Kick) de Synth Pop de alta energia
  playKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.musicGainNode);

    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.15);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.linearRampToValueAtTime(0.01, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.16);
  }

  // Caixa (Snare) ou Palmas Sintéticas
  playSnare(time) {
    // Ruído branco para a esteira da caixa
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filtro passa-banda
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.musicGainNode);

    // Corpo tonal da caixa
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);
    
    oscGain.gain.setValueAtTime(0.5, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);

    osc.connect(oscGain);
    oscGain.connect(this.musicGainNode);

    noise.start(time);
    noise.stop(time + 0.12);
    osc.start(time);
    osc.stop(time + 0.1);
  }

  // Prato (Hi-hat) leve para manter a cadência
  playHiHat(time, isOpen = false) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 10000; // Tom alto e estridente

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGainNode);

    const duration = isOpen ? 0.15 : 0.04;
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.005, time + duration);

    osc.start(time);
    osc.stop(time + duration + 0.01);
  }

  // Nota de baixo de Synthwave sintetizada
  playBass(time, pitch, duration) {
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc2.type = 'square';
    
    osc.frequency.setValueAtTime(pitch, time);
    osc2.frequency.setValueAtTime(pitch * 1.005, time); // detune para coro espesso

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + duration);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGainNode);

    osc.start(time);
    osc.stop(time + duration);
    osc2.start(time);
    osc2.stop(time + duration);
  }

  // Batida Electro - Alta Energia (Estilo 80s/Synthwave)
  playElectroBeat(beat, time) {
    // Sequência de Bateria (8 colcheias):
    // Beat 0: Kick
    // Beat 1: Hat
    // Beat 2: Hat
    // Beat 3: Hat (Open)
    // Beat 4: Kick + Snare
    // Beat 5: Hat
    // Beat 6: Hat
    // Beat 7: Hat (Open)
    
    if (beat === 0) {
      this.playKick(time);
    } else if (beat === 4) {
      this.playKick(time);
      this.playSnare(time);
    } else if (beat === 2 || beat === 6) {
      this.playHiHat(time, false);
    } else if (beat === 3 || beat === 7) {
      this.playHiHat(time, true);
    }

    // Baixo Bassline Energético (Linha de baixo contínua)
    // Tons: F1 (43.65 Hz), G1 (49.00 Hz), A1 (55.00 Hz), C2 (65.41 Hz)
    const rootNotes = [55.00, 55.00, 65.41, 58.27, 49.00, 49.00, 58.27, 51.91];
    const currentTone = rootNotes[Math.floor(this.ctx.currentTime / 8) % rootNotes.length];
    
    // Toca baixo nas colcheias ímpares e pares (ritmo galopante)
    if (beat % 2 === 0) {
      this.playBass(time, currentTone, 0.15);
    } else {
      this.playBass(time, currentTone * 1.5, 0.08); // quinta ou oitava
    }
  }

  // Batida Lo-Fi - Mais Calma e Relaxante
  playLofiBeat(beat, time) {
    // Sequência Lo-fi:
    // Beat 0: Bumbo macio (Kick)
    // Beat 2: Hat
    // Beat 4: Caixa abafada (Snare com filtro baixo)
    // Beat 6: Bumbo duplo
    // Beat 7: Hat suave
    
    if (beat === 0) {
      this.playLofiKick(time);
    } else if (beat === 4) {
      this.playLofiSnare(time);
    } else if (beat === 5) {
      this.playLofiKick(time);
    } else if (beat === 2 || beat === 6) {
      this.playHiHat(time, false);
    }

    // Melodia de Rodas Elétricas Lo-fi ocasional (senoidal suave)
    if (beat === 0 || beat === 3 || beat === 6) {
      const chords = [196.00, 220.00, 261.63, 293.66, 329.63]; // Sol, Lá, Dó, Ré, Mi
      const note = chords[Math.floor(Math.random() * chords.length)];
      if (Math.random() > 0.5) {
        this.playLofiPiano(time, note);
      }
    }
  }

  playLofiKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.musicGainNode);

    osc.frequency.setValueAtTime(80, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.2);

    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

    osc.start(time);
    osc.stop(time + 0.21);
  }

  playLofiSnare(time) {
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filtro passa-banda lo-fi (cortado em altas frequências para soar abafado)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    filter.Q.value = 1.0;
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.musicGainNode);

    noise.start(time);
    noise.stop(time + 0.15);
  }

  playLofiPiano(time, pitch) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine'; // Som puro e suave
    osc.frequency.setValueAtTime(pitch, time);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

    osc.connect(gain);
    gain.connect(this.musicGainNode);

    osc.start(time);
    osc.stop(time + 1.25);
  }
}

export const audioEngine = new RunningAudioEngine();
