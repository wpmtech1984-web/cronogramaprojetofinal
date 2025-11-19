// ==========================================
// CONFIGURAÇÃO DO SUPABASE (JÁ INSERIDA)
// ==========================================
const SUPABASE_URL = 'https://ckeqxkfvfhpbtzdjqgwj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZXF4a2Z2ZmhwYnR6ZGpxZ3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTQxMDksImV4cCI6MjA3OTA5MDEwOX0.Bki5D_rwkc8mGKK7jMfP478rYTH78ier3dPY3bDIEAU';
// ==========================================

// Inicializando o Cliente Supabase
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// Dados Estruturais (Tarefas do PDF)
const structure = [
    {
        week: "SEMANA 1",
        date: "18 a 22 de Novembro",
        tasks: [
            { id: 101, team: "Todas", text: "18/11: Formação das equipes, definição de funções e planejamento inicial." },
            { id: 102, team: "Equipe 1", text: "Início da pesquisa de campo e identificação de barreiras de acessibilidade." },
            { id: 103, team: "Equipe 2", text: "Definição do tema central/público-alvo e desenho das 3 versões do roteiro." },
            { id: 104, team: "Equipe 3", text: "Criação do conceito da Condução Afetiva e técnicas de acolhimento." },
            { id: 105, team: "Equipe 4", text: "Estruturação da Introdução do artigo e definição da metodologia escrita." },
            { id: 106, team: "Equipe 5", text: "Planejamento da apresentação lúdica e definição de papéis/recursos." },
            { id: 107, team: "Equipe 6", text: "Criação da identidade visual e protótipo digital inicial." },
            { id: 108, team: "ENTREGA", text: "Prévia do diagnóstico (Eq. 1)", isDelivery: true },
            { id: 109, team: "ENTREGA", text: "Tema + público-alvo (Eq. 2)", isDelivery: true },
            { id: 110, team: "ENTREGA", text: "Esboço da Condução Afetiva (Eq. 3)", isDelivery: true },
            { id: 111, team: "ENTREGA", text: "Introdução do artigo (Eq. 4)", isDelivery: true },
            { id: 112, team: "ENTREGA", text: "Rascunho da apresentação (Eq. 5)", isDelivery: true },
            { id: 113, team: "ENTREGA", text: "Identidade visual + QR inicial (Eq. 6)", isDelivery: true }
        ]
    },
    {
        week: "SEMANA 2",
        date: "25 a 29 de Novembro",
        tasks: [
            { id: 201, team: "Equipe 1", text: "Finalizar pesquisas; relatório técnico do destino." },
            { id: 202, team: "Equipe 2", text: "Finalizar 3 versões do roteiro e tabelas de horários." },
            { id: 203, team: "Equipe 3", text: "Finalizar metodologia da Condução Afetiva e plano de condução." },
            { id: 204, team: "Equipe 4", text: "Redação do Referencial Teórico e Metodologia." },
            { id: 205, team: "Equipe 5", text: "Ensaios iniciais, teste de trilha sonora e objetos." },
            { id: 206, team: "Equipe 6", text: "Protótipo digital beta, gravação de entrevistas e QR Codes." },
            { id: 207, team: "ENTREGA", text: "Roteiro final (Eq. 2)", isDelivery: true },
            { id: 208, team: "ENTREGA", text: "Metodologia concluída (Eq. 3)", isDelivery: true },
            { id: 209, team: "ENTREGA", text: "60% do artigo (Eq. 4)", isDelivery: true },
            { id: 211, team: "ENTREGA", text: "Ensaios iniciais (Eq. 5)", isDelivery: true },
            { id: 210, team: "ENTREGA", text: "Protótipo beta + gravações (Eq. 6)", isDelivery: true }
        ]
    },
    {
        week: "SEMANA 3",
        date: "02 a 06 de Dezembro",
        tasks: [
            { id: 301, team: "Equipe 1", text: "Entrega final do diagnóstico; texto para artigo e vídeo." },
            { id: 302, team: "Equipe 2", text: "Revisar roteiro; criar mapa e infográficos." },
            { id: 303, team: "Equipe 3", text: "Ensaiar aplicação prática da metodologia." },
            { id: 304, team: "Equipe 4", text: "Redigir Resultados e Discussão; escrever Conclusões." },
            { id: 305, team: "Equipe 5", text: "Ensaio completo; testar degustação, trilha e objetos." },
            { id: 306, team: "Equipe 6", text: "Gravação final; edição do documentário; finalizar QR Codes." },
            { id: 307, team: "ENTREGA", text: "Artigo 80% concluído (Eq. 4)", isDelivery: true },
            { id: 308, team: "ENTREGA", text: "Infográfico + mapa (Eq. 2)", isDelivery: true },
            { id: 310, team: "ENTREGA", text: "Ensaio oficial (Eq. 5)", isDelivery: true },
            { id: 309, team: "ENTREGA", text: "Documentário em 70% (Eq. 6)", isDelivery: true }
        ]
    },
    {
        week: "RETA FINAL",
        date: "09 e 10 de Dezembro",
        tasks: [
            { id: 401, team: "Todas", text: "09/12 (Seg): Revisão final artigo, protótipo, ensaio geral e portfólio." },
            { id: 402, team: "Todas", text: "10/12 (Ter): APRESENTAÇÃO FINAL (Experiência guiada, doc, protótipo)." },
            { id: 403, team: "ENTREGA", text: "Artigo científico final", isDelivery: true },
            { id: 404, team: "ENTREGA", text: "Documentário Finalizado", isDelivery: true }
        ]
    }
];

// Variáveis de Estado
let dbState = {}; 
let currentFilter = 'all';

// 1. Carregar dados iniciais do Banco
async function initApp() {
    try {
        const statusEl = document.getElementById('connectionStatus');
        statusEl.innerHTML = 'Buscando dados...';

        // Busca todas as tarefas do banco
        const { data, error } = await sb.from('tasks').select('*');
        
        if (error) throw error;

        // Mapeia array para objeto { id: true/false }
        dbState = {};
        if(data) {
            data.forEach(row => {
                dbState[row.id] = row.done;
            });
        }

        statusEl.innerHTML = '<span class="online">● Sistema Online e Sincronizado</span>';
        renderApp(currentFilter);
        
        // Inicia escuta em tempo real
        setupRealtime();

    } catch (err) {
        console.error("Erro ao inicializar:", err);
        document.getElementById('connectionStatus').innerHTML = '<span class="offline">⚠ Erro de conexão (Verifique internet)</span>';
    }
}

// 2. Configurar Realtime (Atualizações ao vivo)
function setupRealtime() {
    sb.channel('public:tasks')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
            console.log('Mudança detectada:', payload);
            const { id, done } = payload.new;
            
            // Atualiza estado local
            dbState[id] = done;
            
            // Atualiza visualmente apenas o checkbox específico para não recarregar tudo (opcional)
            // Mas por segurança, vamos re-renderizar a tela:
            renderApp(currentFilter);
        })
        .subscribe();
}

// 3. Renderizar a Interface
function renderApp(filterTeam) {
    currentFilter = filterTeam;
    const container = document.getElementById('app-content');
    container.innerHTML = '';
    
    structure.forEach(week => {
        // Filtro de visualização
        const visibleTasks = week.tasks.filter(t => {
            if (filterTeam === 'all') return true;
            if (t.team === 'Todas' || t.team === 'ENTREGA') return true;
            return t.team === filterTeam;
        });

        if (visibleTasks.length === 0) return;

        const weekCard = document.createElement('div');
        weekCard.className = 'week-section';
        
        let tasksHtml = '';
        visibleTasks.forEach(task => {
            const isChecked = dbState[task.id] ? 'checked' : '';
            const doneClass = dbState[task.id] ? 'done' : '';
            const deliveryClass = task.isDelivery ? 'is-delivery' : '';
            
            tasksHtml += `
                <div class="task-item ${deliveryClass}">
                    <div id="chk-${task.id}" class="checkbox ${isChecked}" onclick="toggleTask(${task.id})"></div>
                    <div class="task-content">
                        <span class="task-team">${task.team}</span>
                        <p class="task-desc ${doneClass}">${task.text}</p>
                    </div>
                </div>
            `;
        });

        weekCard.innerHTML = `
            <div class="week-header">
                <h3 class="week-title">${week.week}</h3>
                <span class="week-date">${week.date}</span>
            </div>
            ${tasksHtml}
        `;
        container.appendChild(weekCard);
    });

    updateFiltersUI();
    updateProgressBar();
}

// 4. Ação de Clicar (Enviar para o Supabase)
async function toggleTask(id) {
    const chkElement = document.getElementById(`chk-${id}`);
    if(chkElement) chkElement.classList.add('loading'); // Feedback visual

    const newValue = !dbState[id];

    // Atualização Otimista (atualiza na tela antes do banco responder)
    dbState[id] = newValue;
    renderApp(currentFilter);

    // Envia para o banco (Upsert: cria se não existe, atualiza se existe)
    const { error } = await sb
        .from('tasks')
        .upsert({ id: id, done: newValue })
        .select();

    if (error) {
        alert('Erro ao salvar. Verifique sua conexão.');
        console.error(error);
        // Reverte erro
        dbState[id] = !newValue; 
        renderApp(currentFilter);
    }
}

function updateProgressBar() {
    let total = 0;
    let checked = 0;
    
    structure.forEach(week => {
        week.tasks.forEach(task => {
            total++;
            if (dbState[task.id]) checked++;
        });
    });

    const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
    document.getElementById('globalProgress').style.width = percent + '%';
    document.getElementById('globalProgressText').innerText = percent + '% Concluído';
}

function filterTasks(team) {
    // Atualiza visual dos botões
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    // Encontra o botão clicado (via event não é ideal aqui, então buscamos pelo texto/onclick, 
    // mas para simplificar, vamos apenas re-renderizar o conteúdo.
    // A atualização visual dos botões será feita na updateFiltersUI se implementada complexamente,
    // mas aqui faremos simples via target no HTML onclick).
    
    renderApp(team);
}

// Helper para atualizar botões de filtro visualmente
window.onclick = function(e) {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    }
}

function updateFiltersUI() {
    // Mantém botões funcionando
}

// Iniciar App
initApp();