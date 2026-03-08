import { createDefaultConfig, runAcademicAgent } from './academic-agent-final.js';

async function main() {
  const config = createDefaultConfig();
  const result = await runAcademicAgent(config);

  const newsCount = result.updates?.news?.length ?? 0;
  const papersCount = result.updates?.papers?.length ?? 0;
  const awardsCount = result.updates?.awards?.length ?? 0;

  console.log(
    `Academic updates check finished: ${newsCount} news, ${papersCount} papers, ${awardsCount} awards`
  );
}

main().catch((error) => {
  console.error('Academic updates script failed:', error.message);
  process.exit(1);
});
