"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Search className="h-6 w-6" />
        <h1 className="text-3xl font-bold font-headline">
          Search Results
        </h1>
      </div>

      {query ? (
        <Card>
          <CardHeader>
            <CardTitle>Results for: "{query}"</CardTitle>
            <CardDescription>
              Displaying search results for your query. Actual search functionality across different sections (Orders, Menu, Customers etc.) is a future enhancement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for actual search results */}
            <div className="py-10 text-center text-muted-foreground">
              <p>Search results would appear here.</p>
              <p className="text-sm mt-2">
                Currently, this page demonstrates that your search query ("{query}") has been received.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Search Query</CardTitle>
            <CardDescription>
              Please enter a search term in the search bar above.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Try searching for items, customers, or orders.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6" />
          <h1 className="text-3xl font-bold font-headline">
            Search Results
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>
              Please wait while we load your search results.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
