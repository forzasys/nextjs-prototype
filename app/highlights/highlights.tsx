'use client';
import React, {useMemo} from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetcher } from '@/lib/fetchApi';
import { generateEventQueryFromParams } from '@/utils/queryUtil';
import { tags } from '@/types/dataTypes';
import { EventType } from '@/types/dataTypes';

function Highlights() {

  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const updateParam = (param: string, value: undefined | string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined) {
      params.delete(param);
    } else {
      params.set(param, String(value));
    }

    router.replace(`?${params.toString()}`);
  };

  const query = useMemo(() => generateEventQueryFromParams(searchParams), [searchParams]);

  const pageStaleTimes: Record<number, number> = {
    1: 1000 * 30 * 1,  // Page 1: 30 secs
    2: 1000 * 60 * 10,  // Page 2: 10 min
  };

  const staleTime = pageStaleTimes[page] ?? 0;

  const { data, isLoading } = useQuery({
    queryKey: ['events', query],
    queryFn: () => fetcher("event", query),
    staleTime: staleTime,
  })

  const events = data?.events || []

  const onClearCache = () => {
    if (typeof window !== 'undefined') {
      queryClient.clear();
    }
  }; 

  const tagsList = (
    <div style={{display: "flex", gap: "15px"}}>
      <div onClick={() => updateParam("tag", undefined)}>all</div>
      {tags.map((t) => {
        return (
          <div key={t} onClick={() => updateParam("tag", t)}>{t}</div>
        )
      })}
    </div>
  )

  const renderEvents = (
    <div>
      {events.map((e: EventType) => {
        return (
          <div key={e.id}>
            {e.playlist.description}
          </div>
        )
      })}
      <br />
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => updateParam("page", 1)}>1</button>
        <button onClick={() => updateParam("page", 2)}>2</button>
        <button onClick={() => updateParam("page", 3)}>3</button>
      </div>
      <br />
      {data && (
        <div onClick={onClearCache}>Clear cache</div>
      )}
    </div>
  ) 

  const render = isLoading ? (
    <div style={{fontSize: "32px"}}>Loading...</div>
  ) : (
    renderEvents
  )

  return (
    <div style={{padding: "10px"}}>
      <title>Highlights</title>
      <h3 style={{fontSize: "50px"}}>
        Highlights
      </h3>
      <br />
      {tagsList}
      <br />
      {render}
    </div>
  )
}

export default Highlights