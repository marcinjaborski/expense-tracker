type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="navbar rounded bg-base-100 shadow-2xl">
      <span className="text-xl">{title}</span>
    </div>
  );
}
