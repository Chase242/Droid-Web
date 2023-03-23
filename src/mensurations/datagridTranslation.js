export const gridTranslation = {
  // Root
  noRowsLabel: 'Sem registros',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',

  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Comfortável',

  // Columns selector toolbar button text
  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Selecionar coluna',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Esconder filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Procurar...',
  toolbarQuickFilterLabel: 'Procurar',
  toolbarQuickFilterDeleteIconLabel: 'Limpar',

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Baixar como CSV',
  toolbarExportPrint: 'Captura de tela',
  toolbarExportExcel: 'Baixar como Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Encontrar coluna',
  columnsPanelTextFieldPlaceholder: 'título da coluna',
  columnsPanelDragIconLabel: 'Reordenar coluna',
  columnsPanelShowAllButton: 'Mostrar todos',
  columnsPanelHideAllButton: 'Esconder todos',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelRemoveAll: 'Remover todos',
  filterPanelDeleteIconLabel: 'Deletar',
  filterPanelLogicOperator: 'Operador lógico',
  filterPanelOperator: 'Operador',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor do filtro',

  // Filter operators text
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'igual a',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'vem depois',
  filterOperatorOnOrAfter: 'igual ou depois',
  filterOperatorBefore: 'vem antes',
  filterOperatorOnOrBefore: 'igual ou anterior',
  filterOperatorIsEmpty: 'é vazio',
  filterOperatorIsNotEmpty: 'não é vazio',
  filterOperatorIsAnyOf: 'qualquer um',

  // Filter values text
  filterValueAny: 'qualquer',
  filterValueTrue: 'verdadeiro',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar colunas',
  columnMenuManageColumns: 'Gerenciar colunas',
  columnMenuFilter: 'Filtro',
  columnMenuHideColumn: 'Esconder coluna',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Ordenar crescente',
  columnMenuSortDesc: 'Ordenar decrescente',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} ativar filtros` : `${count} ativar filtro`,
  columnHeaderFiltersLabel: 'mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} Linhas selecionadas`
      : `${count.toLocaleString()} Linha selecionada`,

  // Total row amount footer text
  footerTotalRows: 'Linhas totais:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleção de caixinhas',
  checkboxSelectionSelectAllRows: 'Marcar todas Linhas',
  checkboxSelectionUnselectAllRows: 'Desmarcar todas Linhas',
  checkboxSelectionSelectRow: 'Marcar linha',
  checkboxSelectionUnselectRow: 'Desmarcar linha',

  // Boolean cell text
  booleanCellTrueLabel: 'Sim',
  booleanCellFalseLabel: 'Não',

  // Actions cell more text
  actionsCellMore: 'mais',

  // Column pinning text
  pinToLeft: 'Fixar à esquerda',
  pinToRight: 'Fixar à direita',
  unpin: 'Desfixar',

  // Tree Data
  treeDataGroupingHeaderName: 'Agrupar',
  treeDataExpand: 'Ver filhos',
  treeDataCollapse: 'Esconder filhos',

  // Grouping columns
  groupingColumnHeaderName: 'Agrupar',
  groupColumn: (name) => `Agrupar por ${name}`,
  unGroupColumn: (name) => `Parar de agrupar por ${name}`,

  // Master/detail
  detailPanelToggle: 'Ligar/Desligar painel de detalhes',
  expandDetailPanel: 'Expandir',
  collapseDetailPanel: 'Recuar',

  // Used core components translation keys
  MuiTablePagination: {
    labelRowsPerPage: 'Linhas por página',
    labelDisplayedRows:({ from, to, count })=>`${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`,
    getItemAriaLabel:(type)=> paginationDictionary[type] || ''
  },

  // Row reordering text
  rowReorderingHeaderName: 'Reordenação de linha',

  // Aggregation
  aggregationMenuItemHeader: 'Agregação',
  aggregationFunctionLabelSum: 'soma',
  aggregationFunctionLabelAvg: 'média',
  aggregationFunctionLabelMin: 'mínimo',
  aggregationFunctionLabelMax: 'máximo',
  aggregationFunctionLabelSize: 'tamanho',
};
const paginationDictionary = { first:'Ir para primeira página', last:'Ir para última página', next:'Ir para próxima página', previous:'Voltar para página anterior'}