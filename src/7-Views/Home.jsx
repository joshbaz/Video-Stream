import React from 'react'
import PageHeader from "../2-Components/1Navigation/PageHeader.tsx";
import CategorySection from "../2-Components/3Category/CategorySection.tsx";
import { categories, videos } from "../3-Data/home.ts";
import VideoGridItem from "../2-Components/4VideoItem/VideoGridItem.tsx";
import Sidebar from "../2-Components/1Navigation/Sidebar.tsx";
import { SidebarProvider } from "../5-State/contexts/SidebarContext.tsx";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = React.useState(categories[0])
  return (
      <SidebarProvider>
          <div className="max-h-screen flex flex-col">
              <PageHeader />
              <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                  {/** side bar */}
                  <Sidebar />
                  {/** the rest of video section */}
                  <div className="overflow-x-hidden px-8 pb-4">
                      {/** categories */}
                      <div className="sticky top-0 bg-white z-10 pb-4">
                          <CategorySection
                              categories={categories}
                              selectedCategory={selectedCategory}
                              onSelect={setSelectedCategory}
                          />
                      </div>
                      {/** videos */}
                      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                          {videos.map((video) => (
                              <VideoGridItem key={video.id} {...video} />
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </SidebarProvider>
  )
}

export default Home