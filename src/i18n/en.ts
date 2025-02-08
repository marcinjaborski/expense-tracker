export default {
  TopBar: {
    title: {
      default: "Expense tracker",
      "/": "Dashboard",
      "/login": "Login",
      "/register": "Register",
      "/createExpense": "Create Expense",
      "/expenses": "Expenses",
      "/more": "More",
      "/accounts": "Accounts",
      "/categories": "Categories",
      "/debts": "Debts",
      "/import": "Import",
      "/export": "Export",
    },
  },
  Login: {
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    submit: "Submit",
    registerText: "Don't have an account?",
    registerLink: "Sign up",
    loginText: "Already have an account?",
    loginLink: "Log in",
    notEmail: "Enter a valid email",
    passwordMinLength: "Password must have at least 8 characters",
    invalidCredentials: "Invalid email or password",
    passwordsMismatch: "Passwords do not match",
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    pleaseLogIn: "Please log in",
  },
  Dashboard: {
    title: "Dashboard",
    income: "Incomes",
    expense: "Expenses",
    currentExpenses: "Monthly expenses",
    averageExpenses: "Average expenses",
    totalMoney: "Total money",
    currentNetProfit: "Net profit",
  },
  CreateExpense: {
    amount: "Amount",
    account: "Account",
    fromAccount: "From account",
    toAccount: "To account",
    description: "Description",
    create: "Create",
    update: "Update",
    nonNegativeNumber: "Amount must be greater than or equal to 0",
    income: "Income",
    expense: "Expense",
    transfer: "Transfer",
    close: "Close",
    category: "Category",
    missingFromAccount: "Select from which account to make transfer",
    theSameAccounts: "Cannot transfer money to the same account",
    success: "Expense created",
    error: "Could not create expense",
  },
  ExpenseList: {
    title: "List of transactions",
    incomes: "Incomes",
    expenses: "Expenses",
    transfers: "Transfers",
    all: "All",
    filtersModal: "Filters",
    sort: "Sort",
    byDate: "By Date",
    byAmount: "By Amount",
    changeDirection: "Change direction",
    search: "Search",
    accounts: "Accounts",
    categories: "Categories",
    dateFrom: "From",
    dateTo: "To",
    amountFrom: "More than",
    amountTo: "Less than",
    close: "Close",
    clear: "Clear",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this expense?",
  },
  Other: {
    title: "More",
    language: "Select language",
    accounts: "Accounts",
    categories: "Categories",
    import: "Import",
    export: "Export",
    debts: "Debts",
    logout: "Log out",
  },
  Accounts: {
    title: "Accounts",
    createAccount: "Create",
    updateAccount: "Update",
    createAccountTitle: "Create account",
    updateAccountTitle: "Update account",
    noAccounts: "Currently there are no accounts, create one!",
    name: "Name",
    currency: "Currency",
    initialBalance: "Initial balance",
    PLN: "Polish Zloty zl",
    EUR: "Euro €",
    USD: "American dollars $",
    nameMinLength: "Name must have at least 3 characters",
    edit: "Edit account",
    delete: "Delete account",
    confirmDelete: "Are you sure you want to delete this account?",
  },
  Categories: {
    title: "Categories",
    createCategoryTitle: "Create category",
    createCategory: "Create",
    updateCategory: "Update category",
    name: "Name",
    icon: "Icon",
    missingCategory: "Select category",
    nonEmptyName: "Name cannot be empty",
    edit: "Edit category",
    delete: "Delete category",
    confirmDelete: "Are you sure you want to delete this category?",
    expenses: "Expenses",
    incomes: "Incomes",
    transfers: "Transfers",
  },
  Debts: {
    title: "Debts",
    showSettled: "Show all",
    createDebt: "Add debt",
    updateDebt: "Change debt",
    toggleTypeBorrow: "Switch to borrow",
    toggleTypeReimburse: "Switch to reimburse",
    toggleSettled: "Change visibility",
    settleAll: "Settle all",
    settleAllButton: "Settle all debts",
    noDebts: "No active debts",
    create: "Add",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this debt?",
    person: "Person",
    amount: "Amount",
    description: "Description",
    emptyPerson: "Enter a person connected to the debt",
    invalidNumber: "Enter valid amount",
    numberGreaterThanZero: "Amount must be greater than 0",
  },
  Import: {
    importTitle: "Import data",
    uploadButton: "Select csv file",
    importButton: "Import {{amount}} {{table}}",
    importError: "Error while importing data, check data",
    noMatchingTable: "Could not match data to any resource",
    exportTitle: "Export data",
    exportError: "Could not export table",
    expenses: "Expenses",
    categories: "Categories",
    accounts: "Accounts",
    debts: "Debts",
    download: "Download csv",
  },
  Feedback: {
    error: "Something went wrong",
    usedAccount: "This account is used in expenses",
    usedCategory: "This category is used in expenses",
  },
  Shared: {
    confirm: "Confirm",
    cancel: "Cancel",
    close: "Close",
  },
};
