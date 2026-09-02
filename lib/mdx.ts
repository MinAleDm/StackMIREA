import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";

import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { CollapsibleCode } from "@/components/ui/CollapsibleCode";
import { Figure } from "@/components/ui/Figure";
import { SelfCheck } from "@/components/ui/SelfCheck";
import { getMarkdownRemarkPlugins, type TocItem } from "@/lib/markdown";

const mdxComponents = {
  Callout,
  CodeBlock,
  CollapsibleCode,
  Figure,
  SelfCheck
};

interface CompileDocMdxOptions {
  collectToc?: boolean;
}

export async function compileDocMdx(source: string, options: CompileDocMdxOptions = {}) {
  const toc: TocItem[] = [];
  const collectToc = options.collectToc ?? true;

  const result = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [...getMarkdownRemarkPlugins(collectToc ? toc : [])],
        rehypePlugins: [rehypeSlug]
      }
    },
    components: mdxComponents
  });

  return {
    content: result.content,
    toc
  };
}
