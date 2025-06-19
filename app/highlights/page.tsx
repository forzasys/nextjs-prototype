import Highlights from './highlights';
import { onFetch } from "@/lib/fetchApi";
import { SearchParamsType, normalizeSearchParams, generatePlaylistQueryFromParams } from '@/utils/queryUtil';
import HighlightsFilters from './highlightsFilters';
import Paging from '@/components/Filter/paging';
import { initialPlaylistsQuery } from '@/utils/queryUtil';

// function HighlightsClientWrapper({ eventsData }: { eventsData?: EventType[] }) {
//   return <Highlights eventsData={eventsData || []} />;
// }

async function getTags () {
  const tagsData = await onFetch("tag");
  return tagsData.tags
}

export async function getTeams () {
  const data = await onFetch("team", {season: 2025});
  return data?.teams;
};

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({ searchParams }: { searchParams: Promise<SearchParamsType> }) {

  const rawParams = await searchParams;
  const params = normalizeSearchParams(rawParams);
  const query = generatePlaylistQueryFromParams(params);

  const tags = await getTags();
  const teams = await getTeams()

  const initialQuery = structuredClone(initialPlaylistsQuery)
  const isInitialQuery = JSON.stringify(query) === JSON.stringify(initialQuery)
  
  const playlistsData = isInitialQuery ? await onFetch("playlist", initialQuery) : undefined
  
  return (
      <div>
        <title>Highlights</title>
        <h2>Highlights</h2>
        <HighlightsFilters tags={tags} teams={teams}/>
        <Highlights playlistsData={playlistsData}/>
        <Paging/>
      </div>
  );
}

export default Page;