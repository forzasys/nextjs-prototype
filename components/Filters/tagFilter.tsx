'use client';
import { FilterDropdown } from './filterDropdown';

function TagFilter({ tags }: { tags: string[] }) {

  if (tags.length === 0) return null

  const allTags = Object.entries(tags).reduce<string[]>((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      acc.push(key);
    }
    return acc;
  }, []);

  const uselessTags = ["end phase", "medical treatment", "offside", "start phase", "substitution", "throw-in"]
  
  const availableTags = allTags.filter((t) => !uselessTags.includes(t))

  const tagsOptions = availableTags.map((t) => ({
    id: t,
    value: t
  }))

  return (
    <div>
      <FilterDropdown title="tag" options={tagsOptions} hasAll/>
    </div>
  )
}

export default TagFilter