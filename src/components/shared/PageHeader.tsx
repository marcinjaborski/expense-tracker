type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="navbar rounded bg-base-100 p-5 shadow-2xl">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
}
