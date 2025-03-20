'use server';

interface IProps {
  content: string;
}

export default async function Container({ content }:IProps) {
  return (
    <div className="w-full p-4">
      <div className="prose dark:prose-invert prose-neutral m-auto max-w-4xl typography" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}