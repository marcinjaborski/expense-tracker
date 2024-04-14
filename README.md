# Expense tracker
This is a PWA application written in Next.js using app router together with supabase that aims to simplify the process of tracking your daily expenses. My main motivation to make it, was to replace excel spreadsheet with something that is easier to use with additional functionalities. The application allow to create expenses and categorize them with user defined categories and accounts. All of these can be browsed and filtered on the list, and summary is shown using chart js graphs. Other functionalities offer to keep track of debts, import and export data, show reminders and suggestions of regular expenses and so on.

## Running

Like a normal next.js project
```shell
yarn dev
```

### Generate supabase types
```shell
npx supabase gen types typescript --project-id "gorpslkvimznbyurmort" --schema public > src/utils/supabase/database.types.ts
```
