// Controlador Principal do App "ApenasCorrer"
import { runningPlan } from './data.js';
import { audioEngine } from './audio.js';

// Estado Global do App
let currentWorkout = null;
let currentIntervalIndex = 0;
let timeLeft = 0;
let intervalTimerId = null;
let isWorkoutRunning = false;
let completedWorkouts = [];
let activePhase = 1;
let isPremium = false;


// Mapeamento de cores CSS por tipo de intervalo para o timer
const STATE_CLASSES = {
  warmup: 'state-warmup',
  walk: 'state-walk',
  run: 'state-run',
  cooldown: 'state-cooldown',
  challenge: 'state-run',
  stretch: 'state-stretch'
};

const STATE_TEXT_CLASSES = {
  warmup: 'state-warmup-text',
  walk: 'state-walk-text',
  run: 'state-run-text',
  cooldown: 'state-cooldown-text',
  challenge: 'state-run-text',
  stretch: 'state-stretch-text'
};

// Elementos DOM
const dom = {
  workoutsView: document.getElementById('view-workouts'),
  playerView: document.getElementById('view-player'),
  progressView: document.getElementById('view-progress'),
  
  workoutListContainer: document.getElementById('workout-list-container'),
  activePhaseIndicator: document.getElementById('active-phase-indicator'),
  phaseButtons: document.querySelectorAll('.phase-btn'),
  
  navPlayerTab: document.getElementById('nav-player-tab'),
  navItems: document.querySelectorAll('.nav-item'),
  
  // Player DOM
  playerWeekDay: document.getElementById('player-week-day'),
  playerTitle: document.getElementById('player-title'),
  playerIntervalName: document.getElementById('player-interval-name'),
  playerTimer: document.getElementById('player-timer'),
  playerNextStep: document.getElementById('player-next-step'),
  timerProgress: document.getElementById('timer-progress'),
  btnPlayPause: document.getElementById('btn-play-pause'),
  btnStopWorkout: document.getElementById('btn-stop-workout'),
  btnSkipInterval: document.getElementById('btn-skip-interval'),
  musicOptions: document.querySelectorAll('.music-option'),
  musicVolumeSlider: document.getElementById('music-volume-slider'),
  
  // Progresso DOM
  statsTotalRuns: document.getElementById('stats-total-runs'),
  statsCurrentPhase: document.getElementById('stats-current-phase'),
  historyListContainer: document.getElementById('history-list-container'),
  btnResetProgress: document.getElementById('btn-reset-progress'),
  toast: document.getElementById('toast-message')
};

// -------------------------------------------------------------
// Inicialização do Aplicativo
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  setupNavigation();
  setupPhaseSelectors();
  setupPlayerControls();
  renderCalendar();
  updateProgressStats();
  registerServiceWorker();
});

// -------------------------------------------------------------
// Registro do Service Worker para PWA Offline
// -------------------------------------------------------------
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registrado com sucesso:', reg.scope))
        .catch(err => console.error('Erro ao registrar Service Worker:', err));
    });
  }
}

// -------------------------------------------------------------
// Persistência de Progresso (Local Storage)
// -------------------------------------------------------------
function loadProgress() {
  const saved = localStorage.getItem('apenascorrer_progress');
  if (saved) {
    try {
      completedWorkouts = JSON.parse(saved);
    } catch (e) {
      completedWorkouts = [];
    }
  }
  isPremium = localStorage.getItem('apenascorrer_premium') === 'true';
}

function saveProgress(workoutKey) {
  if (!completedWorkouts.includes(workoutKey)) {
    completedWorkouts.push({
      key: workoutKey,
      date: new Date().toLocaleDateString('pt-BR'),
      phase: currentWorkout.phase,
      week: currentWorkout.week,
      day: currentWorkout.dayName
    });
    localStorage.setItem('apenascorrer_progress', JSON.stringify(completedWorkouts));
    updateProgressStats();
    renderCalendar();
  }
}

function resetProgress() {
  if (confirm('Tem certeza de que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.')) {
    completedWorkouts = [];
    isPremium = false;
    localStorage.removeItem('apenascorrer_progress');
    localStorage.removeItem('apenascorrer_premium');
    showToast('Progresso resetado com sucesso!');
    updateProgressStats();
    renderCalendar();
  }
}

// -------------------------------------------------------------
// Navegação entre Telas (Tabs)
// -------------------------------------------------------------
function setupNavigation() {
  dom.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      switchView(targetId);
    });
  });
  
  dom.btnResetProgress.addEventListener('click', resetProgress);
}

function switchView(viewId) {
  // Oculta todas as views e remove classe active da nav
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  dom.navItems.forEach(nav => nav.classList.remove('active'));
  
  // Ativa a view correspondente
  document.getElementById(viewId).classList.add('active');
  
  // Ativa o item de navegação correspondente
  const navItem = document.querySelector(`.nav-item[data-target="${viewId}"]`);
  if (navItem) navItem.classList.add('active');
  
  // Ajusta indicador de fase no topo dependendo da view
  if (viewId === 'view-workouts') {
    updateTopPhaseIndicator(activePhase);
  } else if (viewId === 'view-player' && currentWorkout) {
    dom.activePhaseIndicator.textContent = `Em Treino: Sem. ${currentWorkout.week}`;
  } else if (viewId === 'view-progress') {
    dom.activePhaseIndicator.textContent = 'Meu Progresso';
  }
}

function updateTopPhaseIndicator(phaseNum) {
  if (phaseNum == 1) dom.activePhaseIndicator.textContent = 'Fase 1 - Meta 2Km';
  if (phaseNum == 2) dom.activePhaseIndicator.textContent = 'Fase 2 - Meta 3Km';
  if (phaseNum == 3) dom.activePhaseIndicator.textContent = 'Fase 3 - Meta 5Km';
}

// -------------------------------------------------------------
// Seletores de Fase e Renderização do Calendário
// -------------------------------------------------------------
function setupPhaseSelectors() {
  dom.phaseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.phaseButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePhase = parseInt(btn.getAttribute('data-phase'));
      updateTopPhaseIndicator(activePhase);
      renderCalendar();
    });
  });
}

function renderCalendar() {
  dom.workoutListContainer.innerHTML = '';
  
  // Filtra semanas da fase ativa
  const phaseWeeks = runningPlan.filter(w => w.phase === activePhase);
  
  phaseWeeks.forEach(weekData => {
    const weekSec = document.createElement('div');
    weekSec.className = 'week-section';
    
    const weekTitle = document.createElement('div');
    weekTitle.className = 'week-title';
    weekTitle.textContent = `Semana ${weekData.week}`;
    weekSec.appendChild(weekTitle);
    
    weekData.workouts.forEach(workout => {
      const workoutKey = `w${weekData.week}-d${workout.day}`;
      const isCompleted = completedWorkouts.some(item => item.key === workoutKey);
      
      // Bloqueia Fase 2 e 3 (Semana 5 em diante) se não for premium
      const isLocked = weekData.phase >= 2 && !isPremium;
      
      const card = document.createElement('div');
      card.className = `workout-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
      
      // Calcula duração total do treino ativo em minutos
      const totalSeconds = workout.intervals.reduce((acc, curr) => acc + curr.duration, 0);
      const totalMinutes = Math.ceil(totalSeconds / 60);
      
      let buttonLabel = isCompleted ? 'Refazer Treino' : 'Iniciar Treino';
      if (isLocked) {
        buttonLabel = '🔒 Desbloquear';
      }
      
      card.innerHTML = `
        <div class="card-header">
          <div>
            <div class="card-day">${workout.dayName}</div>
            <div class="card-title">${workout.title}</div>
          </div>
        </div>
          <div class="card-desc">${workout.description}</div>
          <div class="card-footer">
            <span class="duration-tag">⏱️ ~${totalMinutes} min</span>
            <button class="btn-start" data-week="${weekData.week}" data-day="${workout.day}">
              ${buttonLabel}
            </button>
          </div>
      `;
      
      // Vincula clique para iniciar ou desbloquear treino
      card.querySelector('.btn-start').addEventListener('click', () => {
        if (isLocked) {
          openPaywall();
        } else {
          startActiveWorkout(weekData.week, workout.day);
        }
      });
      
      weekSec.appendChild(card);
    });
    
    dom.workoutListContainer.appendChild(weekSec);
  });
}

// -------------------------------------------------------------
// Lógica do Player de Treino Ativo
// -------------------------------------------------------------
function setupPlayerControls() {
  // Play/Pause
  dom.btnPlayPause.addEventListener('click', togglePlayPause);
  
  // Parar Treino
  dom.btnStopWorkout.addEventListener('click', stopWorkoutPrompt);
  
  // Pular Etapa
  dom.btnSkipInterval.addEventListener('click', skipInterval);
  
  // Seletor de Música
  dom.musicOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      dom.musicOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const beatType = opt.getAttribute('data-music');
      audioEngine.selectedBeatType = beatType;
      
      // Se o treino já estiver rodando, reinicia a música no novo estilo
      if (isWorkoutRunning) {
        audioEngine.stopMusic();
        if (beatType !== 'none') {
          audioEngine.startMusic();
        }
      }
    });
  });
  
  // Controle de Volume
  dom.musicVolumeSlider.addEventListener('input', (e) => {
    audioEngine.setMusicVolume(e.target.value);
  });
}

function startActiveWorkout(weekNum, dayNum) {
  // Encontra os dados exatos do treino
  const weekData = runningPlan.find(w => w.week === weekNum);
  if (!weekData) return;
  currentWorkout = weekData.workouts.find(d => d.day === dayNum);
  if (!currentWorkout) return;
  
  // Reseta estado do Player
  currentIntervalIndex = 0;
  const currentInterval = currentWorkout.intervals[0];
  timeLeft = currentInterval.duration;
  isWorkoutRunning = false;
  
  if (intervalTimerId) {
    clearInterval(intervalTimerId);
  }
  
  // Inicializa visual do player
  dom.playerWeekDay.textContent = `Semana ${currentWorkout.week} • ${currentWorkout.dayName}`;
  dom.playerTitle.textContent = currentWorkout.title;
  
  // Abre aba do Player
  dom.navPlayerTab.classList.remove('hidden');
  switchView('view-player');
  
  updateIntervalUI();
  updatePlayButtonIcon(false);
  
  // Solicita que o usuário inicie clicando no botão para contornar bloqueio de áudio do browser
  audioEngine.init();
  showToast('Toque no Play para iniciar o treino e ativar o som!');
}

function togglePlayPause() {
  audioEngine.init(); // Garante inicialização
  
  if (isWorkoutRunning) {
    // Pausar
    isWorkoutRunning = false;
    clearInterval(intervalTimerId);
    audioEngine.stopMusic();
    updatePlayButtonIcon(false);
  } else {
    // Iniciar/Retomar
    isWorkoutRunning = true;
    updatePlayButtonIcon(true);
    
    // Inicia música se selecionada
    if (audioEngine.selectedBeatType !== 'none') {
      audioEngine.startMusic();
    }
    
    // Fala o comando da etapa atual se for o começo do treino ou de um intervalo
    const currentInterval = currentWorkout.intervals[currentIntervalIndex];
    if (timeLeft === currentInterval.duration) {
      playCoachAnnouncement(currentInterval);
    }
    
    // Inicia loop do cronômetro
    intervalTimerId = setInterval(tick, 1000);
  }
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    
    // Beep de contagem regressiva nos últimos 3 segundos
    if (timeLeft > 0 && timeLeft <= 3) {
      playBeep(880, 0.08); // beep curto agudo
    }
    
    updateIntervalUI();
  } else {
    // Avança para o próximo intervalo
    nextInterval();
  }
}

function nextInterval() {
  currentIntervalIndex++;
  
  // Fim do Treino!
  if (currentIntervalIndex >= currentWorkout.intervals.length) {
    finishWorkout();
  } else {
    // Próximo intervalo
    const nextInt = currentWorkout.intervals[currentIntervalIndex];
    timeLeft = nextInt.duration;
    
    // Beep de transição (grave e longo)
    playBeep(440, 0.4);
    
    updateIntervalUI();
    playCoachAnnouncement(nextInt);
  }
}

function skipInterval() {
  if (!currentWorkout) return;
  
  // Beep de pulo
  playBeep(600, 0.15);
  
  timeLeft = 0;
  nextInterval();
}

function stopWorkoutPrompt() {
  if (confirm('Deseja parar o treino ativo e voltar ao calendário? Seu progresso de hoje não será salvo.')) {
    stopWorkout();
  }
}

function stopWorkout() {
  isWorkoutRunning = false;
  clearInterval(intervalTimerId);
  audioEngine.stopMusic();
  currentWorkout = null;
  
  // Oculta aba do player e volta para treinos
  dom.navPlayerTab.classList.add('hidden');
  switchView('view-workouts');
}

function finishWorkout() {
  isWorkoutRunning = false;
  clearInterval(intervalTimerId);
  audioEngine.stopMusic();
  
  // Mensagem final falada
  audioEngine.speak("Parabéns! Você completou com sucesso o treino de hoje! Muito bom trabalho!");
  
  // Salva no progresso
  const workoutKey = `w${currentWorkout.week}-d${currentWorkout.day}`;
  saveProgress(workoutKey);
  
  showToast('Treino Concluído! Parabéns!');
  
  // Oculta aba do player
  dom.navPlayerTab.classList.add('hidden');
  currentWorkout = null;
  
  // Vai para a view de progresso para comemorar
  switchView('view-progress');
}

// -------------------------------------------------------------
// Gerenciamento e Anúncios do Treinador de Voz (Coach)
// -------------------------------------------------------------
function playCoachAnnouncement(interval) {
  let announcement = "";
  
  // Formata tempo amigável
  const minutes = Math.floor(interval.duration / 60);
  const seconds = interval.duration % 60;
  let timeStr = "";
  if (minutes > 0) {
    timeStr = `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (seconds > 0) timeStr += ` e ${seconds} segundos`;
  } else {
    timeStr = `${seconds} segundos`;
  }

  switch (interval.type) {
    case 'warmup':
      announcement = `Atenção, vamos começar com o aquecimento. Caminhada leve por ${timeStr}. Mantenha os braços relaxados.`;
      break;
    case 'walk':
      announcement = `Caminhada moderada por ${timeStr}. Aproveite para recuperar o fôlego.`;
      break;
    case 'run':
      announcement = `Hora de correr! Ritmo leve por ${timeStr}. Não force o passo, respire fundo.`;
      break;
    case 'challenge':
      announcement = `Atenção! Começa o seu desafio de corrida contínua de ${interval.distanceGoal || 'dois quilômetros'}. Corra em ritmo estável, controle a respiração e vá até o fim!`;
      break;
    case 'cooldown':
      announcement = `Treino concluído. Hora de desaquecer com caminhada lenta por ${timeStr}.`;
      break;
    case 'stretch':
      announcement = `Excelente! Faça alguns alongamentos leves para pernas, costas e panturrilhas. Você terminou por hoje.`;
      break;
    default:
      announcement = `Etapa: ${interval.name} por ${timeStr}.`;
  }
  
  audioEngine.speak(announcement);
}

// Beep sonoro simples usando Web Audio API do motor
function playBeep(pitch, duration) {
  if (audioEngine && audioEngine.ctx) {
    try {
      const ctx = audioEngine.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(audioEngine.masterGainNode || ctx.destination);
      
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Erro ao tocar beep:', e);
    }
  }
}

// -------------------------------------------------------------
// Funções Auxiliares de Atualização de UI
// -------------------------------------------------------------
function updateIntervalUI() {
  if (!currentWorkout) return;
  
  const currentInterval = currentWorkout.intervals[currentIntervalIndex];
  
  // Atualiza Nome do Intervalo
  dom.playerIntervalName.textContent = currentInterval.name;
  
  // Altera classe de cor do texto do intervalo baseado no tipo
  dom.playerIntervalName.className = 'interval-name';
  const textClass = STATE_TEXT_CLASSES[currentInterval.type] || '';
  if (textClass) dom.playerIntervalName.classList.add(textClass);
  
  // Atualiza Timer Regressivo formato MM:SS ou apenas informativo se for 0s
  if (currentInterval.duration === 0) {
    dom.playerTimer.textContent = "ALONGAR";
  } else {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    dom.playerTimer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Atualiza Próxima Etapa Teaser
  if (currentIntervalIndex + 1 < currentWorkout.intervals.length) {
    const nextInt = currentWorkout.intervals[currentIntervalIndex + 1];
    const nextMins = Math.floor(nextInt.duration / 60);
    const timeInfo = nextMins > 0 ? `${nextMins}m` : `${nextInt.duration}s`;
    dom.playerNextStep.textContent = `Próximo: ${nextInt.name} (${timeInfo})`;
  } else {
    dom.playerNextStep.textContent = 'Treino Concluído!';
  }
  
  // Atualiza Círculo de Progresso (Stroke Dash Offset)
  if (currentInterval.duration > 0) {
    const totalDash = 691.15; // 2 * PI * r (r=110)
    const ratio = timeLeft / currentInterval.duration;
    const offset = totalDash - (ratio * totalDash);
    
    dom.timerProgress.style.strokeDashoffset = offset;
    
    // Altera cor do círculo de progresso conforme o estado
    dom.timerProgress.className = 'timer-ring-circle';
    const stateClass = STATE_CLASSES[currentInterval.type] || '';
    if (stateClass) dom.timerProgress.classList.add(stateClass);
  } else {
    dom.timerProgress.style.strokeDashoffset = 0;
  }
}

function updatePlayButtonIcon(isPlaying) {
  if (isPlaying) {
    // Ícone de Pause
    dom.btnPlayPause.innerHTML = `
      <svg viewBox="0 0 24 24" width="34" height="34">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    `;
  } else {
    // Ícone de Play
    dom.btnPlayPause.innerHTML = `
      <svg viewBox="0 0 24 24" width="34" height="34">
        <path d="M8 5v14l11-7z"/>
      </svg>
    `;
  }
}

// Atualiza a aba de progresso com estatísticas baseadas no localStorage
function updateProgressStats() {
  const total = completedWorkouts.length;
  dom.statsTotalRuns.textContent = total;
  
  // Determina a assinatura/fase com destaque para Premium
  if (isPremium) {
    dom.statsCurrentPhase.textContent = 'Premium 👑';
    dom.statsCurrentPhase.style.color = '#ffd600';
  } else {
    let currentPhase = 1;
    if (completedWorkouts.length > 0) {
      const phases = completedWorkouts.map(w => w.phase);
      currentPhase = Math.max(...phases);
    }
    dom.statsCurrentPhase.textContent = `Fase ${currentPhase} (Grátis)`;
    dom.statsCurrentPhase.style.color = 'var(--color-primary)';
  }
  
  // Renderiza a lista de histórico
  dom.historyListContainer.innerHTML = '';
  if (completedWorkouts.length === 0) {
    dom.historyListContainer.innerHTML = `
      <div class="history-row" style="justify-content: center; color: var(--text-muted);">
        Nenhum treino concluído ainda. Comece hoje!
      </div>
    `;
  } else {
    // Ordena do mais recente para o mais antigo
    const sortedHistory = [...completedWorkouts].reverse();
    sortedHistory.forEach(item => {
      const row = document.createElement('div');
      row.className = 'history-row';
      row.innerHTML = `
        <div>
          <strong>Semana ${item.week} - ${item.day}</strong>
          <div class="history-date">Concluído em ${item.date}</div>
        </div>
        <span style="color: var(--color-secondary); font-weight: bold;">Fase ${item.phase} ✓</span>
      `;
      dom.historyListContainer.appendChild(row);
    });
  }
}

// Mostra mensagem temporária
function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add('show');
  setTimeout(() => {
    dom.toast.classList.remove('show');
  }, 3500);
}

// -------------------------------------------------------------
// Gerenciamento do Paywall Premium e Compras
// -------------------------------------------------------------
const paywallDOM = {
  modal: document.getElementById('paywall-modal'),
  stepOffer: document.getElementById('paywall-step-offer'),
  stepPix: document.getElementById('paywall-step-pix'),
  btnClose: document.getElementById('btn-close-paywall'),
  btnPayPix: document.getElementById('btn-pay-pix'),
  btnConfirm: document.getElementById('btn-confirm-payment'),
  btnCopy: document.getElementById('btn-copy-pix'),
  btnBack: document.getElementById('btn-back-offer'),
  pixKeyText: document.getElementById('pix-key-text')
};

function openPaywall() {
  if (!paywallDOM.modal) return;
  paywallDOM.stepOffer.style.display = 'block';
  paywallDOM.stepPix.style.display = 'none';
  paywallDOM.modal.classList.add('active');
  audioEngine.init();
  audioEngine.speak("Desbloqueie a versão premium para acessar esta etapa!");
}

function closePaywall() {
  if (!paywallDOM.modal) return;
  paywallDOM.modal.classList.remove('active');
}

// Vincula eventos do Paywall
if (paywallDOM.modal) {
  paywallDOM.btnClose.addEventListener('click', closePaywall);
  
  // Ir para tela do Pix
  paywallDOM.btnPayPix.addEventListener('click', () => {
    paywallDOM.stepOffer.style.display = 'none';
    paywallDOM.stepPix.style.display = 'block';
  });
  
  // Copiar chave Pix
  paywallDOM.btnCopy.addEventListener('click', () => {
    paywallDOM.pixKeyText.select();
    paywallDOM.pixKeyText.setSelectionRange(0, 99999); // Para mobile
    navigator.clipboard.writeText(paywallDOM.pixKeyText.value).then(() => {
      paywallDOM.btnCopy.textContent = "Copiado!";
      showToast("Chave Pix copiada para a área de transferência!");
      setTimeout(() => {
        paywallDOM.btnCopy.textContent = "Copiar Código";
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar chave:', err);
    });
  });
  
  // Voltar para a oferta
  paywallDOM.btnBack.addEventListener('click', () => {
    paywallDOM.stepOffer.style.display = 'block';
    paywallDOM.stepPix.style.display = 'none';
  });
  
  // Simular confirmação de pagamento Pix
  paywallDOM.btnConfirm.addEventListener('click', () => {
    isPremium = true;
    localStorage.setItem('apenascorrer_premium', 'true');
    closePaywall();
    
    // Feedback de voz e visual
    audioEngine.init();
    audioEngine.speak("Parabéns! Seu pagamento foi confirmado. Agora você é um membro premium do Apenas Correr! Todos os treinos foram liberados.");
    
    showToast('Acesso Premium Ativado! Bons treinos!');
    renderCalendar();
    updateProgressStats();
  });
}

