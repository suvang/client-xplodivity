"use client";
import { useRouter } from "next/navigation";

const SearchBar = ({ onChange, name, searchTerm, className }) => {
  const router = useRouter();
  return (
    <div className={`form-control ${className}`}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered bg-custom-text"
          name={name}
          onChange={onChange}
        />
        <button
          className="btn btn-square bg-custom-button-bg border-custom-button-bg"
          onClick={() => router.push(`/search/${searchTerm.topicName}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
