export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string;
          id: number;
          initialBalance: number;
          name: string;
          order: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          initialBalance?: number;
          name?: string;
          order?: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          initialBalance?: number;
          name?: string;
          order?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string;
          icon: string;
          id: number;
          name: string;
          order: number;
          type: Database["public"]["Enums"]["expense_type"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          icon?: string;
          id?: number;
          name: string;
          order?: number;
          type?: Database["public"]["Enums"]["expense_type"];
          user_id?: string;
        };
        Update: {
          created_at?: string;
          icon?: string;
          id?: number;
          name?: string;
          order?: number;
          type?: Database["public"]["Enums"]["expense_type"];
          user_id?: string;
        };
        Relationships: [];
      };
      debts: {
        Row: {
          amount: number;
          created_at: string;
          description: string;
          id: number;
          person: string;
          settled: boolean;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          description?: string;
          id?: number;
          person?: string;
          settled?: boolean;
          user_id?: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          description?: string;
          id?: number;
          person?: string;
          settled?: boolean;
          user_id?: string;
        };
        Relationships: [];
      };
      expenses: {
        Row: {
          account: number;
          amount: number;
          category: number;
          compound: Json | null;
          created_at: string;
          date: string;
          description: string;
          from_account: number | null;
          id: number;
          type: Database["public"]["Enums"]["expense_type"];
          user_id: string;
        };
        Insert: {
          account: number;
          amount?: number;
          category: number;
          compound?: Json | null;
          created_at?: string;
          date: string;
          description?: string;
          from_account?: number | null;
          id?: number;
          type?: Database["public"]["Enums"]["expense_type"];
          user_id?: string;
        };
        Update: {
          account?: number;
          amount?: number;
          category?: number;
          compound?: Json | null;
          created_at?: string;
          date?: string;
          description?: string;
          from_account?: number | null;
          id?: number;
          type?: Database["public"]["Enums"]["expense_type"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expenses_to_account_fkey";
            columns: ["from_account"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_expenses_account_fkey";
            columns: ["account"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_expenses_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      planned_expenses: {
        Row: {
          account: number;
          amount: number;
          category: number;
          compound: Json | null;
          created_at: string;
          description: string;
          from_account: number | null;
          id: number;
          order: number;
          realized: string | null;
          type: Database["public"]["Enums"]["expense_type"];
          user_id: string;
        };
        Insert: {
          account: number;
          amount: number;
          category: number;
          compound?: Json | null;
          created_at?: string;
          description?: string;
          from_account?: number | null;
          id?: number;
          order?: number;
          realized?: string | null;
          type: Database["public"]["Enums"]["expense_type"];
          user_id?: string;
        };
        Update: {
          account?: number;
          amount?: number;
          category?: number;
          compound?: Json | null;
          created_at?: string;
          description?: string;
          from_account?: number | null;
          id?: number;
          order?: number;
          realized?: string | null;
          type?: Database["public"]["Enums"]["expense_type"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "planned_expenses_account_fkey";
            columns: ["account"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "planned_expenses_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "planned_expenses_from_account_fkey";
            columns: ["from_account"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_amount_by_category_and_date: {
        Args: {
          date_start: string;
          date_end: string;
          up_to_current_day?: boolean;
        };
        Returns: {
          sum: number;
          category: string;
          type: string;
          month: string;
        }[];
      };
      get_counts_by_category_and_date: {
        Args: {
          date_start: string;
          date_end: string;
          up_to_current_day?: boolean;
        };
        Returns: {
          sum: number;
          category: string;
          type: string;
          month: string;
        }[];
      };
      get_outgoing_transfers_by_accounts: {
        Args: { date_end?: string };
        Returns: {
          type: string;
          from_account: string;
          sum: number;
        }[];
      };
      get_total_debts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          person: string;
          sum: number;
        }[];
      };
      get_total_expenses: {
        Args: { date_end?: string };
        Returns: {
          type: string;
          account: string;
          sum: number;
        }[];
      };
    };
    Enums: {
      expense_type: "expense" | "income" | "transfer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      expense_type: ["expense", "income", "transfer"],
    },
  },
} as const;
