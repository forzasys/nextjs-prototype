'use client';
import { useUpdateSearchParam } from '@/utils/ClientSideUtil';

function TagFilter({ tags }: { tags: string[] }) {

  const updateParam = useUpdateSearchParam();

  if (tags.length === 0) return null

  const allTags = Object.entries(tags).reduce<string[]>((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      acc.push(key);
    }
    return acc;
  }, []);

  const uselessTags = ["end phase", "medical treatment", "offside", "start phase", "substitution", "throw-in"]
  
  const availableTags = allTags.filter((t) => !uselessTags.includes(t))

  return (
    <div style={{display: "flex", gap: "15px"}}>
      <div onClick={() => updateParam("tag", undefined)}>all</div>
      {availableTags.map((t) => {
        return (
          <div key={t} onClick={() => updateParam("tag", t)}>{t}</div>
        )
      })}
    </div>
  )
}

export default TagFilter