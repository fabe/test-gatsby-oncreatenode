const crypto = require('crypto');

exports.onCreateNode = async ({ node, actions, loadNodeContent, reporter }) => {
  const { createNode } = actions;

  if (
    node.internal.mediaType !== `text/markdown` &&
    node.internal.mediaType !== `text/x-markdown`
  ) {
    return;
  }

  const content = await loadNodeContent(node);
  const digest = crypto
    .createHash(`md5`)
    .update(content)
    .digest(`hex`);

  createNode({
    id: `ModifiedMarkdown__${node.id + 1}`,
    parent: `__SOURCE__`,
    children: [],
    internal: {
      type: `ModifiedMarkdown`,
      contentDigest: digest,
    },
    content,
  });
};
