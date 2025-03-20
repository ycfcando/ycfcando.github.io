import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Tokens, Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

interface IHeading {
  depth: Tokens.Heading["depth"];
  text: Tokens.Heading["text"];
  id: string;
}

export function getMarkdownFile(filename: string) {
  const filePath = path.join(process.cwd(), "md", `${filename}.mdx`);
  const file = fs.readFileSync(filePath, "utf8");

  return file;
}

export function getMarkdownMeta(filename: string) {
  const file = getMarkdownFile(filename);
  const meta = matter(file);

  return meta;
}

export function parseMarkdown(filename: string) {
  const { content } = getMarkdownMeta(filename);
  const headings: IHeading[] = [];
  const marked = new Marked(
    {
      renderer: {
        heading({ tokens, depth }: Tokens.Heading) {
          const text = this.parser.parseInline(tokens);
          const id = text.toLowerCase().replace(/ /g, "-");

          headings.push({ depth, text, id });

          return `<h${depth} id="${id}">${text}</h${depth}>`;
        },
      },
    },
    markedHighlight({
      emptyLangClass: "highlight",
      langPrefix: "highlight language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        const html = hljs.highlight(code, { language }).value;

        return html;
      },
    })
  );

  marked.use({
    renderer: {
      codespan({ text }) {
        return `<code class="not-prose text-foreground bg-code-background px-2 rounded-xs">${text}</code>`;
      },
    },
  });

  // 解析 Markdown 内容
  const html = marked.parse(content) as string;

  return { html, headings };
}
