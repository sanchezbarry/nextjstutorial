//Client component to use event listeners and hooks
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  //${pathname} is the current path
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    //URLSearchParams is a Web API that provides utility methods for manipulating the URL 
    //query parameters. Instead of creating a complex string literal, you can use it to 
    //get the params string like ?page=1&query=a.
    const params = new URLSearchParams(searchParams);
    if (term) {
    //Next, set the params string based on the user’s input. If the input is empty, 
    //you want to delete it:
      params.set('query', term);
    } else {
      params.delete('query');
    }
    //As the user types into the search bar, 
    //params.toString() translates this input into a URL-friendly format.

    //replace(${pathname}?${params.toString()}) updates the URL with the user's 
    //search data. For example, /dashboard/invoices?query=lee if the user searches for "Lee".
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      
      <input
      //search bar
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        //this keeps the URL insync with the input field
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

// pathname is /dashboard/invoices
/* 
As the user types, the params.toString() translatesthe input into a URL friendly format
'replace' updates the URL with the input-ed search data
The URL will be update without reloading (client-side navigation)


When to use the useSearchParams() hook vs. the searchParams prop?

You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you're working on the client or the server.

<Search> is a Client Component, so you used the useSearchParams() hook to access the params from the client.
<Table> is a Server Component that fetches its own data, so you can pass the searchParams prop from the page to the component.
As a general rule, if you want to read the params from the client, use the useSearchParams() hook as this avoids having to go back to the server.

*/