import { promises as fs } from 'fs';
import path from 'path';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { FC } from 'react';

import { DocsLayout } from '@/components/layouts/DocsLayout';
import { SharedHead } from '@/components/pages/SharedHead';
import { getMarkdocStaticProps } from '@/lib/pages';

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'docs');
  const filePath = path.join(postsDirectory, 'index.mdoc');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return getMarkdocStaticProps(fileContents);
};

const DocsPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
  toc,
}) => {
  return (
    <>
      <SharedHead
        title="Markprompt Docs"
        coverUrl="https://markprompt.com/static/cover-docs.png"
      />
      <DocsLayout content={JSON.parse(content)} toc={toc} />
    </>
  );
};

export default DocsPage;
