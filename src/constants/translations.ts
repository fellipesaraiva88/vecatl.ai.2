// Traduções em Português Brasileiro
export const TRANSLATIONS = {
  // Navegação
  nav: {
    tasks: 'Tarefas',
    ideas: 'Ideias',
    projects: 'Projetos',
    notes: 'Anotações',
    home: 'Início'
  },

  // Chat Assistant
  chat: {
    placeholder: 'Mensagem para Vectal...',
    whatCanIHelp: 'Como posso ajudar?',
    quickPrompts: [
      'Crie uma nova tarefa para mim',
      'Organize minhas ideias por prioridade',
      'Resuma minhas anotações de hoje',
      'Mostre meus projetos em andamento'
    ],
    errorMessage: '❌ Erro ao buscar resposta.',
    sendButton: 'Enviar'
  },

  // Ideias
  ideas: {
    title: '💡 Suas Ideias',
    titlePage: '💡 Caixa de Ideias',
    placeholder: 'Digite sua ideia...',
    addButton: 'Adicionar',
    convertToTask: 'Converter para Tarefa',
    convertToNote: 'Converter para Anotação',
    delete: 'Excluir',
    loading: 'Carregando ideias...',
    empty: 'Nenhuma ideia ainda. Comece escrevendo algo 💡',
    emptyShort: 'Nenhuma ideia ainda. Comece escrevendo algo 💬'
  },

  // Projetos
  projects: {
    title: 'Projetos',
    newProject: '+ Novo Projeto',
    name: 'Nome do Projeto',
    description: 'Descrição',
    create: 'Criar Projeto',
    cancel: 'Cancelar',
    delete: 'Excluir',
    empty: 'Nenhum projeto ainda.',
    loading: 'Carregando projetos...'
  },

  // Anotações
  notes: {
    title: '📝 Anotações',
    placeholder: 'Adicione uma anotação...',
    important: 'Importante',
    add: 'Adicionar',
    delete: 'Excluir',
    loading: 'Carregando...',
    empty: 'Nenhuma anotação ainda.',
    error: 'Falha ao carregar anotações.',
    addError: 'Falha ao adicionar anotação.',
    deleteError: 'Falha ao excluir anotação.'
  },

  // Tarefas
  tasks: {
    title: '📝 Tarefas',
    addTask: 'Adicionar Tarefa',
    newTask: 'Nova Tarefa',
    taskTitle: 'Título da Tarefa',
    description: 'Descrição',
    dueDate: 'Data de Vencimento',
    priority: 'Prioridade',
    project: 'Projeto',
    create: 'Criar Tarefa',
    cancel: 'Cancelar',
    delete: 'Excluir',
    complete: 'Concluir',
    overdue: 'Tarefas Atrasadas',
    completed: 'Tarefas Concluídas',
    pending: 'Tarefas Pendentes',
    loading: 'Carregando...',
    empty: 'Nenhuma tarefa ainda.',
    error: 'Erro ao carregar tarefas.',
    addError: 'Falha ao adicionar tarefa.',
    updateError: 'Falha ao atualizar tarefa.',
    deleteError: 'Falha ao excluir tarefa.',
    priorities: {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta'
    }
  },

  // Geral
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    close: 'Fechar',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    confirm: 'Confirmar',
    yes: 'Sim',
    no: 'Não'
  },

  // Mensagens de status
  status: {
    ideaAdded: 'Ideia adicionada com sucesso!',
    ideaDeleted: 'Ideia excluída com sucesso!',
    ideaConverted: 'Ideia convertida com sucesso!',
    projectCreated: 'Projeto criado com sucesso!',
    projectDeleted: 'Projeto excluído com sucesso!',
    noteAdded: 'Anotação adicionada com sucesso!',
    noteDeleted: 'Anotação excluída com sucesso!',
    taskCreated: 'Tarefa criada com sucesso!',
    taskUpdated: 'Tarefa atualizada com sucesso!',
    taskDeleted: 'Tarefa excluída com sucesso!'
  }
};

// Formatação de datas em português
export const DATE_FORMATS = {
  full: 'dd \'de\' MMMM \'de\' yyyy',
  short: 'dd/MM/yyyy',
  time: 'HH:mm',
  dateTime: 'dd/MM/yyyy \'às\' HH:mm'
};

// Configurações de localização
export const LOCALE_CONFIG = {
  locale: 'pt-BR',
  currency: 'BRL',
  timezone: 'America/Sao_Paulo'
};
