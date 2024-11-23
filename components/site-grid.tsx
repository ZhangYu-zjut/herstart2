"use client";

import { Card } from "@/components/ui/card";
import { siteCategories } from "@/lib/site-data";

export function SiteGrid() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    target.parentElement!.classList.add('bg-muted', 'rounded-full');
  };

  // Organize categories into rows of 3
  const rows = [];
  for (let i = 0; i < siteCategories.length; i += 3) {
    rows.push(siteCategories.slice(i, i + 3));
  }

  return (
    <div className="space-y-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {row.map((category) => {
            const Icon = category.Icon;
            return (
              <section key={category.id} id={category.id}>
                <h2 className="text-xl font-semibold text-pink-600 flex items-center gap-2 mb-4 pb-2 border-b">
                  <Icon className="h-5 w-5" />
                  {category.name}
                </h2>
                <div className="grid gap-3">
                  {category.sites.map((site) => (
                    <Card 
                      key={`${category.id}-${site.url}`} 
                      className="hover:shadow-md transition-shadow"
                    >
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <img
                              src={`https://icon.horse/icon/${new URL(site.url).hostname}`}
                              alt=""
                              className="w-4 h-4"
                              onError={handleImageError}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{site.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {site.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ))}
    </div>
  );
}