export interface DataEntry {
  instance_id: string;
  selected_database: string;
  query: string;
  preprocess_sql: string[];
  clean_up_sqls: string[];
  sol_sql: string[];
  external_knowledge: number[];
  test_cases: any[];
  category: string;
  high_level: boolean;
  conditions: {
    decimal: number;
    distinct: boolean;
  };
  amb_user_query: string;
  user_query_ambiguity: {
    critical_ambiguity: Array<{
      term: string;
      sql_snippet: string;
      is_mask: boolean;
      type: string;
    }>;
    non_critical_ambiguity: Array<{
      term: string;
      sql_snippet: string;
      is_mask: boolean;
      type: string;
    }>;
  };
  knowledge_ambiguity: Array<{
    term: string;
    sql_snippet: string;
    is_mask: boolean;
    type: string;
    deleted_knowledge: number;
  }>;
  follow_up?: {
    query: string;
    sol_sql: string;
    external_knowledge: number[];
    type: string;
    test_cases: any[];
    category: string;
  };
}

export interface KnowledgeEntry {
  id: number;
  knowledge: string;
  description: string;
  definition: string;
  type: string;
  children_knowledge: number;
}
