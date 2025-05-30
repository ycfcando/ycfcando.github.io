import { serializeWithData } from "@/lib/common/mdx";

export async function getNote(path: string) {
  const giteePath = `https://gitee.com/api/v5/repos/ycfcando/note/contents${path}.mdx?access_token=70a49d283e2271218bde3027fb8eb18c`;

  const res = await fetch(giteePath);

  if (res.status === 200) {
    const { content, encoding } = await res.json();

    if (content) {
      // 解码 base64
      const decodedContent = Buffer.from(content, encoding).toString("utf-8");

      const mdxSource = await serializeWithData(decodedContent);

      return mdxSource;
    }
  }

  return null;
}
