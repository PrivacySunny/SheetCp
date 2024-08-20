export async function fetchTagInfo(
  tag: string
): Promise<{ title: string; description: string }> {
  // Implement the logic to fetch tag information from your database or other sources
  const tagInfo = {
    title: `Information about ${tag}`,
    description: `This is detailed information about the tag: ${tag}.`,
  };
  return tagInfo;
}
