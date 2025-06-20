import Videos from './videos';
import { onFetch } from "@/lib/fetchApi";
import { SearchParamsType, normalizeSearchParams, generatePlaylistQueryFromParams } from '@/utils/queryUtil';
import { getTags, getTeams } from '@/lib/fetchApi';
import { initialPlaylistsQuery } from '@/utils/queryUtil';
import HighlightsFilters from './videosFilters';
import Paging from '@/components/Filter/paging';

// function HighlightsClientWrapper({ eventsData }: { eventsData?: EventType[] }) {
//   return <Highlights eventsData={eventsData || []} />;
// }

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
        <title>Videos</title>
        <h2>Videos</h2>
        <HighlightsFilters tags={tags} teams={teams}/>
        <Videos playlistsData={playlistsData}/>
        <Paging/>
      </div>
  );
}

export default Page;