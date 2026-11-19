interface TitleProps {
    title: string;
  }

    const Title = ({ title }: TitleProps) => (
    <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:mb-8 sm:text-3xl">{title}</h1>
    );

    export default Title;
