export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string;
          favourite: boolean;
          id: number;
          initialBalance: number;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          favourite?: boolean;
          id?: number;
          initialBalance?: number;
          name?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          favourite?: boolean;
          id?: number;
          initialBalance?: number;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_accounts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string;
          favourite: boolean;
          icon: string;
          id: number;
          name: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          favourite?: boolean;
          icon?: string;
          id?: number;
          name: string;
          type?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          favourite?: boolean;
          icon?: string;
          id?: number;
          name?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_categories_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "public_debts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      expenses: {
        Row: {
          account: number;
          amount: number;
          category: number;
          created_at: string;
          date: string;
          description: string;
          from_account: number | null;
          id: number;
          type: string;
          user_id: string;
        };
        Insert: {
          account: number;
          amount?: number;
          category: number;
          created_at?: string;
          date: string;
          description?: string;
          from_account?: number | null;
          id?: number;
          type?: string;
          user_id?: string;
        };
        Update: {
          account?: number;
          amount?: number;
          category?: number;
          created_at?: string;
          date?: string;
          description?: string;
          from_account?: number | null;
          id?: number;
          type?: string;
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
          {
            foreignKeyName: "public_expenses_user_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
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
      get_outgoing_transfers_by_accounts: {
        Args: {
          date_end?: string;
        };
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
        Args: {
          date_end?: string;
        };
        Returns: {
          type: string;
          account: string;
          sum: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
