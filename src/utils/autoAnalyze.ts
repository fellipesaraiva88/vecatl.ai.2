export const autoAnalyze = async (text: string) => {
  const res = await fetch('/api/auto-analyzer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return data.result;
};
