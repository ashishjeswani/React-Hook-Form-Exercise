import React, {useState} from 'react'

function SearchBox({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      className="flex bg-gray-300 w-[40vw] rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search products.."
        className="bg-transparent w-full outline-none p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="m-2 p-1 bg-blue-500 rounded-md text-white font-medium"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBox;
